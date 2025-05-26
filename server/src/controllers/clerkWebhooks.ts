import { Request, Response } from 'express';
import { Webhook } from 'svix';
import User from '../models/User';

interface ClerkEmailAddress {
  email_address: string;
}

interface ClerkWebhookEvent {
  data: {
    id: string;
    email_addresses: ClerkEmailAddress[];
    first_name: string;
    last_name: string;
    image_url: string;
  };
  type: 'user.created' | 'user.updated' | 'user.deleted' | string;
}

const clerkWebhooks = async (req: Request, res: Response): Promise<any> => {
  try {
    // Create a Svix instance with clerk webhook secret
    const webhookSecret = process.env.CLERK_WEBHOOK_SECRET;
    if (!webhookSecret) {
      return res
        .status(500)
        .json({ success: false, message: 'Webhook secret not set' });
    }

    const wh = new Webhook(webhookSecret);

    // Getting Headers
    const headers = {
      'svix-id': req.headers['svix-id'] as string,
      'svix-timestamp': req.headers['svix-timestamp'] as string,
      'svix-signature': req.headers['svix-signature'] as string,
    };

    // Verifying Headers
    const event = (await wh.verify(
      JSON.stringify(req.body),
      headers
    )) as ClerkWebhookEvent;

    // Getting Data from request body
    const { data, type } = event;

    // Switch cases for different events
    switch (type) {
      case 'user.created': {
        const userData = {
          _id: data.id,
          email: data.email_addresses?.[0]?.email_address || '',
          username: `${data.first_name} ${data.last_name}`,
          image: data.image_url,
        };
        await User.create(userData);
        break;
      }

      case 'user.updated': {
        const userData = {
          _id: data.id,
          email: data.email_addresses?.[0]?.email_address || '',
          username: `${data.first_name} ${data.last_name}`,
          image: data.image_url,
        };
        await User.findByIdAndUpdate(data.id, userData);
        break;
      }
      case 'user.deleted':
        await User.findByIdAndDelete(data.id);
        break;

      default:
        break;
    }

    return res.json({ success: true, message: 'Webhook Received' });
  } catch (error) {
    console.log((error as Error).message);
    return res.json({ success: false, message: (error as Error).message });
  }
};

export default clerkWebhooks;
