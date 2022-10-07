import { Link } from 'react-router-dom';
import './css/Navbar.scss';

function Navbar() {
  return (
        <div className="navbar"> 
          <ul className='navbar_items'>
            <li><Link to='/'>HOME</Link></li>
            <li><Link to='/feed'>Show Cat</Link></li>
          </ul>
          <ul className='navbar_items'>
            <li><Link to='/user/login'>Login</Link></li>
            <li><Link to='/user/signup'>Sign Up</Link></li>
          </ul>
        </div>
  );
}

export default Navbar;