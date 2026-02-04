import { useState } from "react";
import "./Loginconver.scss";
import { useNavigate } from "react-router";
import { postLogin } from "../../services/apiServices";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { loginSuccess } from ".//../../redux/userSlice";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const Homepagebtn = () => {
    navigate("/");
  };
  const regesterbtn = () => {
    navigate("/register");
  };
  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      );
  };
  const handleLogin = async () => {
    if (!email || !password) {
      toast.error("please fill the form");

      return;
    }
    if (!validateEmail(email)) {
      toast.error("Invalid email format");
      return;
    }

    let res = await postLogin(email, password);
    console.log("dhdhd", res);

    if (res && res.data.EC === 0) {
      dispatch(loginSuccess(res.data));
      toast.success(res.data.EM);
      navigate("/");
    } else {
      toast.error(res.data.EM);
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h1 className="title">AZ / ユウ - 8129</h1>
        <p className="welcome">Welcome to YUU's page</p>

        <div className="content-form">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleLogin();
            }}
          >
            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                placeholder="your email here"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                placeholder="your password here"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div className="forgot">Forgot your password?</div>

            <button className="btn-login">Login with 『YU』</button>
          </form>
        </div>

        <div onClick={() => regesterbtn()} className="footer">
          Don’t have an account yet?
        </div>
        <div onClick={() => Homepagebtn()} className="homepage">
          HomePage
        </div>
      </div>
    </div>
  );
};

export default Login;
