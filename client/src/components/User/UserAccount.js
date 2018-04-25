/* eslint-disable */
import React from 'react';
import { connect } from 'react-redux';
import { Nav, NavItem, NavLink, TabContent, TabPane } from 'reactstrap';
import { Link } from 'react-router-dom';
import PastOrders from '../Order/PastOrders';
import ActiveOrder from '../Order/ActiveOrder';
import UserForm from './UserFormNEW';

class UserAccount extends React.Component {
  constructor(props) {
    super(props);
    this.state = { activeTab: '1' }
    this.toggle = this.toggle.bind(this)
  }

  toggle(tab) {
    const { activeTab } = this.state;
    if (activeTab !== tab) this.setState({ activeTab: tab })
  }

  render() {
    const { user, userOrders, id } = this.props;
    const { activeTab } = this.state;
    const { toggle } = this;
    if (!user) return null
    return (
      <div>
        <h1>My Account</h1>
        <h2>{user.firstName} {user.lastName}</h2>
        <h4>Total orders: {userOrders.length}</h4>
        <Nav style={{margin: '15px 0px'}} tabs>
          <NavItem>
            <Link to={`/users/${id}/cart`}>My Cart</Link>&nbsp;
            <Link to={`/users/${id}/orders`}>Past Orders</Link>&nbsp;
            <Link to={`/users/${id}/addresses`}>My Addresses</Link>&nbsp;
            <Link to={`/users/${id}/edit`}>Edit Account</Link>&nbsp;
          </NavItem>
        </Nav>
      </div>

    )
  }
}

const mapState = ({ user, orders }, { id }) => {
  const userOrders = orders.filter(order => order.userId === user.id);
  return { user, userOrders, id }
}

export default connect(mapState)(UserAccount);
