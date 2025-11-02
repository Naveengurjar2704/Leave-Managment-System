import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { logout, getCurrentUser } from '../services/LeaveService';
import '../assets/styles/responsive.css';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const user = getCurrentUser();

  /**
   * This function is used to call the log out function from the LeaveService.js 
   */
  const userLogout = () => {
    logout(); // calling the log out function from leaveService.js
    navigate('/'); // after logout Navigate to homepage
  };

  

  const isAdmin = user.role === 'admin'; // true if user is admin

  return (
    <nav>
      <div className="container nav-container">
        <div className="logo">Leave-Managment</div>
        <div className="hamburger" onClick={() => setIsOpen(!isOpen)}>
          <div></div><div></div><div></div>
        </div>
        <div className={`nav-menu ${isOpen ? 'active' : ''}`}>
          {!isAdmin ? (
            <>
              <a href="/dashboard">Dashboard</a>
              <a href="/apply-leave">Apply Leave</a>
              <a href="/leave-history">History</a>
              <a href="/admin">Admin Panel</a>

            </>
          ) : (
            <a href="/admin">Admin Panel</a>
          )}
          <a onClick={userLogout} style={{ cursor: 'pointer' }}>Logout</a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;