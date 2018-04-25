import React from 'react';
import { connect } from 'react-redux';
import OrderCard from './PastOrderCard';

const ActiveOrder = ({ activeOrder }) => {
  return (
    <div>
      {
        activeOrder.map(order => (
          <OrderCard key={order.id} order={order} />
        ))
      }
    </div>
  )
}

const mapState = ({ orders, user }) => {
  const activeOrder = orders.filter(order => order.userId === user.id && order.isActive)
  return { activeOrder }
}

export default connect(mapState)(ActiveOrder)
