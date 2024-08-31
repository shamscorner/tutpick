import { type Adapter, type DatabaseSession, type DatabaseUser, Lucia } from 'lucia';

import type { DatabaseReader, DatabaseWriter } from '../_generated/server';

declare module 'lucia' {
	interface Register {
		DatabaseUserAttributes: DatabaseUserAttributes;
	}
}

interface DatabaseUserAttributes {
	username?: string;
	avatar?: string;
	browserHash?: string;
	landingPage?: string;
	referralSiteUrl?: string;
	isIncognitoMode?: string;
}

export function getAuth(db: DatabaseWriter) {
	const lucia = new Lucia(new ConvexAdapter(db), {
		getUserAttributes: (attributes) => {
			return {
				username: attributes.username,
				avatar: attributes.avatar,
				browserHash: attributes.browserHash,
				landingPage: attributes.landingPage,
				referralSiteUrl: attributes.referralSiteUrl,
				isIncognitoMode: attributes.isIncognitoMode
			};
		}
	});
	return lucia;
}

export class ConvexAdapter implements Adapter {
	constructor(private readonly db: DatabaseWriter) {}

	async getSessionAndUser(
		sessionId: string
	): Promise<[DatabaseSession | null, DatabaseUser | null]> {
		const session = await getSession(this.db, sessionId);
		if (session === null) return [null, null];
		const user = await getUser(this.db, session.userId);
		return [session, user];
	}

	getUserSessions(userId: string): Promise<DatabaseSession[]> {
		return getSessions(this.db, userId);
	}

	async setSession(session: DatabaseSession): Promise<void> {
		await this.db.insert('sessions', {
			id: session.id,
			user_id: session.userId,
			expires_at: session.expiresAt.getTime()
		});
	}

	async updateSessionExpiration(sessionId: string, expiresAt: Date): Promise<void> {
		const session = await this.db
			.query('sessions')
			.filter((q) => q.eq(q.field('id'), sessionId))
			.first();
		if (session === null) return;
		await this.db.patch(session._id, { expires_at: expiresAt.getTime() });
	}

	async deleteSession(sessionId: string): Promise<void> {
		const session = await this.db
			.query('sessions')
			.withIndex('byId', (q) => q.eq('id', sessionId))
			.first();
		if (session === null) return;
		await this.db.delete(session._id);
	}

	async deleteUserSessions(userId: string): Promise<void> {
		const sessions = await this.db
			.query('sessions')
			.filter((q) => q.eq(q.field('user_id'), userId))
			.collect();
		await Promise.all(sessions.map((session) => this.db.delete(session._id)));
	}

	async deleteExpiredSessions(): Promise<void> {
		const sessions = await this.db.query('sessions').collect();
		const expiredSessions = sessions.filter((session) => session.expires_at < Date.now());
		await Promise.all(expiredSessions.map((session) => this.db.delete(session._id)));
	}
}

async function getSessions(db: DatabaseReader, userId: string): Promise<DatabaseSession[]> {
	const sessions = await db
		.query('sessions')
		.filter((q) => q.eq(q.field('user_id'), userId))
		.collect();
	return sessions.map((session) => ({
		id: session.id,
		userId: session.user_id,
		expiresAt: new Date(session.expires_at),
		attributes: {}
	}));
}

async function getSession(db: DatabaseReader, sessionId: string): Promise<DatabaseSession | null> {
	const session = await db
		.query('sessions')
		.withIndex('byId', (q) => q.eq('id', sessionId))
		.first();
	if (session === null) return null;
	return {
		id: session.id,
		userId: session.user_id,
		expiresAt: new Date(session.expires_at),
		attributes: {}
	};
}

async function getUser(db: DatabaseReader, userId: string): Promise<DatabaseUser | null> {
	const user = await db
		.query('users')
		.withIndex('byId', (q) => q.eq('id', userId))
		.first();
	if (user === null) return null;
	return {
		id: user.id,
		attributes: {
			username: user.username || undefined,
			avatar: user.avatar || undefined,
			browserHash: user.browserHash || undefined,
			landingPage: user.landingPage || undefined,
			referralSiteUrl: user.referralSiteUrl || undefined,
			isIncognitoMode: user.isIncognitoMode || undefined
		}
	};
}

export type Auth = ReturnType<typeof getAuth>;
