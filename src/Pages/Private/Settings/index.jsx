import React, { useState } from "react";
import { DashboardLayout } from "../../../components";
import './Styles.scss'

const Settings = () => {
  const [fullName, setFullName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const handleFullName = (event) => {
    setFullName(event.target.value);
  };


  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleConfirmPasswordChange = (event) => {
    setConfirmPassword(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePhoneChange = (event) => {
    setPhone(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle form submission here
  };
  return (
    <DashboardLayout>
      <div className='main'>
      <div className="user-settings">
      <h1>User Settings</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="first-name">Full Name:</label>
        <input
          type="text"
          id="full-name"
          value={fullName}
          onChange={handleFullName}
        />

        <label htmlFor="password">New Password:</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={handlePasswordChange}
        />

        <label htmlFor="confirm-password">Confirm Password:</label>
        <input
          type="password"
          id="confirm-password"
          value={confirmPassword}
          onChange={handleConfirmPasswordChange}
        />

        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={handleEmailChange}
        />

        <label htmlFor="phone">Phone Number:</label>
        <input
          type="tel"
          id="phone"
          value={phone}
          onChange={handlePhoneChange}
        />

        <button type="submit">Save Changes</button>
      </form>
    </div>
      </div>
     
    </DashboardLayout>
  );
};
export default Settings


