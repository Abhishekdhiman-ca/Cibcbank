import React from 'react';
import { Link } from 'react-router-dom';
import bankLogo from './CIBC_logo_2021.svg';
import 'bootstrap/dist/css/bootstrap.min.css';

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <Link className="navbar-brand" to="/">
          <img src={bankLogo} alt="Bank Logo" width="90" height="50" />
        </Link>
        <ul className="navbar-nav ms-auto">
          <li className="nav-item">
            <Link className="nav-link" to="/" style={{ fontSize: '1.2rem' }}>Home</Link> 
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/deposit" style={{ fontSize: '1.2rem' }}>Deposit</Link> 
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/withdraw" style={{ fontSize: '1.2rem' }}>Withdraw</Link> 
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/login" style={{ fontSize: '1.2rem', color: 'red' }}>Login</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
