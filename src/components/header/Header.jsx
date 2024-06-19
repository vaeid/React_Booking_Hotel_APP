import { MdLocationOn } from 'react-icons/md';
export default function Header() {
  return (
    <div className='header'>
      <div className='headerSearch'>
        <div className='headerSearchItem'>
          <MdLocationOn className='headerIcon' />
          <input type='text' placeholder='weare to go' className='headerSearchInput' name='destination' />
        </div>
        <div className='headerSearchItem'></div>
        <div className='headerSearchItem'></div>
        <div className='headerSearchItem'></div>
      </div>
    </div>
  );
}
