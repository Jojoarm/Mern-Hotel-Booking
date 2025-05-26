import HotelCard from './HotelCard';
import Title from './Title';
import { useAppContext } from '../context/AppContext';
import { useEffect, useState } from 'react';
import type { RoomType } from '../../../shared/types';

const RecommendedHotels = () => {
  const { rooms, userData } = useAppContext();
  const [recommended, setRecommended] = useState<RoomType[]>([]);

  const filterHotels = () => {
    const filteredHotels = rooms
      .slice()
      .filter((room) =>
        userData?.recentSearchedCities?.includes(room.hotel.city)
      );
    setRecommended(filteredHotels);
  };

  useEffect(() => {
    filterHotels();
  }, [rooms, userData]);

  return (
    recommended.length > 0 && (
      <div className="flex flex-col items-center px-6 md:px-16 lg:px-24 bg-slate-50 py-20">
        <Title
          title="Recommended Hotels"
          subTitle="Discover our handpicked selection of exceptional properties around the world, offering unparralleled luxury and unforgettable experiences"
        />
        <div className="flex flex-wrap items-center justify-center gap-6 mt-20">
          {recommended.slice(0, 4).map((room, index) => (
            <HotelCard key={room._id} room={room} index={index} />
          ))}
        </div>
      </div>
    )
  );
};

export default RecommendedHotels;
