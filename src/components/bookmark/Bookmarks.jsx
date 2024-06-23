import ReactCountryFlag from 'react-country-flag';
import { useBookmarks } from '../context/BookmarksProvider';
import Loader from '../loader/Loader';
import { Link } from 'react-router-dom';

export default function Bookmarks() {
  const { isLoading, bookmarks, currentBookmark } = useBookmarks();
  if (isLoading) return <Loader />;
  return (
    <div>
      <h2>Bookmark List( {bookmarks.length})</h2>
      <div className='bookmarkList'>
        {bookmarks.map((item) => {
          return (
            <Link
              key={item.id}
              to={`${item.id}?lat=${item.latitude}&lng=${item.longitude}`}
              className={`bookmarkItem 
                ${item.id === currentBookmark?.id ? 'current-bookmark' : ''}
                `}
            >
              <ReactCountryFlag svg countryCode={item.countryCode} />
              <span>{item.country} </span>
              <strong>{item.cityName} </strong>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
