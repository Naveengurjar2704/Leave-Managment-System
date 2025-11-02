import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { getCurrentUser, getPendingLeaves, approveLeave, rejectLeave } from '../services/LeaveService';
import '../assets/styles/table.css';
import '../assets/styles/global.css';

const Admin = () => {
  const [leaves, setLeaves] = useState([]); // to store pending leaves request
  const navigate = useNavigate();
  const user = getCurrentUser(); // to currently looged in user details

  /**
   * this useeffect fetch the pending leave request
   * Redirects to home page if user is not admin.
   */
  useEffect(() => {
    // if user is not admin then redirect to home
    if (!user || user.role !== 'admin') {
      navigate('/');
      return;
    }
    // fetching all the pending request for admin view
    setLeaves(getPendingLeaves());
  }, [user, navigate]); // re run when user changes or navigate
  
  /**
   * this function is called when admin approve leave request
   * @param {string} id - it is the  Unique ID of the leave request to approve
   */
 const leaveApprove = (id) => {
    approveLeave(id); // update leave request to approved 
    setLeaves(getPendingLeaves()); // after leave is aproved pending request are referesh
  };


  /**
   * this function is called when admin reject the leave request 
   * @param {string} id - it is the Unique ID of the leave request to reject
   */
  const leaveReject = (id) => {
    rejectLeave(id); // update leave request to rejected
    setLeaves(getPendingLeaves()); // refresh pending request 
  };


  return (
    <>
      <Navbar />
      <div className="container mt-2">
        <h1 className="text-center mb-2">
          Admin - Pending Requests</h1>
        <div className="tablecontainer">
          <table className="tableStyle">
            <thead>
              <tr>
                <th>User</th>
                <th>From</th>
                <th>To</th>
                <th>Reason</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {leaves.length === 0 ? (
                <tr><td colSpan="5" className="text-center">No pending requests.</td></tr>
              ) : (
                leaves.map((leave) => (
                  <tr key={leave.id}>
                    <td>{leave.username}</td>
                    <td>{leave.fromDate}</td>
                    <td>{leave.toDate}</td>
                    <td>{leave.reason}</td>
                    <td>
                      <button 
                      className="btn btn-primary action-btn" 
                      onClick={() => leaveApprove(leave.id)}>
                        Approve
                      </button>
                      <button 
                      className="btn btn-danger action-btn" 
                      onClick={() => leaveReject(leave.id)}>
                        Reject
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default Admin;