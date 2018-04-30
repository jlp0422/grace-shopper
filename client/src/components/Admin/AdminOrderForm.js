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
        <h5>User: {`${user.firstName} ${user.lastName}`}</h5>
        <h6>Status: {order.isActive ? ('Active') : ('Completed')} </h6>
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
