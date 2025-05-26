import mongoose from 'mongoose';
import { RoomType } from '../../../shared/types';

const roomSchema = new mongoose.Schema(
  {
    hotel: { type: String, required: true, ref: 'Hotel' },
    roomType: { type: String, required: true },
    pricePerNight: { type: Number, required: true },
    amenities: { type: Array, required: true },
    images: [{ type: String }],
    isAvailable: { type: Boolean, default: true },
  },
  { timestamps: true }
);

const Room = mongoose.model<RoomType>('Room', roomSchema);

export default Room;
