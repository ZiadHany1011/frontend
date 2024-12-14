import React, { useState } from 'react';

const Feedback = ({ sandwichId }) => {
  const [comment, setComment] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:8080/feedback', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          sandwich_id: sandwichId,
          comment,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to submit feedback');
      }

      setSuccess('Feedback submitted successfully!');
      setComment('');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="feedback-container">
      <h3>Leave Feedback</h3>
      {error && <p className="error">{error}</p>}
      {success && <p className="success">{success}</p>}
      <form onSubmit={handleSubmit}>
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Write your feedback here..."
          required
        />
        <button type="submit">Submit Feedback</button>
      </form>
    </div>
  );
};

export default Feedback;
