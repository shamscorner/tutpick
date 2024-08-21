import type { PageServerLoad } from './$types';
import data from './dummy.json';

export const load: PageServerLoad = async () => {
	return { data: data.slice(0, 10), error: {} };
};
