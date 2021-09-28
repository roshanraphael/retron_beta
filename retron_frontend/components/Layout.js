import Head from "next/head";
import AOS from "aos";
import Router from "next/router";
import { useEffect, useState } from "react";
import { signout } from "../actions/auth";
import {
  Container,
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  NavbarText
} from 'reactstrap';
const Layout = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  useEffect(() => {
    AOS.init({
      duraton: 1000,
    });
  }, []);
  return (
    <React.Fragment>
      <Head>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.0/dist/css/bootstrap.min.css"
          integrity="sha384-KyZXEAg3QhqLMpG8r+8fhAXLRk2vvoC2f3B09zVXn8CA5QIVfZOJ3BCsw2P0p/We"
          crossOrigin="anonymous"
        />
        <link
          href="https://unpkg.com/aos@2.3.1/dist/aos.css"
          rel="stylesheet"
        ></link>
      </Head>
      <Navbar sticky="top" dark expand="md" style={{backgroundColor: "#008989", boxShadow:"0px 2px 1rem rgba(0,0,0,.4)", zIndex: 10000}}>
      <Container fluid={true}>
        <NavbarBrand href="/">Retron</NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          {/* <Nav className="ml-auto" navbar>
            <NavItem>
              <NavLink className="text-white" href="/chatrooms">Chatrooms</NavLink>
            </NavItem>
          </Nav> */}
          <div style={{
            flex: 1
          }}>
          </div>
          <Nav className="ml-auto" navbar>
          <NavItem>
              <NavLink className="bg-danger rounded text-white" onClick={() => signout(() => Router.replace(`/`))}>Log Out</NavLink>
            </NavItem>
            </Nav>
        </Collapse>
        </Container>
      </Navbar>
      {/* <div className="p-2 d-flex justify-content-end">
        <button
          onClick={() => signout(() => Router.replace(`/`))}
          className="btn btn-primary"
        >
          Log Out
        </button>
      </div> */}
      <div
        style={{ minHeight: "100%", height: "auto", height: "100%" }}
      >
        {children}
      </div>
    </React.Fragment>
  );
};

export default Layout;
