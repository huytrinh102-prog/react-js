import { useState } from "react";
import { useNavigate } from "react-router";
import "./Loginconver.scss";
import { postRegister } from "./../../services/apiServices";
import { toast } from "react-toastify";
import { VscEye, VscEyeClosed } from "react-icons/vsc";
const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userName, setUserName] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const Homepagebtn = () => {
    navigate("/");
  };
  const Loginpagebtn = () => {
    navigate("/login");
  };
  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      );
  };

  const registerbtn = async () => {
    const isvalidateEmail = validateEmail(email);

    if (!isvalidateEmail || !email || !password) {
      toast.error("please fill the form");

      return;
    }
    if (!validateEmail(email)) {
      toast.error("Invalid email format");
      return;
    }

    try {
      const res = await postRegister(email, password, userName);
      if (res && res.data.EC === 0) {
        toast.success(res.data.EM);
        navigate("/");
      } else {
        toast.error(res.data.EM);
      }

      navigate("/login");
    } catch (e) {
      console.log("dasdsa");
    }
  };
  return (
    <div className="regester-container">
      <div className="header">
        <p onClick={() => Loginpagebtn()}>Already have an account?</p>
        <button onClick={() => Loginpagebtn()}>Login</button>
      </div>
      <div className="regester-box">
        <h1 className="title">AZ/ユウ - 8129</h1>
        <p className="welcome">Welcome to YUU's page</p>
        <div className="contain-form">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              registerbtn();
            }}
          >
            <div className="form-group">
              <label>Email</label>
              <input
                placeholder="your email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="form-group pass-group">
              <label>Password</label>
              <input
                placeholder="your password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              <span
                className="icons-eye"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <VscEye /> : <VscEyeClosed />}
              </span>
            </div>
            <div className="form-group">
              <label>UserName</label>
              <input
                placeholder="your name"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
              />
            </div>
            <button className="btn-regester">Create an account</button>
          </form>
          <div className="homepage" onClick={() => Homepagebtn()}>
            HomePage
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
