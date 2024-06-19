import { MapContainer, Marker, Popup, TileLayer, useMap } from 'react-leaflet';
import { useHotels } from '../context/HotelsProvider';
import { useEffect, useState } from 'react';
import Loader from '../loader/Loader';
import { useSearchParams } from 'react-router-dom';
import useGeoLocation from '../../hooks/useGeoLocation';
import { HiLocationMarker } from 'react-icons/hi';

export default function Map() {
  const { isLoading, hotels } = useHotels();
  const [searchParams, setSearchParams] = useSearchParams();
  const [mapCenter, setMapCenter] = useState([52.36, 4.86]);
  const lat = searchParams.get('lat');
  const lng = searchParams.get('lng');
  const { isLoading: isLoadingPosition, position: geoPosition, getPosition, isError } = useGeoLocation();
  if (isLoading) return <Loader />;
  useEffect(() => {
    if (lat && lng) setMapCenter([lat, lng]);
  }, [lat, lng]);
  useEffect(() => {
    if (geoPosition?.lat) {
      setMapCenter([geoPosition.lat, geoPosition.lng]);
    }
  }, [geoPosition]);

  return (
    <div className='mapContainer'>
      <MapContainer className='map' center={mapCenter} zoom={15} scrollWheelZoom={true}>
        <button className='getLocation' onClick={getPosition}>
          {isLoadingPosition ? 'loading...' : <HiLocationMarker />}
        </button>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url='https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png'
        />
        {lat && lng && <ChangeCenter position={mapCenter} />}

        {hotels.map((item) => (
          <Marker key={item.id} position={[item.latitude, item.longitude]}>
            <Popup>
              <h4>{item.name}</h4>
              <p>{item.description}</p>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
function ChangeCenter({ position }) {
  const map = useMap();
  map.setView(position);
  return null;
}
