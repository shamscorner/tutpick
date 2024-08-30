import { v } from 'convex/values';
import { defineEnt, defineEntSchema, getEntDefinitions } from 'convex-ents';

const users = defineEnt({
	id: v.string(),
	email: v.string(),
	avatar: v.union(v.string(), v.null()),
	username: v.union(v.string(), v.null())
})
	.index('byId', ['id'])
	.index('byEmail', ['email']);

const sessions = defineEnt({
	id: v.string(),
	user_id: v.string(),
	expires_at: v.float64()
})
	.index('byId', ['id'])
	.index('byUserId', ['user_id']);

const providers = defineEnt({
	user_id: v.string(),
	provider: v.union(v.string(), v.null())
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
	providers,
	tokens
});

export default schema;

export const entDefinitions = getEntDefinitions(schema);
