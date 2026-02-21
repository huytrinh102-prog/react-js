import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { logout } from "../../redux/userSlice";
import { useSelector } from "react-redux";
const Header = () => {
  const navigate = useNavigate();
  const loginbtn = () => {
    navigate("/login");
  };
  const register = () => {
    navigate("/register");
  };
  const islogin = useSelector((state) => state?.user?.isLogin);
  const dispatch = useDispatch();

  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <NavLink to="/" className="navbar-brand">
          ユウー8129
        </NavLink>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <NavLink to="/" className="nav-link">
              Home
            </NavLink>
            <NavLink to="/users" className="nav-link">
              User
            </NavLink>
            <NavLink to="/admins" className="nav-link">
              Admin
            </NavLink>
          </Nav>
          {!islogin ? (
            <Nav>
              <div className="login-register">
                <button onClick={() => loginbtn()} className="btn-login">
                  log in
                </button>
                <button onClick={() => register()} className="btn-signup">
                  sign up
                </button>
              </div>
            </Nav>
          ) : (
            <Nav>
              <NavDropdown title="Setting" id="basic-nav-dropdown">
                <NavDropdown.Item onClick={() => dispatch(logout())}>
                  {" "}
                  Log out
                </NavDropdown.Item>
                <NavDropdown.Item>Profile</NavDropdown.Item>
              </NavDropdown>
            </Nav>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
