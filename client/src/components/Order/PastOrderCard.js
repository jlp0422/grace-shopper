import React from 'react';
import { connect } from 'react-redux';

import LineItemForm from '../Product/LineItemForm.js'

const OrderCard = ({ orderItems, order, totalPrice, products }) => {
  return (
    <div>
      <div style={{ backgroundColor: '#f0f3f8', marginBottom: '10px' }}>
        { order.date ? (<p>Order date: {order.date}</p>) : null }
        {
          orderItems.map(item => {
            const product = products.find(product => product.id === item.productId);

            if(!product) return null;

            return (
              <div key={item.id}>
                <p className="font-weight-bold">Product: {product.name}</p>
                <p>Quantity: {item.quantity}</p>
                <p>Price per item: ${product.price}</p>
                { order.isActive ? <LineItemForm orderId={order.id} /> : ''}
              </div>
            );
          })
        }
      </div>
      <h3 className="font-weight-bold" style={{ backgroundColor: 'yellow' }}>Total Price: ${totalPrice}</h3>
    </div>
  )
}

const mapState = ({ lineItems, products }, { order }) => {
  const orderItems = lineItems.filter(item => item.orderId === order.id)
  const totalPrice = orderItems.reduce((memo, item) => {
    const product = products.find(product => product.id === item.productId);
    // if(!product) return 0
    // console.log(product.price)



    memo += product ? product.price : 1 * item.quantity
    return memo
  }, 0)
  return { orderItems, order, totalPrice, products }
}

export default connect(mapState)(OrderCard)
