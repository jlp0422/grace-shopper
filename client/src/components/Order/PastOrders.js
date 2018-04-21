import React from 'react';
import { connect } from 'react-redux';

const PastOrders = ({ pastOrders }) => {
  return (
    <hr />
  )
}

const mapState = ({ orders, user, lineItems }) => {
  const pastOrders = orders.filter(order => order.userId === user.id && !order.isActive)
  return { pastOrders, lineItems }
}

export default connect(mapState)(PastOrders)
