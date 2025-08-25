import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './Dashboard.css';

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { userId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(`http://localhost:8080/dashboard/${userId}`);
        const data = await response.json();
        
        if (response.ok) {
          setUser(data.user);
        } else {
          setError(data.message);
        }
      } catch (error) {
        setError('Failed to fetch user data');
        console.error('Dashboard fetch error:', error);
      } finally {
        setLoading(false);
      }
    };

    if (userId) {
      fetchUserData();
    }
  }, [userId]);

  const handleLogout = () => {
    // Clear any stored user data and redirect to login
    localStorage.removeItem('user');
    navigate('/login');
  };

  if (loading) {
    return <div className="dashboard-loading">Loading dashboard...</div>;
  }

  if (error) {
    return (
      <div className="dashboard-error">
        <h2>Error</h2>
        <p>{error}</p>
        <button onClick={() => navigate('/login')}>Go to Login</button>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="dashboard-error">
        <h2>User not found</h2>
        <button onClick={() => navigate('/login')}>Go to Login</button>
      </div>
    );
  }

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h1>Welcome to Your Dashboard, {user.name}!</h1>
        <button onClick={handleLogout} className="logout-btn">
          Logout
        </button>
      </header>

      <div className="dashboard-content">
        <div className="user-info-card">
          <h2>Profile Information</h2>
          <div className="info-grid">
            <div className="info-item">
              <label>Name:</label>
              <span>{user.name}</span>
            </div>
            <div className="info-item">
              <label>Email:</label>
              <span>{user.email}</span>
            </div>
            <div className="info-item">
              <label>Organization:</label>
              <span>{user.organization}</span>
            </div>
            <div className="info-item">
              <label>Role:</label>
              <span className={`role-badge role-${user.role}`}>
                {user.role}
              </span>
            </div>
            <div className="info-item">
              <label>Member Since:</label>
              <span>{new Date(user.createdAt).toLocaleDateString()}</span>
            </div>
          </div>
        </div>

        <div className="dashboard-actions">
          <h2>Quick Actions</h2>
          <div className="action-buttons">
            {user.role === 'donor' && (
              <>
                <button className="action-btn primary">Make a Donation</button>
                <button className="action-btn secondary">View Donation History</button>
                <button className="action-btn secondary">Update Profile</button>
              </>
            )}
            
            {user.role === 'organization' && (
              <>
                <button className="action-btn primary">Create Campaign</button>
                <button className="action-btn secondary">Manage Campaigns</button>
                <button className="action-btn secondary">View Donations</button>
              </>
            )}
            
            {user.role === 'admin' && (
              <>
                <button className="action-btn primary">Manage Users</button>
                <button className="action-btn secondary">View Analytics</button>
                <button className="action-btn secondary">System Settings</button>
              </>
            )}
          </div>
        </div>

        <div className="recent-activity">
          <h2>Recent Activity</h2>
          <p>No recent activity to display.</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
