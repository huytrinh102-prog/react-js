import SideBar from "./SideBar";
import Admina from "./Admin.scss";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { Bounce } from "react-toastify";

const Admin = (props) => {
  return (
    <div className="admin-container">
      <div className="admin-sidebar">
        <SideBar />
      </div>
      <div className="admin-contain">
        <div className="admin-header"></div>
        <div className="admin-main">
          <Outlet />
        </div>
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
      </div>
    </div>
  );
};
export default Admin;
