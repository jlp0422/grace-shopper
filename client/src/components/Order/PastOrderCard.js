import React from 'react';
import { connect } from 'react-redux';

import LineItemForm from '../Product/LineItemForm.js'

const OrderCard = ({ orderItems, order, totalPrice, products }) => {
  return (
    <div>
      { order.date ? (<p>Order date: {order.date}</p>) : null }
      {
        orderItems.map(item => {
          const product = products.find(product => product.id === item.productId);
          return (
            <div key={item.id} id='cart-line-item'>
              <p className="font-weight-bold">Product: {product.name}</p>
              <p>Quantity: {item.quantity}</p>
              <p>Prince per item: ${product.price}</p>
              { order.isActive ? <LineItemForm /> : ''}
            </div>
          );
        })
      }
      <h3 id="cart-total-price">Total Price: ${totalPrice}.00</h3>
    </div>
  )
}

const mapState = ({ lineItems, products }, { order }) => {
  const orderItems = lineItems.filter(item => item.orderId === order.id)
  const totalPrice = orderItems.reduce((memo, item) => {
    const product = products.find(product => product.id === item.productId)
    memo += product.price * item.quantity
    return memo
  }, 0)
  return { orderItems, order, totalPrice, products }
}

export default connect(mapState)(OrderCard)
