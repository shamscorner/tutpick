export enum UserRole {
	super = 'super',
	admin = 'admin',
	user = 'user'
}

export type User = {
	id: string;
	created: string;
	updated?: string;
	avatar: number;
	email?: string;
	name: string;
	username?: string;
	isIncognitoMode?: boolean;
	browserHash?: string;
	landingPage?: string;
	referralSiteUrl?: string;
	userAgent?: string;
	isTwoFactorEnabled?: boolean;
};
