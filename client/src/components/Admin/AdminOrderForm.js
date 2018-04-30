import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { deleteOrderFromServer } from '../../store'

class AdminOrderForm extends React.Component {
  constructor(props) {
    super(props)
    // console.log(props)
    this.state = {
      shippingAddress: '',
      billingAddress: '',
      creditCardId: ''
    }
  }

  render() {
    const { order, user, deleteOrder } = this.props
    console.log(this.state)
    return (
      <div>
        <h3>Order #{order.id}</h3>
        <h4>User: {`${user.firstName} ${user.lastName}`}</h4>
        <h5>Status: {order.isActive ? ('Active') : ('Completed')} </h5>
        { order.isActive ? null : (
          <div>
            <h5>Order date: {order.date}</h5>
            <h5>Shipping Address: </h5>
            <h5>Billing Address: </h5>
            <h5>Payment method: </h5>
          </div>
        )}
        { order.isActive ? <button className="btn btn-outline-success">Edit order</button> : null }
        { order.isActive ? <button onClick={() => deleteOrder(order.id)} className="btn btn-warning">Delete order</button> : null }
      </div>
    )
  }
}

const mapState = ({ orders, users },{ id }) => {
  const order = orders.find(order => order.id === id)
  const user = order && users.find(user => user.id === order.userId)
  // console.log(order)
  return { order, user  }
}

const mapDispatch = (dispatch) => {
  return {
    deleteOrder: (id) => dispatch(deleteOrderFromServer(id))
  }
}

export default connect(mapState, mapDispatch)(AdminOrderForm);
