import { useState } from "react";
import { Sidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import { FaHeart } from "react-icons/fa";
import { DiReact } from "react-icons/di";
import { MdDashboard } from "react-icons/md";
import { Link } from "react-router-dom";
import "./SideBar.scss";

const WSidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [darkTheme, setDarkTheme] = useState(false);

  return (
    <div className={`w-sidebar-layout ${darkTheme ? "dark" : "light"}`}>
      <Sidebar
        collapsed={collapsed}
        width="250px"
        collapsedWidth="80px"
        className="w-sidebar-root"
      >
        {/* FLEX WRAPPER – CÁI QUAN TRỌNG NHẤT */}
        <div className="w-sidebar-inner">
          {/* MENU TRÊN */}
          <Menu>
            <MenuItem
              component={<Link to="/" />}
              icon={<DiReact size="3em" color="pink" />}
            >
              ユウ
            </MenuItem>
            <MenuItem icon={<MdDashboard />}>MdDashboard</MenuItem>

            <SubMenu label="music" icon={<FaHeart />}>
              <MenuItem component={<Link to="/admins/ManegeUser" />}>
                Manage USER
              </MenuItem>
              <MenuItem component={<Link to="/admins/Manage-quizzes" />}>
                Manage Quiz
              </MenuItem>
              <MenuItem component={<Link to="/admins/Manage-questions" />}>
                Manage Answer
              </MenuItem>
            </SubMenu>
          </Menu>

          {/* ĐẨY XUỐNG */}
          <div className="w-sidebar-grow" />

          {/* MENU DƯỚI – LUÔN Ở CUỐI */}
          <hr />
          <Menu>
            <MenuItem
              icon={<DiReact size="2em" />}
              href="https://www.youtube.com/@YU-H8129/videos"
              target="_blank"
              rel="noopener noreferrer"
            >
              yt channel
            </MenuItem>
          </Menu>
        </div>
      </Sidebar>
      <main className="w-sidebar-main">
        <div className="w-sidebar-toolbar">
          <button
            className="w-btn w-btn-primary"
            onClick={() => setCollapsed(!collapsed)}
          >
            {collapsed ? "SHOW" : "HIDE"}{" "}
          </button>
          <button
            className="w-btn w-btn-ghost"
            onClick={() => setDarkTheme(!darkTheme)}
          >
            {" "}
            {darkTheme ? "Light Theme" : "Dark Theme"}
          </button>
        </div>{" "}
        <h1>admin page</h1>
        <p>this page is for only admin </p>{" "}
      </main>
    </div>
  );
};

export default WSidebar;
