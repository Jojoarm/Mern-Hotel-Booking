import express, { Request, Response } from 'express';
import 'dotenv/config';
import cors from 'cors';
import connectDB from './config/db';
import { clerkMiddleware } from '@clerk/express';
import clerkWebhooks from './controllers/clerkWebhooks';
import userRouter from './routes/userRoute';
import hotelRouter from './routes/hotelRoute';
import connectCloudinary from './config/cloudinary';
import roomRouter from './routes/roomRoute';
import bookingRouter from './routes/bookingRoute';
import { stripeWebhooks } from './controllers/stripeWebhooks';

const port = process.env.PORT || 3000;

connectDB();

connectCloudinary();

const app = express();
app.use(cors());

//api to listen to stripe webhooks
app.post(
  '/api/stripe',
  express.raw({ type: 'application/json' }),
  stripeWebhooks
);

//middleware
app.use(express.json());
app.use(clerkMiddleware());

//api for clerk webhooks
app.use('/api/clerk', clerkWebhooks);

app.get('/', (req: Request, res: Response) => {
  res.send('Api working');
});

app.use('/api/user', userRouter);
app.use('/api/hotels', hotelRouter);
app.use('/api/rooms', roomRouter);
app.use('/api/bookings', bookingRouter);

app.listen(port, () => {
  console.log('Server running on localhost:', port);
});
