import React from 'react';
import { useUser } from '../UserContext';
import { useNavigate } from 'react-router-dom';

function Header() {
  const { user, setUser } = useUser();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('JWTBOOKINGTOKEN');
    setUser(null);
    navigate('/login');
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container">
        <a className="navbar-brand" href="#">Travelogue</a>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          
          {/* Conditionally render profile and logout options */}
          {user ? (
            <ul className="navbar-nav">
               <li className="nav-item">
              <a className="nav-link" href="#">Home</a>
            </li>
              <li className="nav-item">
                <button className="btn btn-link nav-link" onClick={handleLogout}>Logout</button>
              </li>
            </ul>
          ) : null}
          
        </div>
      </div>
    </nav>
  );
}

export default Header;
