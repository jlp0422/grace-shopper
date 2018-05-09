/* eslint-disable */
import React from 'react';
import { connect } from 'react-redux';
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { Link } from 'react-router-dom';
import { logout, getOrdersFromServer} from '../../store'

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
    window.scrollTo(0, 0)
    const { categories, user, loggedIn, logout, activeOrder, cartCount, isAdmin } = this.props;
    const { toggle } = this;
    const { isOpen } = this.state;
    return (
      <div>
        <Navbar style={{ marginBottom: '20px'}} sticky="top" className="nav-sticky sticky-top" color="light" light expand="sm">
        <div className="container">
          <NavbarBrand href='#/'>J²A</NavbarBrand>
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
                      <DropdownItem onClick={() => location.hash = `/users/${user.id}`}>My Account {isAdmin ? <img style={{ width: '25px', height: '18.8px' }} src={'./vendor/images/admin-crown.png'} /> : null
                      }</DropdownItem>
                      <DropdownItem onClick={() => location.hash = `/users/${user.id}/cart`}>My Cart ({ cartCount ? cartCount : null })</DropdownItem>
                      { isAdmin ? (
                        <div>
                          <DropdownItem divider />
                          <DropdownItem onClick={() => location.hash = '/admin'}>Admin Tools</DropdownItem>
                        </div>) : null }
                      <DropdownItem divider />
                      <DropdownItem onClick={logout}>Log out</DropdownItem>
                    </DropdownMenu>
                  </UncontrolledDropdown>
                ) : (
                  <UncontrolledDropdown nav inNavbar>
                    <DropdownToggle nav caret>
                      My Account
                    </DropdownToggle>
                    <DropdownMenu right>
                      <DropdownItem onClick={() => location.hash = '/login'}>Sign In</DropdownItem>
                      <DropdownItem onClick={() => location.hash = `/cart`}>My Cart ({cartCount ? cartCount : null})</DropdownItem>
                      <DropdownItem divider />
                      <DropdownItem onClick={() => location.hash = '/signup'}>Create Account</DropdownItem>
                    </DropdownMenu>
                  </UncontrolledDropdown>
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
  const { isAdmin } = user
  const loggedIn = !!user.id
  const activeOrder = orders.length && loggedIn ? (
    orders.find(order => order.userId === user.id && order.status === 'cart')
  ) : (
    orders.find(order => !order.userId && order.status === 'cart')
  );
  const activeOrderItems = activeOrder ? lineItems.filter(item => item.orderId === activeOrder.id) : [];
  const cartCount = activeOrderItems.length ? activeOrderItems.reduce((memo, lineItem) => memo + lineItem.quantity, 0) : '0'
  return { categories, user, loggedIn, activeOrder, cartCount, isAdmin };
};

const mapDispatch = (dispatch) => {
  return {
    logout: () => dispatch(logout()),
  }
}

export default connect(mapState, mapDispatch)(NavBar);
