import React, { useState, useEffect } from 'react';

const AdminPanel = () => {
  const [sandwiches, setSandwiches] = useState([]);
  const [users, setUsers] = useState([]);
  const [feedback, setFeedback] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [newSandwich, setNewSandwich] = useState({
    name: '',
    description: '',
    price: '',
    quantity: '',
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [sandwichesRes, usersRes, feedbackRes] = await Promise.all([
        fetch('http://localhost:8080/sandwiches', { credentials: 'include' }),
        fetch('http://localhost:8080/admin/users', { credentials: 'include' }),
        fetch('http://localhost:8080/admin/feedback', { credentials: 'include' }),
      ]);

      if (!sandwichesRes.ok || !usersRes.ok || !feedbackRes.ok) {
        throw new Error('Failed to fetch data');
      }

      const [sandwichesData, usersData, feedbackData] = await Promise.all([
        sandwichesRes.json(),
        usersRes.json(),
        feedbackRes.json(),
      ]);

      setSandwiches(sandwichesData);
      setUsers(usersData);
      setFeedback(feedbackData);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleAddSandwich = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:8080/admin/sandwich', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(newSandwich),
      });

      if (!response.ok) {
        throw new Error('Failed to add sandwich');
      }

      fetchData();
      setNewSandwich({ name: '', description: '', price: '', quantity: '' });
    } catch (err) {
      setError(err.message);
    }
  };

  const handleDeleteSandwich = async (id) => {
    try {
      const response = await fetch(`http://localhost:8080/admin/sandwich/${id}`, {
        method: 'DELETE',
        credentials: 'include',
      });

      if (!response.ok) {
        throw new Error('Failed to delete sandwich');
      }

      fetchData();
    } catch (err) {
      setError(err.message);
    }
  };

  const handleDeleteFeedback = async (id) => {
    try {
      const response = await fetch(`http://localhost:8080/admin/feedback/${id}`, {
        method: 'DELETE',
        credentials: 'include',
      });

      if (!response.ok) {
        throw new Error('Failed to delete feedback');
      }

      fetchData();
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="admin-panel">
      <h2>Admin Panel</h2>

      <section className="add-sandwich">
        <h3>Add New Sandwich</h3>
        <form onSubmit={handleAddSandwich}>
          <input
            type="text"
            placeholder="Name"
            value={newSandwich.name}
            onChange={(e) => setNewSandwich({ ...newSandwich, name: e.target.value })}
          />
          <textarea
            placeholder="Description"
            value={newSandwich.description}
            onChange={(e) => setNewSandwich({ ...newSandwich, description: e.target.value })}
          />
          <input
            type="number"
            placeholder="Price"
            value={newSandwich.price}
            onChange={(e) => setNewSandwich({ ...newSandwich, price: e.target.value })}
          />
          <input
            type="number"
            placeholder="Quantity"
            value={newSandwich.quantity}
            onChange={(e) => setNewSandwich({ ...newSandwich, quantity: e.target.value })}
          />
          <button type="submit">Add Sandwich</button>
        </form>
      </section>

      <section className="manage-sandwiches">
        <h3>Manage Sandwiches</h3>
        {sandwiches.map((sandwich) => (
          <div key={sandwich.ID} className="sandwich-item">
            <h4>{sandwich.NAME}</h4>
            <p>{sandwich.DESCRIPTION}</p>
            <p>Price: ${sandwich.PRICE}</p>
            <p>Stock: {sandwich.QUANTITY}</p>
            <button onClick={() => handleDeleteSandwich(sandwich.ID)}>Delete</button>
          </div>
        ))}
      </section>

      <section className="manage-users">
        <h3>Users</h3>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.ID}>
                <td>{user.ID}</td>
                <td>{user.NAME}</td>
                <td>{user.EMAIL}</td>
                <td>{user.ISADMIN ? 'Admin' : 'User'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <section className="manage-feedback">
        <h3>Feedback</h3>
        {feedback.map((item) => (
          <div key={item.ID} className="feedback-item">
            <p>{item.COMMENT}</p>
            <button onClick={() => handleDeleteFeedback(item.ID)}>Delete</button>
          </div>
        ))}
      </section>
    </div>
  );
};

export default AdminPanel;
