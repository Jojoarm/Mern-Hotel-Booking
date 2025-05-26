import express from 'express';
import { protect } from '../middlewares/auth';
import { registerHotel } from '../controllers/hotelController';

const hotelRouter = express.Router();

hotelRouter.post('/', protect, registerHotel);

export default hotelRouter;
