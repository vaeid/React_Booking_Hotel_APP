import { Toaster } from 'react-hot-toast';
import './App.css';
import Header from './components/header/Header';
import LocationList from './components/locations/LocationList';
import { Route, Routes } from 'react-router-dom';
import AppLayout from './components/layout/AppLayout';
import Hotels from './components/hotels/Hotels';
import HotelsProvider from './components/context/HotelsProvider';
import SingleHotel from './components/hotels/singleHotel';
import BookmarkLayout from './components/bookmark/BookmarkLayout';
import BookmarksProvider from './components/context/BookmarksProvider';
import Bookmarks from './components/bookmark/Bookmarks';
import SingleBookmark from './components/bookmark/SingleBookmark';
import AddNewBookmark from './components/bookmark/AddNewBookmark';
import AuthProvider from './components/context/AuthProvider';
import Login from './components/auth/login';
import ProtectedRoute from './components/auth/ProtectedRoute';

function App() {
  return (
    <div className=''>
      <AuthProvider>
        <BookmarksProvider>
          <HotelsProvider>
            <Toaster />
            <Header />
            <Routes>
              <Route path='/' element={<LocationList />} />
              <Route path='/login' element={<Login />} />
              <Route path='/hotels' element={<AppLayout />}>
                <Route index element={<Hotels />} />
                <Route path=':id' element={<SingleHotel />} />
              </Route>
              <Route
                path='/bookmark'
                element={
                  <ProtectedRoute>
                    <BookmarkLayout />
                  </ProtectedRoute>
                }
              >
                <Route index element={<Bookmarks />} />
                <Route path='add' element={<AddNewBookmark />} />
                <Route path=':id' element={<SingleBookmark />} />
              </Route>
            </Routes>
          </HotelsProvider>
        </BookmarksProvider>
      </AuthProvider>
    </div>
  );
}

export default App;
