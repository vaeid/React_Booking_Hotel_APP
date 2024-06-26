import { MdLocationOn, MdLogout } from 'react-icons/md';
import { HiCalendar, HiMinus, HiPlus, HiSearch } from 'react-icons/hi';
import { useRef, useState } from 'react';
import useOutsideClick from '../../hooks/useOutsideClick';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { DateRange } from 'react-date-range';
import { format } from 'date-fns';
import { NavLink, createSearchParams, useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../context/AuthProvider';

export default function Header() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [destination, setDestination] = useState(searchParams.get('destination') || '');
  const [openOptions, setOpenOptions] = useState(false);
  const [options, setOptions] = useState({ adult: 1, children: 0, room: 1 });
  const navigate = useNavigate();
  const [dateRange, setDateRange] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: 'travelDateSelection',
    },
  ]);
  const [openDate, setOpenDate] = useState(false);
  const handelSearch = () => {
    const encodedParam = createSearchParams({
      date: JSON.stringify(dateRange),
      destination,
      options: JSON.stringify(options),
    });
    navigate({ pathname: '/hotels', search: encodedParam.toString() });
  };
  const handleOptions = (name, operation) => {
    setOptions((preOption) => {
      return { ...preOption, [name]: operation === 'inc' ? preOption[name] + 1 : preOption[name] - 1 };
    });
  };
  return (
    <div className='header'>
      <NavLink to='/bookmark'>Bookmarks</NavLink>
      <div className='headerSearch'>
        <div className='headerSearchItem'>
          <MdLocationOn className='headerIcon locationIcon' />
          <input
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            type='text'
            placeholder='weare to go'
            className='headerSearchInput'
            name='destination'
          />
          <div className='seperator'></div>
        </div>
        <div className='headerSearchItem'>
          <HiCalendar className='headerIcon dateIcon' />
          <div className='dateDropDown' onClick={() => setOpenDate(!openDate)}>
            {`${format(dateRange[0].startDate, 'dd/MM/yyyy')} to ${format(dateRange[0].endDate, 'dd/MM/yyyy')} `}
          </div>
          {openDate && (
            <DateRange
              className='date'
              onChange={(item) => setDateRange([item.travelDateSelection])}
              ranges={dateRange}
              minDate={new Date()}
            />
          )}
          <div className='seperator'></div>
        </div>
        <div className='headerSearchItem'>
          <div id='optionDropDown' onClick={() => setOpenOptions(!openOptions)}>
            {options.adult} Adult &bull; {options.children} Children &bull; {options.room} Room{' '}
          </div>
          {openOptions && (
            <GuestOptionList options={options} handleOptions={handleOptions} setOpenOptions={setOpenOptions} />
          )}
          <div className='seperator'></div>
        </div>
        <div className='headerSearchItem'>
          <button className='headerSearchBtn' onClick={handelSearch}>
            <HiSearch className='headerIcon' />
          </button>
        </div>
      </div>
      <User />
    </div>
  );
}
function GuestOptionList({ options, handleOptions, setOpenOptions }) {
  const optionRef = useRef();
  useOutsideClick(optionRef, 'optionDropDown', () => setOpenOptions(false));
  return (
    <div className='guestOptions' ref={optionRef}>
      <OptionItem handleOptions={handleOptions} type='adult' options={options} minLimit={1} />
      <OptionItem handleOptions={handleOptions} type='children' options={options} minLimit={0} />
      <OptionItem handleOptions={handleOptions} type='room' options={options} minLimit={1} />
    </div>
  );
}
function OptionItem({ options, type, minLimit, handleOptions }) {
  return (
    <div className='guestOptionItem'>
      <span className='optionText'>{type}</span>
      <div className='optionCounter'>
        <button
          disabled={options[type] <= minLimit}
          className='optionCounterBtn'
          onClick={() => {
            handleOptions(type, 'dec');
          }}
        >
          <HiMinus className='icon' />
        </button>
        <span className='optionCounterNumber'>{options[type]}</span>
        <button
          className='optionCounterBtn'
          onClick={() => {
            handleOptions(type, 'inc');
          }}
        >
          {' '}
          <HiPlus className='icon' />
        </button>
      </div>
    </div>
  );
}
function User() {
  const navigate = useNavigate();
  const { user, isAuthenticated, logout } = useAuth();
  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div>
      {isAuthenticated ? (
        <div>
          <strong>{user.name}</strong>
          <button>
            &nbsp; <MdLogout onClick={handleLogout} className='logout icon' />
          </button>
        </div>
      ) : (
        <NavLink to='/login'>login</NavLink>
      )}
    </div>
  );
}
