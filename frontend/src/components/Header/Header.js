import React from "react";
import {
  Container,
  Form,
  FormControl,
  Nav,
  Navbar,
  NavDropdown,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { logout } from "../../actions/userActions";

const Header = ({ setSearch }) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const logoutHandler = () => {
    dispatch(logout());
    history.push("/");
  };

  return (
    <Navbar bg="primary" expand="lg" variant="dark">
      <Container fluid>
        <Navbar.Brand>
          <Link to="/menu">E-LEARNING</Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          {userInfo ? (
            <nav className="m-auto">
              <Form className="d-flex">
                <FormControl
                  type="search"
                  placeholder="Search"
                  className="me-2"
                  aria-label="Search"
                  onChange={(e) => setSearch(e.target.value)}
                />
              </Form>
            </nav>
          ) : null}
          <Nav>
            <>
              {userInfo ? (
                <Nav.Link href="/allprobleme">
                  all_problem
                  {/* <Link to="/allprobleme">allproblem</Link> */}
                </Nav.Link>
              ) : null}
            </>
            <>
              {userInfo && userInfo.roles !== "user" ? (
                <Nav.Link href="/createProbleme">
                  create_problem
                  {/* <Link to="/">createproblem</Link> */}
                </Nav.Link>
              ) : null}
            </>

            <>
              {userInfo && userInfo.roles == "superuser" ? (
                <Nav.Link href="/Gestion_u">
                  Manage User
                  {/* <Link to="/Gestion_u">gerer utilisateur</Link> */}
                </Nav.Link>
              ) : null}
            </>
            <>
              {userInfo && userInfo.roles == "superuser" ? (
                <Nav.Link href="/addProf">
                  add prof
                  {/* <Link to="/Gestion_u">gerer utilisateur</Link> */}
                </Nav.Link>
              ) : null}
            </>
            <>
              {userInfo ? (
                <NavDropdown title="menu" id="navbarScrollingDropdown">
                  <NavDropdown.Item onClick={logoutHandler}>
                    Logout
                  </NavDropdown.Item>
                  <NavDropdown.Item href="/homepage">
                    {userInfo.name} profil
                  </NavDropdown.Item>
                  <NavDropdown.Item href="/contact"> contact</NavDropdown.Item>
                  <NavDropdown.Divider />
                </NavDropdown>
              ) : null}
            </>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
