import "./App.scss";
// import Admin from "./components/ Admin/Admin";
import Header from "./components/Header/Header";
import { Outlet } from "react-router-dom";
import BottomNav from "./components/BottomNav/BottomNav";
import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

const App = () => {
  const location = useLocation();
  const scrollRef = useRef(null);

  useEffect(() => {
    // App-like behavior: return to top on route change inside the shell.
    const el = scrollRef.current;
    if (el) el.scrollTop = 0;
  }, [location.pathname]);

  return (
    <div className="app-shell">
      <div className="app-frame">
        <div className="app-bar">
          <Header />
        </div>
        <div className="app-main" ref={scrollRef}>
          <Outlet />
        </div>
        <BottomNav />
      </div>
    </div>
  );
};

export default App;
