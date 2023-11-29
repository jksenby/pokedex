import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import "bootstrap/dist/css/bootstrap.min.css";
import { NavLink, Link } from "react-router-dom";
import { useGetAccountQuery } from "../SignUpPage/accounts";
import "./appHeader.scss";

const AppHeader = () => {
  const { data: accounts } = useGetAccountQuery();
  function navBar() {
    if (
      localStorage.getItem("isSignedIn") &&
      localStorage.getItem("isSignedIn") === "true" &&
      accounts
    ) {
      let account = null;
      accounts.forEach((item) => {
        if (item.id + "" === localStorage.getItem("id")) {
          account = item;
          return;
        }
      });
      return (
        <NavDropdown title={account.login} id="basic-nav-dropdown">
          <NavDropdown.Item>
            <Link
              to={`/${account.login}`}
              style={{ textDecoration: "none", color: "black" }}
            >
              Profile
            </Link>
          </NavDropdown.Item>
          <NavDropdown.Item href="#action/3.2">
            Favourite Pokemons
          </NavDropdown.Item>
          <NavDropdown.Divider />
          <NavDropdown.Item
            onClick={() => {
              localStorage.setItem("isSignedIn", "false");
              window.location.reload();
            }}
          >
            Exit
          </NavDropdown.Item>
        </NavDropdown>
      );
    } else {
      return (
        <div>
          <NavLink to={"/login"}>
            <button>Sign in</button>
          </NavLink>{" "}
          /{" "}
          <NavLink to={"/register"}>
            <button>Sign up</button>
          </NavLink>
        </div>
      );
    }
  }
  return (
    <header>
      <Navbar
        expand="lg"
        className="bg-body-tertiary"
        style={{ width: "100%" }}
      >
        <h3>
          {" "}
          <Link
            to={"/pokedex"}
            style={{ textDecoration: "none", color: "black" }}
          >
            Z-project
          </Link>
        </h3>
        <Container>
          <Navbar.Brand href="/pokedex">Pokedex</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="#home">Berries</Nav.Link>
              <Nav.Link href="#link">Pokeballs</Nav.Link>
            </Nav>
          </Navbar.Collapse>
          {navBar()}
        </Container>
      </Navbar>
    </header>
  );
};

export default AppHeader;
