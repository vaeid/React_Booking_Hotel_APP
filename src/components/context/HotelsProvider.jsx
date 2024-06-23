import { createContext, useContext } from 'react';
import useFetch from '../../hooks/useFetch';
import { useSearchParams } from 'react-router-dom';
import { useState } from 'react';
import toast from 'react-hot-toast';
import axios from 'axios';
const hotelContext = createContext();
const BASE_URL = 'http://localhost:5000/hotels';

export default function HotelsProvider({ children }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const [currentHotel, setCurrentHotel] = useState(null);
  const [isLoadCurrentHotel, setIsLoadCurrentHotel] = useState(false);
  const destination = searchParams.get('destination');
  const room = JSON.parse(searchParams.get('options'))?.room;
  const { data: hotels, isLoading } = useFetch(BASE_URL, `q=${destination || ''}&accommodates_gte=${room || 1}`);
  async function getSingleHotel(id) {
    setIsLoadCurrentHotel(true);
    try {
      const { data } = await axios.get(`${BASE_URL}/${id}`);
      setCurrentHotel(data);
      setIsLoadCurrentHotel(false);
    } catch (error) {
      toast.error(error.message);
      setIsLoadCurrentHotel(false);
    }
  }
  return (
    <hotelContext.Provider value={{ isLoading, hotels, getSingleHotel, isLoadCurrentHotel, currentHotel }}>
      {children}
    </hotelContext.Provider>
  );
}

export function useHotels() {
  return useContext(hotelContext);
}
