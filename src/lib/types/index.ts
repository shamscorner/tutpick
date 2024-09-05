import type { ConvexError } from 'convex/values';

export type UrlQuery = {
	page?: number;
	orderBy?: string;
	orderByDesc?: boolean;
	search?: string | null;
	startDate?: string | null;
	endDate?: string | null;
};

export type apiError = ConvexError<{
	code: number;
	message: string;
	severity: 'high' | 'medium' | 'low';
}>;
