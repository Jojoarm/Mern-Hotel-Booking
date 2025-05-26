import { Request, Response } from 'express';
import Hotel from '../models/Hotel';
import { v2 as cloudinary } from 'cloudinary';
import Room from '../models/Room';

//Api to create a new room for a hotel
export const createRoom = async (req: Request, res: Response): Promise<any> => {
  try {
    const { roomType, pricePerNight, amenities } = req.body;
    const hotel = await Hotel.findOne({ owner: req.auth.userId });

    if (!hotel) return res.json({ success: false, message: 'No Hotel Found' });

    //upload images to cloudinary
    const files = req.files as Express.Multer.File[];
    if (!files || files.length === 0) {
      return res
        .status(400)
        .json({ success: false, message: 'No files uploaded' });
    }
    const uploadImages = files?.map(async (file) => {
      const response = await cloudinary.uploader.upload(file.path);
      return response.secure_url;
    });

    const images = await Promise.all(uploadImages);

    await Room.create({
      hotel: hotel._id,
      roomType,
      pricePerNight: +pricePerNight,
      amenities: JSON.parse(amenities),
      images,
    });

    res.json({ success: true, message: 'Room created successfully' });
  } catch (error) {
    res.json({ success: false, message: (error as Error).message });
  }
};

//Api to get all rooms
export const getRooms = async (req: Request, res: Response): Promise<any> => {
  try {
    const rooms = await Room.find({ isAvailable: true })
      .populate({
        path: 'hotel',
        populate: { path: 'owner', select: 'image' },
      })
      .sort({ createdAt: -1 });

    res.json({ success: true, rooms });
  } catch (error) {
    res.json({ success: false, message: (error as Error).message });
  }
};

//Api to get all rooms for a specific hotel
export const getOwnerRooms = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const hotelData = await Hotel.find({ owner: req.auth.userId });
    const hotelIds = hotelData.map((h) => h._id);

    const rooms = await Room.find({ hotel: { $in: hotelIds } }).populate(
      'hotel'
    );

    res.json({ success: true, rooms });
  } catch (error) {
    res.json({ success: false, message: (error as Error).message });
  }
};

//Api to toggle availability of a room
export const toggleRoomAvailability = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const { roomId } = req.body;
    const roomData = await Room.findById(roomId);
    if (!roomData)
      return res.json({ success: false, message: 'No Room Found' });
    roomData.isAvailable = !roomData.isAvailable;
    await roomData.save();
    res.json({ success: true, message: 'Room availability updated' });
  } catch (error) {
    res.json({ success: false, message: (error as Error).message });
  }
};
