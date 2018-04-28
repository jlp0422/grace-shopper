/* eslint-disable */
import React from 'react';
import { connect } from 'react-redux';
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { Link } from 'react-router-dom';
import { logout } from '../../store'

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
    const { categories, user, loggedIn, logout, activeOrder, itemCount } = this.props;
    const { toggle } = this;
    const { isOpen } = this.state;
    return (
      <div>
        <Navbar style={{ marginBottom: '20px'}} sticky="top" className="nav-sticky sticky-top" color="light" light expand="sm">
        <div className="container">
          <NavbarBrand href='#/'>J²A²</NavbarBrand>
          <NavbarToggler onClick={ toggle } />
          <Collapse isOpen={ isOpen } navbar>
            <Nav className="ml-auto" navbar>
                <NavItem>
                  <NavLink href='#/'>Home</NavLink>
                </NavItem>
                <UncontrolledDropdown nav inNavbar>
                  <DropdownToggle nav caret>
                    Categories
                  </DropdownToggle>
                  <DropdownMenu right>
                  {
                    categories.map(category => (
                      <DropdownItem key={category.id} onClick={() => location.hash = `#/categories/${category.id}`}>{category.name}</DropdownItem>
                    ))
                  }
                    <DropdownItem divider />
                    <DropdownItem onClick={() => location.hash = `/categories`}>All Categories</DropdownItem>
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
                      <DropdownItem onClick={() => location.hash = `/users/${user.id}`}>My Account</DropdownItem>
                      <DropdownItem onClick={() => location.hash = `/users/${user.id}/cart`}>My Cart ({itemCount})</DropdownItem>
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

const mapState = ({ categories, user, orders, lineItems }) => {
  // const activeOrder = orders.filter(order => order.userId === user.id && order.isActive)

  const activeOrder = orders.find(order => order.userId === user.id && order.isActive)

  // console.log(activeOrder)

  const itemCount = lineItems.reduce((memo, item) => {
    if(item.orderId === activeOrder.id) {
      return memo + item.quantity
    }
    return memo;
  }, 0)


  //
  const loggedIn = !!user.id
  return { categories, user, loggedIn, activeOrder, itemCount };
};

const mapDispatch = (dispatch) => {
  return {
    logout: () => dispatch(logout())
  }
}

export default connect(mapState, mapDispatch)(NavBar);
