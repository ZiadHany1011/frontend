import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = ({ isLoggedIn, isAdmin, handleLogout }) => {
  return (
    <nav className="navbar">
      <div className="logo">
        <Link to="/">Sandwich Shop</Link>
      </div>
      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/menu">Menu</Link>
        {isLoggedIn ? (
          <>
            <Link to="/cart">Cart</Link>
            <Link to="/orders">My Orders</Link>
            <Link to="/profile">Profile</Link>
            {isAdmin && (
              <>
                <Link to="/admin">Admin Panel</Link>
                <Link to="/admin/feedback">Feedback</Link>
              </>
            )}
            <button onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
