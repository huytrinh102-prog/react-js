import SideBar from "./SideBar";
import Admina from "./Admin.scss";
import { Outlet } from "react-router-dom";

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
      </div>
    </div>
  );
};
export default Admin;
