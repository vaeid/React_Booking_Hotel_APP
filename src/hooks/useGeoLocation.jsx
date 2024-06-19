import React, { useState } from 'react';

export default function useGeoLocation() {
  const [isLoading, setIsLoading] = useState(false);
  const [position, setPositon] = useState({});
  const [erroe, setError] = useState(null);

  function getPosition() {
    if (!navigator.geolocation) return setError('Your Browser does not support geolocation');

    setIsLoading(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setPositon({ lat: pos.coords.latitude, lng: pos.coords.longitude });
        setIsLoading(false);
      },
      (err) => {
        setError(err.message);
        setIsLoading(false);
      }
    );
  }
  return { isLoading, position, getPosition, erroe };
}
