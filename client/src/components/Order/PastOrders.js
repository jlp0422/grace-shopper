import React from 'react';
import { connect } from 'react-redux';
import OrderCard from './OrderCard';
import UserNav from '../User/UserNav';
import { Helmet } from 'react-helmet';

const PastOrders = ({ pastOrders, user }) => {
  return (
    <div>
      {user.firstName && <Helmet><title>{user.firstName}'s Orders | J²A</title></Helmet> }
      <UserNav user={ user } />
      <h2>Orders</h2>
      { pastOrders.length ? null : ('No recent orders')}
      {
        pastOrders.map(order => (
          <div key={order.id}>
            <OrderCard page={'past'} order={order} />
            <hr />
          </div>
        ))
      }
    </div>
  )
}

const mapState = ({ orders, user }, { page }) => {
  const pastOrders = orders.filter(order => order.userId === user.id && order.status !== 'cart')
  return { pastOrders, user }
}

export default connect(mapState)(PastOrders)
