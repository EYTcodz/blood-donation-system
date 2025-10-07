import React from 'react';
import { useAuth } from '../context/AuthContext';
import './Dashboard.css';

function Dashboard() {
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  const getWelcomeMessage = () => {
    switch (user.role) {
      case 'donor':
        return `Welcome, ${user.name}! Thank you for being a blood donor.`;
      case 'hospital':
        return `Welcome, ${user.hospitalName}! Hospital Management Dashboard.`;
      case 'blood_bank':
        return `Welcome, ${user.bloodBankName}! Blood Bank Management Dashboard.`;
      case 'admin':
        return `Welcome, Admin ${user.name}! System Administration Dashboard.`;
      default:
        return `Welcome, ${user.name}!`;
    }
  };

  return (
    <div className="dashboard">
      <nav className="navbar">
        <div className="nav-content">
          <h1>Blood Donation System</h1>
          <div className="nav-links">
            <span>Welcome, {user.name}</span>
            <button onClick={handleLogout} className="logout-btn">
              Logout
            </button>
          </div>
        </div>
      </nav>

      <div className="dashboard-content">
        <div className="welcome-section">
          <h2>{getWelcomeMessage()}</h2>
          <p>You are logged in as a <strong>{user.role.replace('_', ' ')}</strong></p>
        </div>

        <div className="user-info">
          <h3>Your Profile Information</h3>
          <div className="user-details">
            <div className="detail-item">
              <strong>Name:</strong> {user.name}
            </div>
            <div className="detail-item">
              <strong>Email:</strong> {user.email}
            </div>
            <div className="detail-item">
              <strong>Phone:</strong> {user.phone}
            </div>
            <div className="detail-item">
              <strong>Blood Type:</strong> {user.bloodType || 'Not specified'}
            </div>
            <div className="detail-item">
              <strong>Role:</strong> {user.role.replace('_', ' ')}
            </div>
            {user.hospitalName && (
              <div className="detail-item">
                <strong>Hospital:</strong> {user.hospitalName}
              </div>
            )}
            {user.bloodBankName && (
              <div className="detail-item">
                <strong>Blood Bank:</strong> {user.bloodBankName}
              </div>
            )}
          </div>
        </div>

        <div className="dashboard-cards">
          <div className="card">
            <h3>Donation History</h3>
            <p>View your past blood donations and track your impact.</p>
            <button className="card-btn">View History</button>
          </div>
          
          <div className="card">
            <h3>Schedule Donation</h3>
            <p>Book your next blood donation appointment.</p>
            <button className="card-btn">Schedule Now</button>
          </div>
          
          <div className="card">
            <h3>Find Centers</h3>
            <p>Locate nearby blood donation centers.</p>
            <button className="card-btn">Find Centers</button>
          </div>
          
          <div className="card">
            <h3>Eligibility</h3>
            <p>Check if you're eligible to donate blood today.</p>
            <button className="card-btn">Check Eligibility</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;