import React from 'react';
import { connect } from 'react-redux';

const OrderCard = ({ orderItems, order, totalPrice }) => {
  return (
    <div style={{backgroundColor: '#f0f3f8'}}>
      {
        order.date ? (<h4>Order date: {order.date}</h4>) : null
      }
      {
        orderItems.map(item => (
          <div key={item.id}>
            <h4>{item.product.name}</h4>
            <h5>Quantity: {item.quantity}</h5>
            <h5>Price: ${item.product.price}</h5>
          </div>
        ))
      }
      <h5>Total Price: ${ totalPrice }</h5>
    </div>
  )
}

const mapState = ({ lineItems }, { order }) => {
  const orderItems = lineItems.filter(item => item.orderId === order.id)
  const totalPrice = orderItems.reduce((memo, item) => {
    memo += item.product.price * 1
    return memo
  }, 0)
  return { orderItems, order, totalPrice }
}

export default connect(mapState)(OrderCard)
