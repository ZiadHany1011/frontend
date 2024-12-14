import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Login from './components/Login';
import Register from './components/Register';
import SandwichList from './components/SandwichList';
import Cart from './components/Cart';
import OrderHistory from './components/OrderHistory';
import AdminPanel from './components/AdminPanel';
import Profile from './components/Profile';
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
            <Route path="/" element={<Navigate to="/menu" />} />
            <Route path="/menu" element={<SandwichList />} />
            <Route
              path="/login"
              element={
                <Login setIsLoggedIn={setIsLoggedIn} setIsAdmin={setIsAdmin} />
              }
            />
            <Route path="/register" element={<Register />} />
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
              path="/admin"
              element={
                isLoggedIn && isAdmin ? (
                  <AdminPanel />
                ) : (
                  <Navigate to="/" />
                )
              }
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
