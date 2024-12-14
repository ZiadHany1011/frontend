import React, { useState, useEffect } from 'react';

const FeedbackList = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchFeedbacks();
  }, []);

  const fetchFeedbacks = async () => {
    try {
      const response = await fetch('http://localhost:8080/admin/feedback', {
        credentials: 'include'
      });
      
      if (!response.ok) {
        throw new Error('Failed to fetch feedback');
      }

      const data = await response.json();
      setFeedbacks(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteFeedback = async (id) => {
    try {
      const response = await fetch(`http://localhost:8080/admin/feedback/${id}`, {
        method: 'DELETE',
        credentials: 'include'
      });

      if (!response.ok) {
        throw new Error('Failed to delete feedback');
      }

      setFeedbacks(feedbacks.filter(feedback => feedback.ID !== id));
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="feedback-list">
      <h2>Customer Feedback</h2>
      {feedbacks.length === 0 ? (
        <p>No feedback available</p>
      ) : (
        <div className="feedback-grid">
          {feedbacks.map((feedback) => (
            <div key={feedback.ID} className="feedback-card">
              <p>{feedback.COMMENT}</p>
              <div className="feedback-meta">
                <small>User ID: {feedback.USER_ID}</small>
                <small>Sandwich ID: {feedback.SANDWICH_ID}</small>
              </div>
              <button 
                onClick={() => handleDeleteFeedback(feedback.ID)}
                className="delete-btn"
              >
                Delete Feedback
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FeedbackList;
