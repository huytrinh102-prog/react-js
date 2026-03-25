import { useState } from "react";
import "./Loginconver.scss";
import { useNavigate } from "react-router";
import { postLogin } from "../../services/apiServices";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { loginSuccess } from ".//../../redux/userSlice";
import { ImSpinner } from "react-icons/im";
import NProgress from "nprogress";
import { store } from "../../redux/store";
import Language from "../Header/Language";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
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
    if (isLoading) return;
    setIsLoading(true);
    if (!email || !password) {
      setIsLoading(false);
      toast.error("please fill the form");
      NProgress.done();
      return;
    }
    if (!validateEmail(email)) {
      setIsLoading(false);
      toast.error("Invalid email format");
      NProgress.done();
      return;
    }

    let res = await postLogin(email, password);

    if (res && res.data.EC === 0) {
      dispatch(loginSuccess(res.data));
      toast.success(res.data.EM);
      setIsLoading(false);
      navigate("/");
      console.log("aaaa1", store.getState().user.account.access_token);
      NProgress.done();
    } else {
      setIsLoading(false);
      toast.error(res.data.EM);
      NProgress.done();
    }
  };

  return (
    <div className="login-container">
      <Language className="language" />
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

            <button className="btn-login" disabled={isLoading}>
              {isLoading && <ImSpinner className="spinner" />}
              Login with 『YU』
            </button>
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
