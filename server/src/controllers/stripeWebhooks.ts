import { Request, Response } from 'express';
import Stripe from 'stripe';
import Booking from '../models/Booking';

//Api to handle stripe webhooks
export const stripeWebhooks = async (
  req: Request,
  res: Response
): Promise<any> => {
  // stripe gateway initialize
  const stripeInstance = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
    apiVersion: '2025-04-30.basil',
  });
  const sig = req.headers['stripe-signature'] as string | undefined;
  if (!sig || !process.env.STRIPE_WEBHOOK_SECRET) {
    return res.status(400).send('Missing Stripe signature or webhook secret');
  }

  let event;
  try {
    event = stripeInstance.webhooks.constructEvent(
      req.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (error) {
    return res.status(400).send(`Webhook Error: ${(error as Error).message}`);
  }

  // Handle the event
  if (event.type === 'checkout.session.completed') {
    // const paymentIntent = event.data.object;
    // const paymentIntentId = paymentIntent.id;

    // //Getting Session Metadata
    // const session = await stripeInstance.checkout.sessions.list({
    //   payment_intent: paymentIntentId,
    // });

    // const { bookingId } = session.data[0].metadata;

    // await Booking.findByIdAndUpdate(bookingId, {
    //   isPaid: true,
    //   paymentMethod: 'Stripe',
    // });
    const session = event.data.object as Stripe.Checkout.Session;

    const bookingId = session.metadata?.bookingId;

    if (!bookingId) {
      return res.status(400).send('Booking ID not found in metadata');
    }

    await Booking.findByIdAndUpdate(bookingId, {
      isPaid: true,
      paymentMethod: 'Stripe',
    });

    console.log('Booking updated with payment.');
  } else {
    console.log('Unhandled event type', event.type);
  }
  res.json({ received: true });
};
