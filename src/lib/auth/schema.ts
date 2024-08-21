import { z } from 'zod';

export const authSchema = z.object({
	email: z
		.string({ required_error: 'Required' })
		.min(1, 'Required')
		.max(100, 'Max 100 characters')
		.email('Invalid email'),
	browserHash: z.string().optional(),
	isIncognitoMode: z.boolean().optional().default(false),
	landingPage: z.string().optional(),
	referralSiteUrl: z.string().optional()
});

export type AuthSchema = typeof authSchema;
