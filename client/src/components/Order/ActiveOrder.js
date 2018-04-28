import React from 'react';
import { connect } from 'react-redux';
import OrderCard from './PastOrderCard';
import { Link } from 'react-router-dom';

const ActiveOrder = ({ activeOrder, user }) => {
  return (
    <div>
      <h2>My Cart</h2>
      {
        activeOrder.map(order => (
          <OrderCard key={order.id} order={order} />
        ))
      }
      <Link to={`/users/${user.id}/cart/checkout`}><button className="btn btn-success margin-t-15">Checkout</button></Link>
    </div>
  )
}

const mapState = ({ orders, user }) => {
  const activeOrder = orders.filter(order => order.userId === user.id && order.isActive)
  return { activeOrder, user }
}

export default connect(mapState)(ActiveOrder)
