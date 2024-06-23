import React from 'react';
import useFetch from '../../hooks/useFetch';
import { Link } from 'react-router-dom';

export default function LocationList() {
  const { data, isLoading } = useFetch('http://localhost:5000/hotels');
  if (isLoading) <p>Loading...</p>;
  return (
    <div className='nearbyLocation'>
      <h2> Nearby Locations</h2>
      <div className='locationList'>
        {data.map((item) => {
          return (
            <Link key={item.id} to={`/hotels/${item.id}?lat=${item.latitude}&lng=${item.longitude}`}>
              <div className='locationItem'>
                <img src='/assets/img/images.jpg' alt={item.name} />
                <div className='locationItemDesc'>
                  <p className='location'>{item.smart_location}</p>
                  <p className='name'>{item.name}</p>
                  <p className='price'>
                    € &nbsp; {item.price} &nbsp; <span>Night</span>
                  </p>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
