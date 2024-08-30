import { v } from 'convex/values';
import { generateIdFromEntropySize } from 'lucia';

import { Id } from './_generated/dataModel';
import { internalMutationWithAuth, queryWithAuth } from './auth/withAuth';

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

export const login = internalMutationWithAuth({
	args: {
		email: v.string()
	},
	handler: async (ctx, args) => {
		const token = generateIdFromEntropySize(32);
		const siteUrl = process.env.SITE_URL;
		const getMagicLink = (id: Id<'tokens'>) =>
			`${siteUrl}/auth/email-sign-in?token=${token}&id=${id}&email=${encodeURIComponent(args.email)}`;

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
