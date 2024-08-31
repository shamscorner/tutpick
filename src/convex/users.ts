import { v } from 'convex/values';
import { generateIdFromEntropySize } from 'lucia';

import { Id } from './_generated/dataModel';
import { mutation } from './_generated/server';
import { mutationWithAuth, queryWithAuth } from './auth/withAuth';

export const getSession = queryWithAuth({
	args: {},
	handler: async (ctx) => {
		return {
			session: JSON.stringify(ctx.userSessionContext),
			cookie: ctx.userSessionContext?.session?.fresh
				? ctx.auth.createSessionCookie(ctx.userSessionContext.session.id).serialize()
				: undefined
		};
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
			throw new Error('Failed to create token');
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
		const userId = generateIdFromEntropySize(10);

		const existingUser = await ctx.db
			.query('users')
			.withIndex('byEmail', (q) => q.eq('email', args.email))
			.unique();

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

		const cookie = ctx.auth.createSessionCookie(session.id).serialize();

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

		return { session, cookie };
	}
});
