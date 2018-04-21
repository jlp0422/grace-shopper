import React from 'react';
import { connect } from 'react-redux';

const OrderCard = ({ orderItems, products }) => {
  return (
    <div>
      {
        orderItems.map(item => (
          <h5 key={item.id}>{item.quantity}</h5>
        ))
      }
    </div>
  )
}

const mapState = ({ lineItems }, { order }) => {
  const orderItems = lineItems.filter(item => item.orderId === order.id)
  console.log(orderItems)
  return { orderItems }
}

export default connect(mapState)(OrderCard)
