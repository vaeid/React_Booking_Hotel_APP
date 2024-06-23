import { useNavigate, useParams } from 'react-router-dom';
import { useBookmarks } from '../context/BookmarksProvider';
import { useEffect } from 'react';
import Loader from '../loader/Loader';
import ReactCountryFlag from 'react-country-flag';

export default function SingleBookmark() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getBookmark, currentBookmark, isLoadCurrentBookmark } = useBookmarks();
  useEffect(() => {
    getBookmark(id);
    return () => {};
  }, [id]);
  if (isLoadCurrentBookmark || !currentBookmark) return <Loader />;
  return (
    <div>
      <button className='btn btn--back' onClick={() => navigate(-1)}>
        &larr; Back
      </button>
      <br />
      <br />
      <br />
      <br />
      <br />
      <h2>{currentBookmark.cityName}</h2>
      <br />
      <ReactCountryFlag svg countryCode={currentBookmark.countryCode} />
      <span>{currentBookmark.country} </span>
    </div>
  );
}
