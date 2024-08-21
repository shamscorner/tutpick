import { error, json, type RequestHandler } from '@sveltejs/kit';
import type Stripe from 'stripe';

import { STRIPE_WEBHOOK_SECRET } from '$env/static/private';
import { createTransaction } from '$lib/transactions/transaction.service';
import { stripe } from '$routes/services/stripe.service';

export const POST: RequestHandler = async ({ request, locals }) => {
	const body = await request.text();
	const signature = request.headers.get('stripe-signature') || '';

	let event: Stripe.Event;

	try {
		event = stripe.webhooks.constructEvent(body, signature, STRIPE_WEBHOOK_SECRET);
	} catch (err: any) {
		console.warn('⚠️  Webhook signature verification failed.', err.message);
		throw error(400, `Webhook error: ${err.message}`);
	}

	const session = event.data.object as Stripe.Checkout.Session;

	if (!session.metadata || !session.metadata.userId) {
		throw error(400, 'User Id is required!');
	}

	switch (event.type) {
		case 'checkout.session.completed': {
			const { data, error } = await createTransaction(locals.supabase, {
				userId: session.metadata.userId,
				amount: session.amount_total ? session.amount_total / 100 : 0
			});

			return json({ data, error });
		}
	}

	return json({});
};
