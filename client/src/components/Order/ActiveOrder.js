import React from 'react';
import { connect } from 'react-redux';
import UserNav from './../User/UserNav';

import OrderCard from './OrderCard';
// import LineItemForm from '../Product/LineItemForm.js'

const ActiveOrder = ({ activeOrder, user }) => {
  if (!activeOrder) return null
  return (
    <div>
      <UserNav user={ user } />
      <h2>My Cart</h2>
      <OrderCard page={'active'} order={activeOrder} checkout={ false } />
    </div>
  )
}

const mapState = ({ orders, user }) => {
  const activeOrder = orders.find(order => order.userId === user.id && order.isActive)
  return { activeOrder, user }
}

export default connect(mapState)(ActiveOrder)
