import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import LineItemForm from '../Product/LineItemForm.js'

const OrderCard = ({ orderItems, order, totalPrice, products }) => {
  return (
    <div>
      { order.date ? (<p>Order date: {order.date}</p>) : null }
      {
        orderItems.map(item => {
          const product = products.find(product => product.id === item.productId);

          if(!product) return null

          return (
            <div key={item.id} id='cart-line-item'>
              <p className="font-weight-bold">Product: {product.name}</p>
              <p>Quantity: {item.quantity}</p>
              <p>Prince per item: ${product.price}</p>
              { order.isActive ? <LineItemForm productId={product.id} orderId={order.id} /> : ''}
            </div>
          );
        })
      }
      <div className='row'>
        <div className='col'>
          <h3 id="cart-total-price">Total Price: ${totalPrice}.00</h3>
        </div>
        <div className='col'>
          <Link to={`/users/${order.userId}/cart/checkout`}><button className="btn btn-success margin-t-15">Checkout</button></Link>
        </div>
      </div>
    </div>
  )
}

const mapState = ({ lineItems, products }, { order }) => {
  const orderItems = lineItems.filter(item => item.orderId === order.id)
  const totalPrice = orderItems.reduce((memo, item) => {
    const product = products.find(product => product.id === item.productId)
    memo += ((product ? product.price : 0) * 1) * item.quantity
    return memo
  }, 0)
  return { orderItems, order, totalPrice, products }
}

export default connect(mapState)(OrderCard)
