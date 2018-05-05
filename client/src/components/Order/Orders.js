import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

const Orders = ({ orders, user }) => {
  const ordersToShow = user ? orders.filter(order => order.userId === user.id) : orders
  return (
    <div>
      <h2>{ user ? (
        `Order history for ${user.firstName} ${user.lastName}`
      ) : (
        'Complete order history'
      )}</h2>
      <ul className="list-group">
        {
          ordersToShow.map(order => (
            <div key={ order.id }>
            <Link to={`/admin/orders/${order.id}`}>
              <li className="list-group-item">Order #{order.id}</li>
            </Link>
            </div>
          ))
        }
      </ul>
    </div>
  )
}

const mapState = ({ orders, users }, { id }) => {
  const user = users.find(user => user.id === id)
  return { orders, user }
}

export default connect(mapState)(Orders);
