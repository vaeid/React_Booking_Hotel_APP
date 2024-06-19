import { Toaster } from 'react-hot-toast';
import './App.css';
import Header from './components/header/Header';
import LocationList from './components/locations/LocationList';
import { Route, Routes } from 'react-router-dom';
import AppLayout from './components/layout/AppLayout';
import Hotels from './components/hotels/Hotels';
import HotelsProvider from './components/context/HotelsProvider';

function App() {
  return (
    <div className=''>
      <HotelsProvider>
        <Toaster />
        <Header />
        <Routes>
          <Route path='/' element={<LocationList />} />
          <Route path='/hotels' element={<AppLayout />}>
            <Route index element={<Hotels />} />
            <Route path=':id' element={<div>id</div>} />
          </Route>
        </Routes>
      </HotelsProvider>
    </div>
  );
}

export default App;
