import React from 'react';
import { connect } from 'react-redux';
import OrderCard from './OrderCard';
// import LineItemForm from '../Product/LineItemForm.js'

const ActiveOrder = ({ activeOrder }) => {
  if (!activeOrder) return null
  return (
    <div>
      <h2>My Cart</h2>
      <OrderCard page={'active'} order={activeOrder} />
    </div>
  )
}

const mapState = ({ orders, user }) => {
  const activeOrder = orders.find(order => order.userId === user.id && order.isActive)
  return { activeOrder }
}

export default connect(mapState)(ActiveOrder)
