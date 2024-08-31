import { v } from 'convex/values';
import { defineEnt, defineEntSchema, getEntDefinitions } from 'convex-ents';

const users = defineEnt({
	id: v.string(),
	email: v.string(),
	name: v.optional(v.string()),
	username: v.optional(v.string()),
	avatar: v.optional(v.string()),
	browserHash: v.optional(v.string()),
	landingPage: v.optional(v.string()),
	referralSiteUrl: v.optional(v.string()),
	isIncognitoMode: v.optional(v.string())
})
	.index('byId', ['id'])
	.index('byEmail', ['email'])
	.index('byUsername', ['username']);

const sessions = defineEnt({
	id: v.string(),
	user_id: v.string(),
	expires_at: v.float64()
})
	.index('byId', ['id'])
	.index('byUserId', ['user_id']);

const accounts = defineEnt({
	user_id: v.string(),
	provider: v.string()
})
	.index('byUserId', ['user_id'])
	.index('byProviderUser', ['provider', 'user_id']);

const tokens = defineEnt({
	email: v.string(),
	token: v.string(),
	expires_at: v.float64()
}).index('byEmail', ['email']);

const schema = defineEntSchema({
	users,
	sessions,
	accounts,
	tokens
});

export default schema;

export const entDefinitions = getEntDefinitions(schema);
