import React from 'react';
import { connect } from 'react-redux';

const OrderCard = ({ orderItems, order }) => {
  return (
    <div style={{backgroundColor: '#f0f3f8'}}>
      <h4>Order date: {order.date}</h4>
      {
        orderItems.map(item => (
          <div key={item.id}>
            <h4>{item.product.name}</h4>
            <h5>Quantity: {item.quantity}</h5>
            <h5>Price: ${item.product.price}</h5>
          </div>
        ))
      }
    </div>
  )
}

const mapState = ({ lineItems }, { order }) => {
  const orderItems = lineItems.filter(item => item.orderId === order.id)
  console.log(orderItems)
  return { orderItems, order }
}

export default connect(mapState)(OrderCard)
