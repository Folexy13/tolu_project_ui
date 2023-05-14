import React, { useState } from "react";
import { DashboardLayout, Spinner } from "../../../components";
import './Styles.scss'
import { getClientUser } from "../../../utils";
import userOBJ from "../../../Classes";
import { toast } from "react-toastify";

const Settings = () => {
  const user = getClientUser()
  const [fullname, setfullname] = useState(user.fullname);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [email, setEmail] = useState(user.email);
  const [role, setRole  ] = useState(user.email);
  const [phone, setPhone] = useState(user.phone);
  const [passwordError,setPasswordError] = useState(false)
  const [loading,setloading] = useState(false)

  const handlefullname = (event) => {
    setfullname(event.target.value);
  };


  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleConfirmPasswordChange = (event) => {
    setConfirmPassword(event.target.value);
  };

  const handleRoleChange = (event) => {
    setRole(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePhoneChange = (event) => {
    setPhone(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setloading(true)
    setPasswordError(false)
    let payload = {
      fullname,
      password,
      email,
      role,
      phone,
      id: getClientUser()._id
    }
    if(password!==confirmPassword){
      setPasswordError(true)
      setloading(false)
      return
    }
   await  userOBJ.update_user(payload).then(res=>{
    if(res.status){
      toast.success("Settings saved");
      setloading(false)
    }
   })
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
          value={fullname}
          onChange={handlefullname}
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
        <small style={{color:'red',margin:'0px 0 10px 0'}}>{passwordError && "Password does not match"}</small>
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

        <button disabled={loading} type="submit">{loading? <Spinner isLoading={loading}/>:"Save Changes"}</button>
      </form>
    </div>
      </div>
     
    </DashboardLayout>
  );
};
export default Settings


