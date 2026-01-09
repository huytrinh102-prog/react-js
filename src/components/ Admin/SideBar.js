import React, { useState } from "react";
import { Sidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import { FaHeart } from "react-icons/fa";
import { DiReact } from "react-icons/di";
import { MdDashboard } from "react-icons/md";
import { Link } from "react-router-dom";

const WSidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [darkTheme, setDarkTheme] = useState(false);

  const sidebarStyle = {
    width: collapsed ? "80px" : "250px",
    height: "100vh",
    backgroundColor: darkTheme ? "#0b2948" : "#ffffff",
    color: darkTheme ? "#8ba1b7" : "#607489",
    transition: "width 0.3s",
  };

  return (
    <div style={{ display: "flex", height: "100vh" }}>
      <Sidebar
        collapsed={collapsed}
        style={{
          height: "100vh",
          backgroundColor: darkTheme ? "#0b2948" : "#ffffff",
          color: darkTheme ? "#8ba1b7" : "#607489",
          width: collapsed ? "80px" : "250px",
        }}
      >
        {/* FLEX WRAPPER – CÁI QUAN TRỌNG NHẤT */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            height: "100%",
          }}
        >
          {/* MENU TRÊN */}
          <Menu>
            <MenuItem
              component={<Link to="/admins" />}
              icon={<DiReact size="3em" color="pink" />}
            >
              ユウ
            </MenuItem>
            <MenuItem icon={<MdDashboard />}>MdDashboard</MenuItem>

            <SubMenu label="music" icon={<FaHeart />}>
              <MenuItem component={<Link to="/admins/ManegeUser" />}>
                yuu music
              </MenuItem>
              <MenuItem>yuu list</MenuItem>
              <MenuItem>yuu hot mv</MenuItem>
            </SubMenu>
          </Menu>

          {/* ĐẨY XUỐNG */}
          <div style={{ flexGrow: 1 }} />

          {/* MENU DƯỚI – LUÔN Ở CUỐI */}
          <hr />
          <Menu>
            <MenuItem
              component="a"
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
      <main style={{ flex: 1, padding: "20px" }}>
        <div style={{ marginBottom: "16px" }}>
          <button onClick={() => setCollapsed(!collapsed)}>
            {collapsed ? "SHOW" : "HIDE"}{" "}
          </button>
          <button
            onClick={() => setDarkTheme(!darkTheme)}
            style={{ marginLeft: "12px" }}
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
