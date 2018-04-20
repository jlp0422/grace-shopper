/* eslint-disable */
import React from 'react';
import { connect } from 'react-redux';
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { Link } from 'react-router-dom';

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
    const { categories, products, users, orders } = this.props;
    const { toggle } = this;
    const { isOpen } = this.state;
    return (
      <div>
        <Navbar color="light" light expand="sm">
        <div className="container">
          <NavbarBrand>Our Company</NavbarBrand>
          <NavbarToggler onClick={ toggle } />
          <Collapse isOpen={ isOpen } navbar>
            <Nav className="ml-auto" navbar>
              <NavItem>
                <NavLink href='#/categories'>Categories</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href='#/products'>Products</NavLink>
              </NavItem>
              <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav caret>
                  Hello user
                </DropdownToggle>
                <DropdownMenu right>
                  <DropdownItem>My Account</DropdownItem>
                  <DropdownItem divider />
                  <DropdownItem>Log out</DropdownItem>
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

const mapState = ({ categories, products, users, orders}) => {
  return { categories, products, users, orders };
};

export default connect(mapState)(NavBar);
