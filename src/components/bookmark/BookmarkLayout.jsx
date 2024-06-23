import { Outlet } from 'react-router-dom';
import Map from '../map/Map';
import { useBookmarks } from '../context/BookmarksProvider';

export default function BookmarkLayout() {
  const { bookmarks } = useBookmarks();
  return (
    <div className='appLayout'>
      <div className='sidebar'>
        <Outlet />
      </div>

      <Map markerLocations={bookmarks} />
    </div>
  );
}
