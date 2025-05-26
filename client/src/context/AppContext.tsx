import { useAuth, useUser } from '@clerk/clerk-react';
import axios from 'axios';
import { createContext, useContext, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import type { RoomType, UserDataType } from '../../../shared/types';

axios.defaults.baseURL = import.meta.env.VITE_BACKEND_URL;

interface AppContextType {
  currency: string;
  navigate: ReturnType<typeof useNavigate>;
  user: ReturnType<typeof useUser>['user'];
  userData: UserDataType | null;
  getToken: ReturnType<typeof useAuth>['getToken'];
  isOwner: boolean;
  setIsOwner: React.Dispatch<React.SetStateAction<boolean>>;
  showHotelReg: boolean;
  setShowHotelReg: React.Dispatch<React.SetStateAction<boolean>>;
  axios: typeof axios;
  searchedCities: string[];
  setSearchedCities: React.Dispatch<React.SetStateAction<string[]>>;
  rooms: RoomType[];
  setRooms: React.Dispatch<React.SetStateAction<RoomType[]>>;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const currency = import.meta.env.VITE_CURRENCY || '$';
  const navigate = useNavigate();
  const { user } = useUser();
  const { getToken } = useAuth();
  const [isOwner, setIsOwner] = useState(true);
  const [showHotelReg, setShowHotelReg] = useState(false);
  const [searchedCities, setSearchedCities] = useState<string[]>([]);
  const [rooms, setRooms] = useState<RoomType[]>([]);
  const [userData, setUserData] = useState<UserDataType | null>(null);

  const fetchRooms = async () => {
    try {
      const { data } = await axios.get('/api/rooms');

      if (data.success) {
        setRooms(data.rooms);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error((error as Error).message);
    }
  };

  const fetchUser = async () => {
    try {
      const { data } = await axios.get('/api/user', {
        headers: { Authorization: `Bearer ${await getToken()}` },
      });

      if (data.success) {
        // setIsOwner(data.role === 'hotel.Owner');
        setSearchedCities(data.recentSearchCities || []);
        setUserData(data || []);
      } else {
        setTimeout(fetchUser, 5000);
      }
    } catch (error) {
      toast.error((error as Error).message);
    }
  };

  useEffect(() => {
    if (user) {
      fetchUser();
    }
  }, [user]);

  useEffect(() => {
    fetchRooms();
  }, []);

  const value = {
    currency,
    navigate,
    user,
    userData,
    getToken,
    isOwner,
    setIsOwner,
    showHotelReg,
    setShowHotelReg,
    axios,
    searchedCities,
    setSearchedCities,
    rooms,
    setRooms,
  };
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};
