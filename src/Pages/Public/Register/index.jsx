import React from "react";
import "./Styles.scss";
import { Link, useNavigate } from "react-router-dom";
import bgImage from "../../../assets/image/register.jpg";
import { IoChevronBackSharp } from "react-icons/io5";
import { useState } from "react";
import userOBJ from "../../../Classes";
import { toast } from "react-toastify";

const Register = () => {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [fullname, setfullname] = useState("");
  const [role, setRole] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    let payload = {
      email,
      password,
      fullname,
      role,
      phone,
    };
    await userOBJ.user_signup(payload).then((res) => {
      if (res.status) {
        toast.success(res.message);
        navigate("/dashboard");
      } else {
        toast.error(res.message);
        setLoading(false);
        return;
      }
    });
  };
  return (
    <div className="register">
      <div className="first_section">
        <img src={bgImage} alt="..." />
      </div>
      <div className="second_section">
        <div className="back" onClick={() => navigate(-1)}>
          <IoChevronBackSharp size={30} /> Back
        </div>
        <h1>Register</h1>
        <form onSubmit={handleRegister}>
          <div className="form_control">
            <label htmlFor="">Fullname</label>
            <input
              type="text"
              value={fullname}
              onChange={(e) => setfullname(e.target.value)}
            />
          </div>
          <div className="form_control">
            <label htmlFor="">Phone</label>
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
          <div className="form_control">
            <label htmlFor="">Email</label>
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="form_control">
            <label htmlFor="">Role</label>
            <select name="" id="" onChange={(e) => setRole(e.target.value)}>
              <option value="maintenance_supervisor">
                Maintenace Supervisor
              </option>
              <option value="store_manager">Store Manager</option>
              <option value="production_manager">Product Manager</option>
              <option value="" disabled selected>
                Select A role
              </option>
            </select>
          </div>
          <div className="form_control">
            <label htmlFor="">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="form_control">
            <button>Register</button>
          </div>
          Already have an account? <Link to="/login">Login</Link>
        </form>
      </div>
    </div>
  );
};

export default Register;
