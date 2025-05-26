import mongoose from 'mongoose';
import { HotelType } from '../../../shared/types';

const hotelSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    address: { type: String, required: true },
    contact: { type: String, required: true },
    owner: { type: String, required: true, ref: 'User' },
    city: { type: String, required: true },
  },
  { timestamps: true }
);

const Hotel = mongoose.model<HotelType>('Hotel', hotelSchema);

export default Hotel;
