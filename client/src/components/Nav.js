/* eslint-disable */
import React from 'react';
import { connect } from 'react-redux';
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { Link } from 'react-router-dom';
import { logout } from '../store'

class NavBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false
    }
    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState({ isOpen: !this.state.isOpen });
  }

  render() {
    const { categories, users, user, loggedIn, logout } = this.props;
    const { toggle } = this;
    const { isOpen } = this.state;
    return (
      <div>
        <Navbar color="light" light expand="sm">
        <div className="container">
          <NavbarBrand href='#/'>J2A2</NavbarBrand>
          <NavbarToggler onClick={ toggle } />
          <Collapse isOpen={ isOpen } navbar>
            <Nav className="ml-auto" navbar>
                <UncontrolledDropdown nav inNavbar>
                  <DropdownToggle nav caret>
                    Categories
                  </DropdownToggle>
                  <DropdownMenu right>
                  {
                    categories.map(category => (
                      <DropdownItem key={category.id} href={`#/categories/${category.id}`}>{category.name}</DropdownItem>
                    ))
                  }
                    <DropdownItem divider />
                    <DropdownItem href='#/categories'>All Categories</DropdownItem>
                  </DropdownMenu>
                </UncontrolledDropdown>
              <NavItem>
                <NavLink href='#/products'>Products</NavLink>
              </NavItem>
              {
                /* Make ternary for logged in
                If logged in, show hello and dropdown
                If not logged in, show login link */
              }
              <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav caret>
                  Hello { user.firstName }
                </DropdownToggle>
                <DropdownMenu right>
                  <DropdownItem>My Account</DropdownItem>
                  <DropdownItem>My Cart (1)</DropdownItem>
                  <DropdownItem divider />
                  <DropdownItem onClick={ logout }>Log out</DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
            </Nav>
          </Collapse>
          </div>
        </Navbar>
      </div>
    )
  }
}

const mapState = ({ categories, products, users, orders, user }) => {
  const loggedIn = !!user.id
  return { categories, products, users, orders, user, loggedIn };
};

const mapDispatch = (dispatch) => {
  return {
    logout: () => dispatch(logout())
  }
}

export default connect(mapState, mapDispatch)(NavBar);
