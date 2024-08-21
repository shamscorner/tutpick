import { z } from 'zod';

// import { UserRole } from '../types';

export const formSchema = z.object({
	name: z.string().max(150, 'Max 150 characters').min(1, 'Required'),
	isTwoFactorEnabled: z.boolean().default(false)
	// role: z.nativeEnum(UserRole).default(UserRole.user)
});

export type FormSchema = typeof formSchema;

export const formSchemaChangeEmail = z.object({
	email: z.string().email('Invalid email address').min(1, 'Required').max(150, 'Max 150 characters')
});

export type FormSchemaChangeEmail = typeof formSchemaChangeEmail;
