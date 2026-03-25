import { Sidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import { FaHeart } from "react-icons/fa";
import { DiReact } from "react-icons/di";
import { MdDashboard } from "react-icons/md";
import { Link, useLocation } from "react-router-dom";
import "./SideBar.scss";

const WSidebar = (props) => {
  const { collapsed = false } = props || {};
  const { pathname } = useLocation();

  const isDashboard =
    pathname === "/admins" || pathname.startsWith("/admins/Dashboard");
  const isManageUsers = pathname.startsWith("/admins/ManegeUser");
  const isManageQuizzes = pathname.startsWith("/admins/Manage-quizzes");
  const isManageQuestions = pathname.startsWith("/admins/Manage-questions");
  const isManage = isManageUsers || isManageQuizzes || isManageQuestions;

  return (
    <Sidebar
      collapsed={collapsed}
      width="250px"
      collapsedWidth="80px"
      className="w-sidebar-root"
    >
      <div className="w-sidebar-inner">
        <Menu>
          <MenuItem
            component={<Link to="/" />}
            icon={<DiReact size="2em" color="pink" />}
          >
            ユウ
          </MenuItem>
          <MenuItem
            component={<Link to="/admins/Dashboard" />}
            icon={<MdDashboard />}
            active={isDashboard}
          >
            Dashboard
          </MenuItem>

          <SubMenu
            label="Manage"
            icon={<FaHeart />}
            active={isManage}
            defaultOpen={isManage}
          >
            <MenuItem
              component={<Link to="/admins/ManegeUser" />}
              active={isManageUsers}
            >
              Users
            </MenuItem>
            <MenuItem
              component={<Link to="/admins/Manage-quizzes" />}
              active={isManageQuizzes}
            >
              Quizzes
            </MenuItem>
            <MenuItem
              component={<Link to="/admins/Manage-questions" />}
              active={isManageQuestions}
            >
              Questions
            </MenuItem>
          </SubMenu>
        </Menu>

        <div className="w-sidebar-grow" />

        <hr />
        <Menu>
          <MenuItem
            icon={<DiReact size="1.6em" />}
            href="https://www.youtube.com/@YU-H8129/videos"
            target="_blank"
            rel="noopener noreferrer"
          >
            yt channel
          </MenuItem>
        </Menu>
      </div>
    </Sidebar>
  );
};

export default WSidebar;
