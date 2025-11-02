import React, { useEffect } from 'react';
import  {useNavigate} from 'react-router-dom';
import Navbar from '../components/Navbar';
import  {getCurrentUser, getLeaveBalance}  from '../services/LeaveService';
import '../assets/styles/dashboard.css';
import '../assets/styles/global.css';

const Dashboard = () => {
  const navigate = useNavigate(); // hook to navigate to differrent pages 
  const user = getCurrentUser(); // here we fetch the current user detail
  
  /** 
   * Redirects to home page if user is not admin.
   */
  useEffect(() => {
    // if user is not logged in or user is not employe the it will redirect it to home
    if (!user || user.role !== 'employee') {
      navigate('/'); //navigate to homepage
    }
  }, [user, navigate]); // effect rerun when user is changed or navigated 

  
   // this fetch the leavebalance of user from the leaveSerivce.js 
  const balance = getLeaveBalance(user.username);

  return (
    <>
      <Navbar />
      <div 
      className="container" 
      style={{marginTop:'2rem'}}>
        <h1 
        className="heading">Welcome, {user.username}!</h1>
        <div 
        className="dashboard-grid">
          <div 
          className="balance-card">
            <h3>Available Leave Balance</h3>
            <div 
            className="balance">{balance}</div>
          </div>
          <div 
          className="buttons mt-1" style={{ alignSelf: 'center' }}>
            <button 
            className="button button-primary" onClick={() => navigate('/apply-leave')}>
              Apply Leave
            </button>
            <button 
            className="button button-secondary" onClick={() => navigate('/leave-history')}>
              View History
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;