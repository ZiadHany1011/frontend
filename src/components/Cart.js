import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    try {
      const response = await fetch('http://localhost:8080/cart', {
        credentials: 'include',
      });
      if (!response.ok) {
        throw new Error('Failed to fetch cart');
      }
      const data = await response.json();
      setCartItems(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const updateQuantity = async (itemId, newQuantity) => {
    try {
      const response = await fetch(`http://localhost:8080/cart/update/${itemId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ quantity: newQuantity }),
      });

      if (!response.ok) {
        throw new Error('Failed to update quantity');
      }

      fetchCart();
    } catch (err) {
      setError(err.message);
    }
  };

  const clearCart = async () => {
    try {
      const response = await fetch('http://localhost:8080/cart/clear', {
        method: 'DELETE',
        credentials: 'include',
      });

      if (!response.ok) {
        throw new Error('Failed to clear cart');
      }

      setCartItems([]);
    } catch (err) {
      setError(err.message);
    }
  };

  const placeOrder = async () => {
    try {
      const response = await fetch('http://localhost:8080/order/place', {
        method: 'POST',
        credentials: 'include',
      });

      if (!response.ok) {
        throw new Error('Failed to place order');
      }

      alert('Order placed successfully!');
      setCartItems([]);
      navigate('/orders');
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  const total = cartItems.reduce((sum, item) => sum + item.PRICE * item.QUANTITY, 0);

  return (
    <div className="cart-container">
      <h2>Your Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <>
          {cartItems.map((item) => (
            <div key={item.ID} className="cart-item">
              <h3>{item.NAME}</h3>
              <p>Price: ${item.PRICE}</p>
              <div className="quantity-controls">
                <button
                  onClick={() => updateQuantity(item.ID, item.QUANTITY - 1)}
                  disabled={item.QUANTITY <= 1}
                >
                  -
                </button>
                <span>{item.QUANTITY}</span>
                <button
                  onClick={() => updateQuantity(item.ID, item.QUANTITY + 1)}
                >
                  +
                </button>
              </div>
              <p>Subtotal: ${item.PRICE * item.QUANTITY}</p>
            </div>
          ))}
          <div className="cart-summary">
            <h3>Total: ${total}</h3>
            <button onClick={clearCart}>Clear Cart</button>
            <button onClick={placeOrder}>Place Order</button>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
