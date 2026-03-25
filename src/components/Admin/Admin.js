import SideBar from "./SideBar";
import "./Admin.scss";
import { Outlet } from "react-router-dom";
import PerfectScrollbar from "react-perfect-scrollbar";
import "react-perfect-scrollbar/dist/css/styles.css";
import { useState } from "react";

import Header from "./Header";
const Admin = (props) => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="admin-container">
      <div className="admin-sidebar">
        <SideBar collapsed={collapsed} />
      </div>
      <div className="admin-contain">
        <div className="admin-header">
          <div className="admin-header__left">
            <button
              type="button"
              className="admin-header__btn"
              onClick={() => setCollapsed((v) => !v)}
            >
              {collapsed ? "Expand" : "Collapse"}
            </button>
          </div>
          <div className="header">
            <Header />
          </div>
        </div>

        <PerfectScrollbar className="admin-scroll">
          <div className="admin-main">
            <Outlet />
          </div>
        </PerfectScrollbar>
      </div>
    </div>
  );
};
export default Admin;
