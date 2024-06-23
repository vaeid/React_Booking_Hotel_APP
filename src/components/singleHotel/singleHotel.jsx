import { useParams } from 'react-router-dom';
import Loader from '../loader/Loader';
import useFetch from '../../hooks/useFetch';

export default function SingleHotel() {
  const { id } = useParams();
  const { data, isLoading } = useFetch(`http://localhost:5000/hotels/${id}`);
  if (isLoading) return <Loader />;
  return (
    <div className='room'>
      <div className='roomDetail'>
        <h2>{data.name}</h2>
        <div>
          {data.number_of_reviews} views &bull; {data.smart_location}
        </div>
        <img src='/assets/img/images.jpg' alt='' />
      </div>
    </div>
  );
}
