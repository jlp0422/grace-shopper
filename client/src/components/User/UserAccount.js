/* eslint-disable */
import React from 'react';
import { connect } from 'react-redux';
import { Nav, NavItem, NavLink, TabContent, TabPane } from 'reactstrap';
import PastOrders from '../Order/PastOrders';
import ActiveOrder from '../Order/ActiveOrder';
import UserForm from './UserFormNEW';
import Addresses from '../Address/Addresses';

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
    const { user, userOrders, id, userAddresses } = this.props;
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
            <NavLink
              className={activeTab === '1' ? 'active font-weight-bold' : '' }
              onClick={() => { toggle('1'); }}>
              My Cart
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={activeTab === '2' ? 'active font-weight-bold' : '' }
              onClick={() => { toggle('2'); }}>
              Past Orders
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={activeTab === '3' ? 'active font-weight-bold' : ''}
              onClick={() => { toggle('3'); }}>
              My Addresses
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={activeTab === '4' ? 'active font-weight-bold' : ''}
              onClick={() => { toggle('4'); }}>
              Edit Account
            </NavLink>
          </NavItem>
        </Nav>
        <TabContent activeTab={activeTab}>
          <TabPane tabId="1">
            <ActiveOrder />
          </TabPane>
          <TabPane tabId="2">
            <PastOrders />
          </TabPane>
          <TabPane tabId="3">
            <Addresses userAddresses={userAddresses} />
          </TabPane>
          <TabPane tabId="4">
            <UserForm user={user} />
          </TabPane>
        </TabContent>
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
