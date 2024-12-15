import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Homepage from './components/Homepage';
import Login from './components/Login';
import Register from './components/Register';
import SandwichList from './components/SandwichList';
import Cart from './components/Cart';
import OrderHistory from './components/OrderHistory';
import Profile from './components/Profile';
import AdminPanel from './components/AdminPanel';
import FeedbackList from './components/FeedbackList';
import './App.css';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  const handleLogout = () => {
    setIsLoggedIn(false);
    setIsAdmin(false);
  };

  return (
    <Router>
      <div className="App">
        <Navbar isLoggedIn={isLoggedIn} isAdmin={isAdmin} handleLogout={handleLogout} />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/menu" element={<SandwichList isAdmin={isAdmin} />} />
            <Route
              path="/login"
              element={
                isLoggedIn ? (
                  <Navigate to="/menu" />
                ) : (
                  <Login setIsLoggedIn={setIsLoggedIn} setIsAdmin={setIsAdmin} />
                )
              }
            />
            <Route
              path="/register"
              element={isLoggedIn ? <Navigate to="/menu" /> : <Register />}
            />
            <Route
              path="/cart"
              element={isLoggedIn ? <Cart /> : <Navigate to="/login" />}
            />
            <Route
              path="/orders"
              element={isLoggedIn ? <OrderHistory /> : <Navigate to="/login" />}
            />
            <Route
              path="/profile"
              element={isLoggedIn ? <Profile /> : <Navigate to="/login" />}
            />
            <Route
              path="/admin/*"
              element={isLoggedIn && isAdmin ? <AdminPanel /> : <Navigate to="/login" />}
            />
            <Route
              path="/admin/feedback"
              element={
                isLoggedIn && isAdmin ? (
                  <FeedbackList />
                ) : (
                  <Navigate to="/" />
                )
              }
            />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
