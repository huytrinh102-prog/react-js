import App from "./App";
import User from "./components/User/User";
import Admin from "./components/ Admin/Admin";
import HomePage from "./components/Home/HomePage";
import ManegeUser from "./components/ Admin/content/ManegeUser";
import Dashboard from "./components/ Admin/content/DashBoard";
import Login from "./components/Auth/login";
import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { Bounce } from "react-toastify";
import Regester from "./../src//components/Auth/Regester";
const Layout = (props) => {
  return (
    <>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<HomePage />} />
          <Route path="/users" element={<User />} />
        </Route>
        <Route path="/admins" element={<Admin />}>
          <Route path="ManegeUser" element={<ManegeUser />} />
          <Route path="Dashboard" element={<Dashboard />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Regester />} />
      </Routes>

      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
      />
    </>
  );
};
export default Layout;
