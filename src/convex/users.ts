import { ConvexError, v } from 'convex/values';
import { Cookie, generateIdFromEntropySize } from 'lucia';

import { Id } from './_generated/dataModel';
import { mutation } from './_generated/server';
import { mutationWithAuth } from './auth/withAuth';
import { validateEmail } from './utils';

export const validateSession = mutationWithAuth({
	args: {},
	handler: async (ctx) => {
		const { session, user } = await ctx.auth.validateSession(
			ctx.userSessionContext?.session?.id || ''
		);

		let sessionCookie: Cookie | null = null;

		if (session && session.fresh) {
			sessionCookie = ctx.auth.createSessionCookie(session.id);
		}

		if (!session) {
			sessionCookie = ctx.auth.createBlankSessionCookie();
		}

		return JSON.stringify({ session, user, cookie: sessionCookie });
	}
});

export const invalidateSession = mutationWithAuth({
	args: {},
	handler: async (ctx) => {
		const existingSession = ctx.userSessionContext?.session;

		const blankCookieResponse = JSON.stringify({ cookie: ctx.auth.createBlankSessionCookie() });

		if (!existingSession) {
			return blankCookieResponse;
		}

		await ctx.auth.invalidateSession(existingSession.id);

		return blankCookieResponse;
	}
});

export const sendEmailLoginLink = mutation({
	args: {
		email: v.string()
	},
	handler: async (ctx, args) => {
		const token = generateIdFromEntropySize(32);
		const siteUrl = process.env.SITE_URL;
		const getMagicLink = (id: Id<'tokens'>) =>
			`${siteUrl}/auth/email-sign-in/${token}?id=${id}&email=${encodeURIComponent(args.email)}`;

		const existingToken = await ctx.db
			.query('tokens')
			.withIndex('byEmail', (q) => q.eq('email', args.email))
			.unique();

		if (existingToken) {
			await ctx.db.delete(existingToken._id);
		}

		const newTokenId = await ctx.db.insert('tokens', {
			email: args.email,
			token,
			expires_at: Date.now() + 1000 * 60 * 60
		});

		if (!newTokenId) {
			throw new ConvexError('Failed to create token!');
		}

		const magicLink = getMagicLink(newTokenId);

		return { magicLink };
	}
});

export const performPasswordLessLogin = mutationWithAuth({
	args: {
		email: v.string(),
		provider: v.string(),
		name: v.optional(v.string()),
		username: v.optional(v.string()),
		avatar: v.optional(v.string())
	},
	handler: async (ctx, args) => {
		validateEmail(args.email);

		const existingUser = await ctx.db
			.query('users')
			.withIndex('byEmail', (q) => q.eq('email', args.email))
			.unique();

		const userId = existingUser?.id || generateIdFromEntropySize(10);

		if (!existingUser) {
			await ctx.db.insert('users', {
				id: userId,
				email: args.email,
				name: args.name,
				username: args.username,
				avatar: args.avatar
			});
		}

		const session = await ctx.auth.createSession(userId, {
			name: args.name,
			username: args.username,
			avatar: args.avatar
		});

		const cookie = ctx.auth.createSessionCookie(session.id);

		const existingAccount = await ctx.db
			.query('accounts')
			.withIndex('byProviderUser', (q) => q.eq('provider', args.provider).eq('user_id', userId))
			.unique();

		if (!existingAccount) {
			await ctx.db.insert('accounts', {
				provider: args.provider,
				user_id: userId
			});
		}

		return JSON.stringify({ session, cookie });
	}
});

export const validateLoginToken = mutation({
	args: {
		token: v.string(),
		email: v.string(),
		id: v.string()
	},
	handler: async (ctx, args) => {
		validateEmail(args.email);

		const tokenRecord = await ctx.db
			.query('tokens')
			.withIndex('byEmail', (q) => q.eq('email', args.email))
			.unique();

		if (!tokenRecord) {
			throw new ConvexError('Invalid login link!');
		}

		const { token, _id: tokenId, email: tokenEmail } = tokenRecord;

		if (token !== args.token || tokenId !== args.id || tokenEmail !== args.email) {
			throw new ConvexError('Invalid login link!');
		}

		if (tokenRecord.expires_at < Date.now()) {
			throw new ConvexError('Login link has expired!');
		}

		await ctx.db.delete(tokenId);
	}
});
