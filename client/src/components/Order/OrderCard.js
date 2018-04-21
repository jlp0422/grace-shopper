import React from 'react';
import { connect } from 'react-redux';

const OrderCard = ({ orderItems, order, totalPrice }) => {
  return (
    <div style={{backgroundColor: '#f0f3f8'}}>
      {
        order.date ? (<p>Order date: {order.date}</p>) : null
      }
      {
        orderItems.map(item => (
          <div key={item.id}>
            <p className="font-weight-bold">Product: {item.product.name}</p>
            <p>Quantity: {item.quantity}</p>
            <p>Price: ${item.product.price}</p>
          </div>
        ))
      }
      <p>Total Price: ${ totalPrice }</p>
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
