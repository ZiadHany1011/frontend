import React, { useState, useEffect } from 'react';

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await fetch('http://localhost:8080/orders', {
        credentials: 'include',
      });
      if (!response.ok) {
        throw new Error('Failed to fetch orders');
      }
      const data = await response.json();
      setOrders(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="order-history">
      <h2>Order History</h2>
      {orders.length === 0 ? (
        <p>No orders found</p>
      ) : (
        <div className="orders-list">
          {orders.map((order) => (
            <div key={order.ID} className="order-item">
              <h3>Order #{order.ID}</h3>
              <p>Sandwich: {order.SANDWICH_NAME}</p>
              <p>Quantity: {order.QUANTITY}</p>
              <p>Total Price: ${order.ITEM_PRICE * order.QUANTITY}</p>
              <p>Date: {new Date(order.ORDER_DATE).toLocaleDateString()}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OrderHistory;
