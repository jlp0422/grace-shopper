import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

const Orders = ({ orders }) => {
  return (
    <div>
      <ul className="list-group">
        {
          orders.map(order => (
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

const mapState = ({ orders }) => {
  return { orders }
}

export default connect(mapState)(Orders);
