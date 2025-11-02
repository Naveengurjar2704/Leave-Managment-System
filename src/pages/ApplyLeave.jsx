import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { getCurrentUser, applyLeave } from "../services/LeaveService";
import "../assets/styles/form.css";
import "../assets/styles/global.css";

const ApplyLeave = () => {
  const [fromDate, setFromDate] = useState();
  const [toDate, setToDate] = useState();
  const [reason, setReason] = useState();
  const navigate = useNavigate(); // hook to navigate to differrent pages 
  const user = getCurrentUser(); // here we fetch the current user detail

  // if user is not logged in or user is not employe the it will redirect it to home
  if (!user || user.role !== "employee") {

    navigate("/");//navigate to homepage
    return null;
  }

  /**
   * This function handle the process of sumbitting leave
   * @param {effect} event - It is the form submission effect
   */
  const sumbitLeave = (e) => {
    e.preventDefault(); // it  prevent the default value and page reload
    // here we are calling the applyLeave function from LeaveService,js
    applyLeave({ fromDate, toDate, reason });
    // after sumbitting leave navigate to the dashboard
    navigate("/dashboard");
  };

  return (
    <>
      <Navbar />
      <div className="frmContainer">
        <h2
          className="frmTitle">
          Apply for Leave
        </h2>
        <form
          onSubmit={sumbitLeave}>
          <div
            className="frmGrid">
            <div
              className="frmGroup">
              <label>
                From Date
              </label>
              <input
                type="date"
                value={fromDate}
                onChange={(e) => setFromDate(e.target.value)}
                required
              />
            </div>
            <div
              className="frmGroup">
              <label>To Date</label>
              <input
                type="date"
                value={toDate}
                onChange={(e) => setToDate(e.target.value)}
                required
              />
            </div>
            <div className="frmGroup">
              <label>Reason</label>
              <textarea
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                required
              />
            </div>
            <button
              type="submit"
              className="btn btn-primary submit-btn"
              style={{ width: "100%" }}
            >
              Submit Request
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default ApplyLeave;
