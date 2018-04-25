/* eslint-disable */
import React from 'react';
import { connect } from 'react-redux';
import { Nav, NavItem, NavLink, TabContent, TabPane } from 'reactstrap';
import { Link } from 'react-router-dom';
import PastOrders from '../Order/PastOrders';
import ActiveOrder from '../Order/ActiveOrder';
import UserForm from './UserFormNEW';
import Addresses from '../Address/Addresses';

class UserAccount extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { user, userOrders, id, userAddresses } = this.props;
    const url = location.hash.slice(1)
    if (!user) return null
    console.log(this)
    return (
      <div>
        <h1>My Account</h1>
        <h2>{user.firstName} {user.lastName}</h2>
        <h4>Total orders: {userOrders.length}</h4>
        <div className="account-nav">
          <Link to={`/users/${id}/cart`}>
            My Cart
          </Link>
          <Link to={`/users/${id}/orders`}>
            Past Orders
          </Link>
          <Link to={`/users/${id}/addresses`}>
            My Addresses
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
  const userOrders = orders.filter(order => order.userId === user.id);
  const userAddresses = addresses.filter(address => address.userId === user.id)
  return { user, userOrders, id, addresses, userAddresses }
}

export default connect(mapState)(UserAccount);
