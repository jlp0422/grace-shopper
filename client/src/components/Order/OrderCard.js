import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import LineItemForm from '../Product/LineItemForm.js';
import moment from 'moment';
import { sentenceCase } from '../../store/reusableFunctions';
import PromoEnter from '../Promo/PromoEnter';

const OrderCard = ({ orderItems, order, totalPrice, products, page, equal, promo, promoPrice, finalPrice }) => {
  const orderDate = order.date ? moment(order.date).format("ddd, MMMM Do YYYY") : null // h:MMA") : null
  return (
    <div>
      {order.date ? (
        <div>
          <p><strong>Order date:</strong> {orderDate}</p>
          <p><strong>Order status:</strong> {sentenceCase(order.status)}</p>
        </div>
      ) : null}
      {
        orderItems.map(item => {
          const product = products.find(product => product.id === item.productId);
          if (!product) return null
          return (
            <div key={item.id} id='cart-line-item'>
              <p className="font-weight-bold">Product: {product.name}</p>
              {order.date ? <p>Quantity Purchased: {item.quantity}</p> : null}
              <p>Price per item: ${product.price}</p>
              {order.status === 'cart' ? (
                <LineItemForm id={item.id} page={page} productId={product.id} orderId={order.id} />
              )
                : null
              }
            </div>
          );
        })
      }

      <div className='row'>
        <div className='col'>
          <h3 id="cart-total-price">Total Price: ${finalPrice}.00</h3>
          { promo && <p>Original Price: ${totalPrice}.00. Promo Code {promo.name} saved you ${promo.value}.00!</p> }
        </div>
        {
          !equal && page !== 'past' ? (
            null
          ) : (
            <div>
              <br />
              { order.status === 'cart' && <PromoEnter order={order}/> }

              {
                // !!promoPrice && order.status === 'cart' ? (
                //   <div className='col'>
                //     <h3 id="cart-total-price">Promo Applied: ${promo.value}.00</h3>
                //     <h3 id="cart-total-price">New Total Price: ${promoPrice}.00</h3>
                //   </div>
                // ) : null
              }
              </div>
            )
        }
        {
          !equal && page !== 'past' ? (
            <div className='col'>
              {
                orderItems.length === 0 ? (
                  <button disabled={true} className="btn btn-success margin-t-15">Checkout</button>
                ) : (
                    <Link to={`/users/${order.userId}/checkout/${order.id}`}><button className="btn btn-success margin-t-15">Checkout</button></Link>
                )
              }
            </div>
          ) : null
        }
      </div>
    </div>
  )
}

const mapState = ({ lineItems, products, user, promos }, { order, page, location }) => {
  const path = location.pathname;
  const currentPath = `/users/${user.id}/checkout/${order.id}`;
  const equal = path === currentPath;
  const orderItems = lineItems.filter(item => item.orderId === order.id);
  const totalPrice = orderItems.reduce((memo, item) => {
    const product = products.find(product => product.id === item.productId);
    memo += ((product ? product.price : 0) * 1) * item.quantity;
    return memo;
  }, 0)
  const promo = !!order.promoId && promos.find(promo => promo.id === order.promoId);
  const promoPrice = promo && totalPrice - promo.value;
  const finalPrice = promo ? promoPrice : totalPrice;

  return { orderItems, order, totalPrice, products, page, equal, promo, promoPrice, finalPrice }
}

export default withRouter(connect(mapState)(OrderCard))
