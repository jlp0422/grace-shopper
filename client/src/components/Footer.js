/* eslint-disable */
import React from 'react';
import { Link } from 'react-router-dom';
import { logout } from '../store';
import { connect} from 'react-redux';
import { Col, Container, Row, Footer } from 'mdbreact';
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';


const PageFooter = ({ user, logout }) => {
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
              {
                user.id ? (
                  <span onClick={ logout }>Log out</span>
                ) : (
                  <NavLink href='#/login'>Log in</NavLink>
                )
              }
              <NavLink href={`#/users/${user.id}/orders`}>myOrders</NavLink>
              <NavLink href={`#/users/${user.id}/cart`}>myAccount</NavLink>
            </ul>
          </Col>
        </Row>
      </div>
      <div className="footer-copyright text-center">
        <div  className="container-fluid">
          <div className="footer-text"><p>&copy; Copyright: A Division of Fullstack Academy</p></div>
        </div>
      </div>
    </div>
  );
};

const mapState = ({ user }) => {
  return { user }
}

const mapDistpach = (dispatch) => {
  return {
    logout: () => dispatch(logout())
  }
}
export default connect(mapState, mapDistpach)(PageFooter);
