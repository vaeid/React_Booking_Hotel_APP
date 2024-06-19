import { Toaster } from 'react-hot-toast';
import './App.css';
import Header from './components/header/Header';
import LocationList from './components/locations/LocationList';
import { Route, Routes, useSearchParams } from 'react-router-dom';
import AppLayout from './components/layout/AppLayout';
import Hotels from './components/hotels/Hotels';

function App() {
  const [serchParams, setSearchParams] = useSearchParams();
  const destination = searchParams.get('destination');
  const rooms = searchParams.get('rooms');
  const room = JSON.parse(searchParams.get('options')?.room);
  return (
    <div className=''>
      <Toaster />
      <Header />
      <Routes>
        <Route path='/' element={<LocationList />} />
        <Route path='/hotels' element={<AppLayout />}>
          <Route index element={<Hotels />} />
          <Route path=':id' element={<div>id</div>} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
