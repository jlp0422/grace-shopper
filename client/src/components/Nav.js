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
    const { categories, user, loggedIn, logout, activeOrder } = this.props;
    const { toggle } = this;
    const { isOpen } = this.state;
    return (
      <div>
        <Navbar color="light" light expand="sm">
        <div className="container">
          <NavbarBrand href='#/'>J²A²</NavbarBrand>
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
                loggedIn ? (
                  <UncontrolledDropdown nav inNavbar>
                    <DropdownToggle nav caret>
                      Hello {user.firstName}
                    </DropdownToggle>
                    <DropdownMenu right>
                      <DropdownItem href={`#/users/${user.id}`}>My Account</DropdownItem>
                      <DropdownItem>My Cart ({activeOrder.length})</DropdownItem>
                      <DropdownItem divider />
                      <DropdownItem onClick={logout}>Log out</DropdownItem>
                    </DropdownMenu>
                  </UncontrolledDropdown>
                ) : (
                  <NavItem>
                    <NavLink href='#/login'>Log in</NavLink>
                  </NavItem>
                )
              }
            </Nav>
          </Collapse>
          </div>
        </Navbar>
      </div>
    )
  }
}

const mapState = ({ categories, user, orders }) => {
  const activeOrder = orders.filter(order => order.userId === user.id && order.isActive)
  const loggedIn = !!user.id
  return { categories, user, loggedIn, activeOrder };
};

const mapDispatch = (dispatch) => {
  return {
    logout: () => dispatch(logout())
  }
}

export default connect(mapState, mapDispatch)(NavBar);
