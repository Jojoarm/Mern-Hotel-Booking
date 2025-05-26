import { Request, Response } from 'express';
import Hotel from '../models/Hotel';
import User from '../models/User';

export const registerHotel = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const { name, address, contact, city } = req.body;
    const owner = req.user._id;

    //check if hotel already registered
    const hotel = await Hotel.findOne({ owner });
    if (hotel) {
      return res.json({ success: false, message: 'Hotel Already Registered' });
    }

    await Hotel.create({ name, address, contact, city, owner });

    await User.findByIdAndUpdate(owner, { role: 'hotelOwner' });
    res.json({ success: true, message: 'Hotel Registered Successfully' });
  } catch (error) {
    res.json({ success: false, message: (error as Error).message });
  }
};
