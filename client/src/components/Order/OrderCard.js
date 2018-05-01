import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';



import LineItemForm from '../Product/LineItemForm.js'

const OrderCard = ({ orderItems, order, totalPrice, products, page, equal }) => {
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
              { order.date ? <p>Quantity Purchased: {item.quantity}</p> : null }
              <p>Price per item: ${product.price}</p>
              { order.isActive ? (
                <LineItemForm id={ item.id } page={page} productId={product.id} orderId={order.id} />
              )
                : null
              }
            </div>
          );
        })
      }
      <div className='row'>
        <div className='col'>
          <h3 id="cart-total-price">Total Price: ${totalPrice}.00</h3>
        </div>
        {
          !equal && page !== 'past' ? (
          <div className='col'>
            <Link to={`/users/${order.userId}/checkout`}><button className="btn btn-success margin-t-15">Checkout</button></Link>
          </div>
          ) : null
        }
      </div>
    </div>
  )
}

const mapState = ({ lineItems, products, user }, { order, page, location }) => {
  const path = location.pathname;
  const currentPath = `/users/${user.id}/checkout`;
  const equal = path === currentPath;
  const orderItems = lineItems.filter(item => item.orderId === order.id);
  const totalPrice = orderItems.reduce((memo, item) => {
    const product = products.find(product => product.id === item.productId);
    memo += ((product ? product.price : 0) * 1) * item.quantity;
    return memo;
  }, 0)
  return { orderItems, order, totalPrice, products, page, equal }
}

export default withRouter(connect(mapState)(OrderCard))
