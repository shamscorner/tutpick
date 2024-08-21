import { fail, type RequestHandler } from '@sveltejs/kit';

import { PUBLIC_APP_PAGE } from '$env/static/public';
import { appHomeRoute, transactionsRoute } from '$lib/auth/routes';
import { stripe } from '$routes/services/stripe.service';

import type { Actions } from './$types';

export const actions: Actions = {
	createSellUrl: async (event) => {
		const { safeGetSession } = event.locals;
		const { session } = await safeGetSession();

		if (!session) {
			return fail(403);
		}

		let paymentUrl = '';

		try {
			const product = await stripe.products.create({
				name: 'You are selling',
				description:
					'Once the payment is done, you would get an email. After successful verification, we would proceed your payment in your currency. It may take 1-2 business days.'
			});

			const price = await stripe.prices.create({
				currency: 'usd',
				custom_unit_amount: {
					enabled: true
				},
				product: product.id
			});

			const paymentSession = await stripe.checkout.sessions.create({
				currency: 'usd',
				payment_method_types: ['card'],
				customer_email: session.user.email,
				line_items: [
					{
						price: price.id,
						quantity: 1
					}
				],
				mode: 'payment',
				success_url: `${PUBLIC_APP_PAGE}${transactionsRoute}`,
				cancel_url: `${PUBLIC_APP_PAGE}${appHomeRoute}`,
				metadata: {
					userId: session.user.id
				}
			});

			paymentUrl = paymentSession.url || '';
		} catch {
			return fail(403);
		}

		if (!paymentUrl) {
			return fail(403);
		}

		return { paymentUrl };
	}
};
