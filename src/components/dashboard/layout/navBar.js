import React, { useEffect, useContext, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { logout } from '../../../actions/authActions';
import Search from './search';
import UserContext from '../../../context/userContext';
import { useDispatch } from 'react-redux';
import { changeFeelColor } from '../../../actions/colorActions';
import ChangeColor from './changeColor';

const NavBar = () => {
  const [color, setColor] = useState();

  const history = useHistory();
  const user = useContext(UserContext);
  const dispatch = useDispatch();

  useEffect(() => {
    setColor(user.feel_color);
  }, [user]);

  const handleColorChange = color => {
    dispatch(changeFeelColor(color, () => {
      setColor(color);
    }));
  };

  return (
    <div className={`frameReady ${color}`}>
      <div className="top" id="main-menu">
        <div className="contentFit d-flex">
          <div className="burgerMenu">
            <span className="menuBlock" onClick={() => history.goBack()}>
              <i className="fas fa-arrow-left" />
            </span>
          </div>
          <div className="search" id="search">
            <img src="/assets/images/icons/searchicon.png" alt="search Icon" />
          </div>
        </div>
        <Link to="" className="feelIcon">
          <img alt="" src="/assets/images/icons/feelicon.png" />
        </Link>
      </div>

      <Search />
      <ChangeColor onColorChange={handleColorChange} />
      <hr className="do-not-delete" />

      <nav>
        <ul className="dropdownM">
          <li>
            <Link to="/dashboard/my-studio">My Studio</Link>
          </li>
          <li>
            <Link to="/dashboard/my-studio/profile">My Profile</Link>
          </li>
          <li>
            <Link to="/dashboard/change-password">Change Password</Link>
          </li>
          <li>
            <a href="/dashboard/privacy">Privacy</a>
          </li>
          <li>
            <a href="#__security">Security</a>
          </li>
          <li>
            <a href="#__tickets">Tickets</a>
          </li>
          <li>
            <a href="/dashboard/feel-history">Feel History</a>
          </li>
          <li>
            <a href="#__vault">Vault</a>
          </li>
          <li>
            <a href="#__help">Help</a>
          </li>
          <li>
            <a href="#__about">About</a>
          </li>
          <li>
            <a href="#__searchHistory">Search History</a>
          </li>
          <li>
            <Link className="logout" to="" onClick={() => logout()}>Logout</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default NavBar;
