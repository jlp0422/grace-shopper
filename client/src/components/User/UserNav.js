/* eslint-disable */
import React from 'react';
import { connect } from 'react-redux';
import { Nav, NavItem, NavLink, TabContent, TabPane } from 'reactstrap';
import { Link } from 'react-router-dom';
import PastOrders from '../Order/PastOrders';
import ActiveOrder from '../Order/ActiveOrder';
import UserForm from './UserForm';
import Addresses from '../Address/Addresses';

class UserAccount extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { user, id } = this.props;
    if (!user) return null
    return (
      <div>
        <h1>My Account</h1>
        <h2>{user.firstName} {user.lastName}</h2>
        <div className="account-nav">
          <Link to={`/users/${id}/cart`}>
            My Cart
          </Link>
          <Link to={`/users/${id}/orders`}>
            My Orders
          </Link>
          <Link to={`/users/${id}/addresses`}>
            My Addresses
          </Link>
          <Link to={`/users/${id}/reviews`}>
            My Reviews
          </Link>
          <Link to={`/users/${id}/edit`}>
            Edit Account
          </Link>
        </div>
      </div>
    )
  }
}

const mapState = ({ user, orders, addresses }, { id }) => {
  const pastOrders = orders.filter(order => order.userId === user.id && !order.isActive).length;
  return { user, id }
}

export default connect(mapState)(UserAccount);
