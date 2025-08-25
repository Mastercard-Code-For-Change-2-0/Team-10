import React from 'react';
import { Link } from 'react-router-dom';
import './App.css';

const LandingPage = () => {
    return (
        <div className="auth-container">
            <div className="auth-header">
                <h2>Welcome to Our NGO</h2>
                <p>Learn more about our mission and how you can help.</p>
            </div>
            <div className="auth-link">
                <Link to="/login" className="auth-link-button">Login</Link>
            </div>
        </div>
    );
};

export default LandingPage;
