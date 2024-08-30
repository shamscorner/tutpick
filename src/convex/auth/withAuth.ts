import { type PropertyValidators, v } from 'convex/values';
import { entsTableFactory } from 'convex-ents';

import {
	type DatabaseWriter,
	internalMutation,
	internalQuery,
	mutation,
	query
} from '../_generated/server';
import { entDefinitions } from '../schema';

import { type Auth, getAuth } from './lucia';
import { MutationWithAuth, QueryWithAuth, UserSessionContext } from './types';

export function queryWithAuth<ArgsValidator extends PropertyValidators, Output>({
	args,
	handler
}: QueryWithAuth<ArgsValidator, Output>) {
	return query({
		args: {
			...args,
			sessionId: v.union(v.null(), v.string())
		},
		handler: async (ctx, args: any) => {
			const auth = getAuth(ctx.db as DatabaseWriter);
			const userSessionContext = await getValidExistingSession(auth, args.sessionId);
			return handler(
				{ ...ctx, userSessionContext, auth, table: entsTableFactory(ctx, entDefinitions) },
				args
			);
		}
	});
}

export function internalQueryWithAuth<ArgsValidator extends PropertyValidators, Output>({
	args,
	handler
}: QueryWithAuth<ArgsValidator, Output>) {
	return internalQuery({
		args: { ...args, sessionId: v.union(v.null(), v.string()) },
		handler: async (ctx, args: any) => {
			const auth = getAuth(ctx.db as DatabaseWriter);
			const userSessionContext = await getValidExistingSession(auth, args.sessionId);
			return handler(
				{ ...ctx, userSessionContext, auth, table: entsTableFactory(ctx, entDefinitions) },
				args
			);
		}
	});
}

export function mutationWithAuth<ArgsValidator extends PropertyValidators, Output>({
	args,
	handler
}: MutationWithAuth<ArgsValidator, Output>) {
	return mutation({
		args: { ...args, sessionId: v.union(v.null(), v.string()) },
		handler: async (ctx, args: any) => {
			const auth = getAuth(ctx.db);
			const userSessionContext = await getValidExistingSession(auth, args.sessionId);
			return handler(
				{ ...ctx, userSessionContext, auth, table: entsTableFactory(ctx, entDefinitions) },
				args
			);
		}
	});
}

export function internalMutationWithAuth<ArgsValidator extends PropertyValidators, Output>({
	args,
	handler
}: MutationWithAuth<ArgsValidator, Output>) {
	return internalMutation({
		args: { ...args, sessionId: v.union(v.null(), v.string()) },
		handler: async (ctx, args: any) => {
			const auth = getAuth(ctx.db);
			const userSessionContext = await getValidExistingSession(auth, args.sessionId);
			return handler(
				{ ...ctx, userSessionContext, auth, table: entsTableFactory(ctx, entDefinitions) },
				args
			);
		}
	});
}

async function getValidExistingSession(
	auth: Auth,
	sessionId: string | null
): Promise<UserSessionContext> {
	if (!sessionId) return null;
	return await auth.validateSession(sessionId);
}
