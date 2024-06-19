import { createContext, useContext } from 'react';
import useFetch from '../../hooks/useFetch';
import { useSearchParams } from 'react-router-dom';
import Hotels from '../hotels/Hotels';
const hotelContext = createContext();
export default function HotelsProvider({ children }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const destination = searchParams.get('destination');
  const room = JSON.parse(searchParams.get('options'))?.room;
  const { data: hotels, isLoading } = useFetch(
    'http://localhost:5000/hotels',
    `q=${destination || ''}&accommodates_gte=${room || 1}`
  );
  return <hotelContext.Provider value={{ isLoading, hotels }}>{children}</hotelContext.Provider>;
}
export function useHotels() {
  return useContext(hotelContext);
}
