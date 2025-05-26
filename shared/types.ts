export type RoomType = {
  _id: string;
  images: string[];
  pricePerNight: number;
  hotel: HotelType;
  roomType: string;
  amenities: string[];
  isAvailable: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
};

export type HotelType = {
  _id: string;
  name: string;
  address: string;
  contact: string;
  owner: UserType;
  city: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
};

export type UserType = {
  _id: string;
  username: string;
  email: string;
  image: string;
  role: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
  recentSearchedCities: string[];
};

export type UserDataType = {
  recentSearchedCities: string[];
  role: string;
  success: boolean;
};

export type ExclusiveOfferType = {
  _id: number;
  title: string;
  description: string;
  priceOff: number;
  expiryDate: string;
  image: string;
};

export type TestimonialType = {
  id: number;
  name: string;
  address: string;
  image: string;
  rating: number;
  review: string;
};

export type AmenityIconMapType = {
  [key: string]: string;
};

export type UserBookingDataType = {
  _id: string;
  user: UserType;
  room: RoomType;
  hotel: HotelType;
  checkInDate: string;
  checkOutDate: string;
  totalPrice: number;
  guests: number;
  status: string;
  paymentMethod: string;
  isPaid: boolean;
  createdAt: string;
  updatedAt: string;
};

export type DashboardDataType = {
  totalBookings: number;
  totalRevenue: number;
  bookings: UserBookingDataType[];
};
