import { NavLink } from "react-router-dom";
import { FiHome, FiGrid, FiShield } from "react-icons/fi";

const BottomNav = () => {
  return (
    <nav className="bottom-nav" aria-label="Bottom navigation">
      <NavLink
        to="/"
        end
        className={({ isActive }) =>
          `bottom-nav__item${isActive ? " active" : ""}`
        }
      >
        <FiHome className="bottom-nav__icon" aria-hidden="true" />
        <span className="bottom-nav__label">Home</span>
      </NavLink>
      <NavLink
        to="/users"
        className={({ isActive }) =>
          `bottom-nav__item${isActive ? " active" : ""}`
        }
      >
        <FiGrid className="bottom-nav__icon" aria-hidden="true" />
        <span className="bottom-nav__label">Quizzes</span>
      </NavLink>
      <NavLink
        to="/admins"
        className={({ isActive }) =>
          `bottom-nav__item${isActive ? " active" : ""}`
        }
      >
        <FiShield className="bottom-nav__icon" aria-hidden="true" />
        <span className="bottom-nav__label">Admin</span>
      </NavLink>
    </nav>
  );
};

export default BottomNav;
