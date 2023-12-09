import { Link, useNavigate } from 'react-router-dom';
import '../../styles/layout/navbar/Navbar.css';

const Navbar = () => {
const navigate = useNavigate();
  const handleNeedHelp = () =>{
    navigate('#')
  }
  return (
    <nav className="navbar">
      <ul className="navbar-list">
        <li className="navbar-item navbar-title">
          <Link to="/" className="nav-title">Website</Link>
        </li>
        <li className="navbar-item navbar-button">
          <button onClick={handleNeedHelp}>Need help?</button>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;