'use server';

import { headers } from 'next/headers';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

const ADVANCE_AMOUNT_BDT = 2000;

export async function createStripeCheckout() {
  const allHeaders = headers();
  const host = allHeaders.get('host') || 'localhost:9002';
  const protocol = process.env.NODE_ENV === 'development' ? 'http' : 'https';
  const origin = `${protocol}://${host}`;

  if (!process.env.STRIPE_SECRET_KEY) {
    throw new Error('Stripe secret key is not configured.');
  }

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'bdt',
            product_data: {
              name: 'Advance Payment for Custom Shoes',
              description: 'This is an advance payment to confirm your order at Dezx Leather.',
            },
            unit_amount: ADVANCE_AMOUNT_BDT * 100, // Stripe expects amount in the smallest currency unit (e.g., cents)
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${origin}/order-success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/cart`,
    });

    return { sessionId: session.id };
  } catch (error) {
    console.error('Error creating Stripe session:', error);
    throw new Error('Could not create Stripe checkout session.');
  }
}