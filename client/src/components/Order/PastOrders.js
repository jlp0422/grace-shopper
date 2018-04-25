import React from 'react';
import { connect } from 'react-redux';
import OrderCard from './PastOrderCard';

const PastOrders = ({ pastOrders }) => {
  return (
    <div>
      {
        pastOrders.map(order => (
          <OrderCard key={order.id} order={order} />
        ))
      }
    </div>
  )
}

const mapState = ({ orders, user }) => {
  const pastOrders = orders.filter(order => order.userId === user.id && !order.isActive)
  return { pastOrders }
}

export default connect(mapState)(PastOrders)
