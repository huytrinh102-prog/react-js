import "./App.scss";
import { Scrollbar } from "react-scrollbars-custom";
// import Admin from "./components/ Admin/Admin";
import Header from "./components/Header/Header";
import { Outlet } from "react-router-dom";

const App = () => {
  return (
    <div className="app-container">
      <div className="header-container">
        <Header />
      </div>
      <div className="main-container">
        <div className="sidenav-container"></div>
        <div className="app-content">
          <Scrollbar style={{ width: "100%", height: "100%" }}>
            <Outlet />
          </Scrollbar>
        </div>
      </div>
    </div>
  );
};

export default App;
