import { z } from 'zod';

// We're keeping a simple non-relational schema here.
// IRL, you will have a schema for your data models.
export const dataItemSchema = z.object({
	id: z.string(),
	createdAt: z.string(),
	status: z.string(),
	amount: z.number()
});

export type DataItem = z.infer<typeof dataItemSchema>;
