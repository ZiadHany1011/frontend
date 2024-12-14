import React, { useState } from 'react';

const SandwichItem = ({ sandwich }) => {
  const [showFeedbackForm, setShowFeedbackForm] = useState(false);
  const [feedback, setFeedback] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const addToCart = async () => {
    try {
      const response = await fetch('http://localhost:8080/cart/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          sandwich_id: sandwich.ID,
          quantity: 1,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to add to cart');
      }

      alert('Added to cart successfully!');
    } catch (err) {
      alert(err.message);
    }
  };

  const handleFeedbackSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:8080/feedback', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          sandwich_id: sandwich.ID,
          comment: feedback
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to submit feedback');
      }

      setMessage('Feedback submitted successfully!');
      setFeedback('');
      setShowFeedbackForm(false);
      setError('');
    } catch (err) {
      setError(err.message);
      setMessage('');
    }
  };

  return (
    <div className="sandwich-item">
      <h3>{sandwich.NAME}</h3>
      <p className="description">{sandwich.DESCRIPTION}</p>
      <p className="price">${sandwich.PRICE}</p>
      <p className="stock">In Stock: {sandwich.QUANTITY}</p>
      <button 
        onClick={addToCart}
        disabled={sandwich.QUANTITY === 0}
      >
        {sandwich.QUANTITY === 0 ? 'Out of Stock' : 'Add to Cart'}
      </button>
      
      <button 
        onClick={() => setShowFeedbackForm(!showFeedbackForm)}
        className="feedback-button"
      >
        {showFeedbackForm ? 'Close Feedback' : 'Leave Feedback'}
      </button>

      {showFeedbackForm && (
        <div className="feedback-form">
          {message && <p className="success">{message}</p>}
          {error && <p className="error">{error}</p>}
          <form onSubmit={handleFeedbackSubmit}>
            <textarea
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              placeholder="Write your feedback here..."
              required
            />
            <button type="submit">Submit Feedback</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default SandwichItem;
