import type { Database } from '$lib/auth/database.types';

export type TransactionStatus = Database['public']['Enums']['transaction_status'];

export type Transaction = Database['public']['Tables']['transactions'];
