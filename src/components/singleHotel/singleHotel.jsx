import { useParams } from 'react-router-dom';
import Loader from '../loader/Loader';
import { useHotels } from '../context/HotelsProvider';
import { useEffect } from 'react';

export default function SingleHotel() {
  const { id } = useParams();
  const { getSingleHotel, isLoadCurrentHotel, currentHotel } = useHotels();
  useEffect(() => {
    getSingleHotel(id);
  }, [id]);
  if (isLoadCurrentHotel || !currentHotel) return <Loader />;
  return (
    <div className='room'>
      <div className='roomDetail'>
        <h2>{currentHotel.name}</h2>
        <div>
          {currentHotel.number_of_reviews} views &bull; {currentHotel.smart_location}
        </div>
        <img src='/assets/img/images.jpg' alt='' />
      </div>
    </div>
  );
}
