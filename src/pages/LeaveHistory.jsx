import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { getCurrentUser, getUserLeaves } from "../services/LeaveService";
import "../assets/styles/table.css";
import "../assets/styles/global.css";

const LeaveHistory = () => {
  const [leaves, setLeaves] = useState([]);
  const navigate = useNavigate(); // hook to navigate to differrent pages
  const user = getCurrentUser(); // here we fetch the current user detail

  /**
   * Redirects to home page if user is not admin.
   */
  useEffect(() => {
    if (!user || user.role !== "employee") {
      // if user is not logged in or user is not employe the it will redirect it to home
      navigate("/"); //navigate to homepage
      return;
    }
    setLeaves(getUserLeaves(user.username));
  }, [user, navigate]); // Re-run when user is changed or navigated

  return (
    <>
      <Navbar />
      <div 
      className="container mt-2">
      <h1 
        className="text-center mb-2">
          Leave History
        </h1>
        <div 
        className="tablecontainer">
          <table 
          className="tableStyle">
            <thead>
              <tr>
                <th>From</th>
                <th>To</th>
                <th>Reason</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {leaves.length === 0 ? (
                <tr>
                  <td 
                  colSpan="4" 
                  className="text-center">
                    No leave requests found.
                  </td>
                </tr>
              ) : (
                leaves.map((leave) => (
                  <tr key={leave.id}>
                    <td>{leave.fromDate}</td>
                    <td>{leave.toDate}</td>
                    <td>{leave.reason}</td>
                    <td>
                      <span className={`status ${leave.status.toLowerCase()}`}>
                        {leave.status}
                      </span>
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

export default LeaveHistory;
