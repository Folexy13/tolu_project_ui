import React from "react";
import "./Styles.scss";
import { Link } from "react-router-dom";
import logo from "../../../assets/image/logo.JPG";
import { useState } from "react";
import UserObj from "../../../Classes";
import { toast } from "react-toastify";
import { Spinner } from "../../../components";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    let payload = {
      email,
      password,
    };
    await UserObj.user_login(payload).then((res) => {
      if (res.status) {
        toast.success(res.message);
        window.location.replace("/dashboard");
        localStorage.setItem('user',JSON.stringify(res.user))
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
      <div className="second_section">
        <img src={logo} alt="" width={300} />
        <form onSubmit={handleLogin}>
          <div className="form_control">
            <label htmlFor="">Email</label>
            <input
              type="email"
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
              {loading ? <Spinner isLoading={loading} /> : "Login"}
            </button>
          </div>
          Don't have an account? <Link to="/register">Register</Link>
        </form>
      </div>
    </div>
  );
};

export default Login;
