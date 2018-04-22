/* eslint-disable */
import React from 'react';
import { Link } from 'react-router-dom';
import { logout } from '../store';
import { Col, Container, Row, Footer } from 'mdbreact';
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';


const PageFooter = () => {
  return (
    <div className="font-small t-4 mt-4">
      <div className="container-fluid text-left">
        <Row>
          <Col sm="6">
            <ul>
              <NavLink href='#/'>Home</NavLink>
              <NavLink href='#/about'>About</NavLink>
              <NavLink href='#/products'>Products</NavLink>
              <NavLink href='#/categories'>Categories</NavLink>
            </ul>
          </Col>
          <Col sm="6">
            <ul>
              <NavLink href='#/login'>Log in</NavLink>
              <NavLink href='#/myOrders'>myOrders</NavLink>
              <NavLink href='#/myAccount'>myAccount</NavLink>
            </ul>
          </Col>
        </Row>
      </div>
      <div className="footer-copyright text-center">
        <div  className="container-fluid">
          <div className="footer-text"><p>Copyright: A Division of Fullstack Academy</p></div>
        </div>
      </div>
    </div>
  );
};

export default PageFooter;
