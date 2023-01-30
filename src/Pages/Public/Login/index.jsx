import React from "react";
import "./Styles.scss";
import { Link, useNavigate } from "react-router-dom";
import bgImage from "../../../assets/image/login2.webp";
import { useState } from "react";
import UserObj from "../../../Classes";
import { toast } from "react-toastify";
import { AiOutlineLoading } from "react-icons/ai";
import { getStoredAuthToken } from "../../../utils";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    let payload = {
      email,
      password,
    };
    await UserObj.user_login(payload).then((res) => {
      console.log(res.status);
      if (res.status) {
        toast.success(res.message);
        navigate("/");
      } else {
        toast.error(res.message);
        setLoading(false);
        return;
      }
      // console.log(res);
    });
  };
  return (
    <div className="login">
      <div className="first_section">
        <img src={bgImage} alt="..." />
      </div>
      <div className="second_section">
        <h1>Login</h1>
        <form onSubmit={handleLogin}>
          <div className="form_control">
            <label htmlFor="">Email</label>
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
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
            <button disabled={loading}>
              {loading ? <AiOutlineLoading /> : "Login"}
            </button>
          </div>
          Don't have an account? <Link to="/register">Register</Link>
        </form>
      </div>
    </div>
  );
};

export default Login;
