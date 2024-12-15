import React from 'react';
import { Link } from 'react-router-dom';

const Homepage = () => {
  return (
    <div className="homepage">
      <div className="hero-section">
        <h1>Welcome to BiteBuilder</h1>
        <p>Craft Your Perfect Sandwich Experience</p>
        <Link to="/menu" className="cta-button">
          Explore Our Menu
        </Link>
      </div>

      <div className="features-section">
        <div className="feature">
          <h2>Fresh Ingredients</h2>
          <p>Only the finest, freshest ingredients make it into our sandwiches</p>
        </div>
        <div className="feature">
          <h2>Custom Orders</h2>
          <p>Build your sandwich exactly the way you want it</p>
        </div>
        <div className="feature">
          <h2>Quick Service</h2>
          <p>Fast preparation without compromising quality</p>
        </div>
      </div>

      <div className="popular-section">
        <h2>Popular Choices</h2>
        <div className="popular-items">
          <div className="popular-item">
            <h3>Classic Club</h3>
            <p>Triple-decker with turkey, bacon, and fresh vegetables</p>
          </div>
          <div className="popular-item">
            <h3>Veggie Delight</h3>
            <p>Fresh vegetables with our special house dressing</p>
          </div>
          <div className="popular-item">
            <h3>Italian Supreme</h3>
            <p>A perfect blend of Italian meats and cheeses</p>
          </div>
        </div>
      </div>

      <div className="contact-section">
        <h2>Contact Us</h2>
        <div className="contact-content">
          <div className="contact-info">
            <div className="contact-item">
              <i className="fas fa-map-marker-alt"></i>
              <h3>Visit Us</h3>
              <p>123 Sandwich Street</p>
              <p>Foodie City, FC 12345</p>
            </div>
            <div className="contact-item">
              <i className="fas fa-phone"></i>
              <h3>Call Us</h3>
              <p>Phone: (555) 123-4567</p>
              <p>Fax: (555) 123-4568</p>
            </div>
            <div className="contact-item">
              <i className="fas fa-envelope"></i>
              <h3>Email Us</h3>
              <p>info@bitebuilder.com</p>
              <p>support@bitebuilder.com</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Homepage;
