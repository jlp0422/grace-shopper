import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

class AdminOrderForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {

    }
  }

  render() {
    const { order, user } = this.props
    return (
      <div>
        <h3>Order #{order.id}</h3>
        <h4>User: {`${user.firstName} ${user.lastName}`}</h4>
        <h5>Status: {order.isActive ? ('Active') : ('Completed')} </h5>
        { order.isActive ? null : <h5>Order date: {order.date}</h5> }
        <h5>Shipping Address: </h5>
        <h5>Billing Address: </h5>
        <h5>Payment method: </h5>
      </div>
    )
  }
}

const mapState = ({ orders, users },{ id }) => {
  const order = orders.find(order => order.id === id)
  const user = order && users.find(user => user.id === order.userId)
  console.log(order)
  return { order, user  }
}

const mapDispatch = (dispatch) => {
  return {

  }
}

export default connect(mapState, mapDispatch)(AdminOrderForm);
