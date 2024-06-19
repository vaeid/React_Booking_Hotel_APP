import { Link } from 'react-router-dom';

import Loader from '../loader/Loader';
import { useHotels } from '../context/HotelsProvider';

export default function Hotels() {
  const { isLoading, hotels } = useHotels();
  if (isLoading) return <Loader />;
  return (
    <div className='searchList'>
      <h2>search result( {hotels.length})</h2>
      {hotels.map((item) => {
        return (
          <Link key={item.id} to={`/hotels/${item.id}?lat=${item.lat}&?lng=${item.lng}`}>
            <div className='searchItem'>
              <img src='/assets/img/images.jpg' alt={item.name} />
              <div className='searchItemDesc'>
                <p className='location'>{item.smart_location} </p>
                <p className='name'>{item.name} </p>
                <p className='price'>
                  € &nbsp; {item.price} &nbsp; <span>Night</span>
                </p>
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
