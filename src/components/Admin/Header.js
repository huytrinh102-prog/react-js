import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../../redux/userSlice";
import { useSelector } from "react-redux";
import { Logout } from "../../services/apiServices";
import { toast } from "react-toastify";
import Language from "./Language";
import "./Admin.scss";
const Header = () => {
  const a = useSelector((state) => state?.user);
  const dispatch = useDispatch();

  const handleLogout = async () => {
    const email = a?.account?.email;
    const refreshToken = a?.account?.refresh_token;

    // Fire-and-forget server logout (UI should not depend on this).
    Logout(email, refreshToken)
      .then((res) => {
        if (res?.data?.EC === 0) toast.success(res.data.EM);
        else if (res?.data?.EM) toast.error(res.data.EM);
      })
      .catch(() => {});

    dispatch(logout());
    // redux-persist may not flush to storage before a hard redirect.
    try {
      localStorage.removeItem("persist:root");
    } catch (e) {}

    // Hard redirect is OK inside admin shell.
    window.location.assign("/login");
  };

  return (
    <>
      <Navbar expand="lg" className="app-navbar" collapseOnSelect>
        <Container fluid className="app-navbar__inner">
          <NavLink to="/" className="navbar-brand">
            ユウー8129
          </NavLink>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <NavLink
                to="/"
                className={({ isActive }) =>
                  `nav-link${isActive ? " active" : ""}`
                }
                end
              >
                Home
              </NavLink>
              <NavLink
                to="/users"
                className={({ isActive }) =>
                  `nav-link${isActive ? " active" : ""}`
                }
              >
                Quizzes
              </NavLink>
              <NavLink
                to="/admins"
                className={({ isActive }) =>
                  `nav-link${isActive ? " active" : ""}`
                }
              >
                Admin
              </NavLink>
            </Nav>
            <Nav>
              <NavDropdown
                title="Setting"
                id="basic-nav-dropdown"
              >
                <NavDropdown.Item>Profile</NavDropdown.Item>{" "}
                <NavDropdown.Item as="button" type="button" onClick={handleLogout}>
                  Log out
                </NavDropdown.Item>
              </NavDropdown>
              <Language />
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default Header;
