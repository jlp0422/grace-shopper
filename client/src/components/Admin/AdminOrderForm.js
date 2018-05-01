import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { deleteOrderFromServer } from '../../store';
import AddressForm from '../Address/AddressForm'

class AdminOrderForm extends React.Component {
  constructor(props) {
    super(props)
    // console.log(props)
    this.state = {
      shippingAddress: '',
      billingAddress: '',
      creditCardId: '',
      isEditing: false
    }
  }

  render() {
    const { order, user, deleteOrder } = this.props
    const { isEditing } = this.state
    if (!order) return null
    console.log(this.state)
    return (
      <div>
        <h3>Order #{order.id}</h3>
        <h4>User: {`${user.firstName} ${user.lastName}`}</h4>
        <h5>Status: {order.isActive ? ('Active') : ('Completed')} </h5>
        <h5>Shipping Address: { order.isActive ? null : ('shipping') }</h5>
        <h5>Billing Address: { order.isActive ? null : ('billing') }</h5>
        <h5>Payment method: { order.isActive ? null : ('cc num') }</h5>
        { order.isActive ?
          <button onClick={() => this.setState({ isEditing: !isEditing })} className={`btn btn-${ isEditing ? `` : `outline-`}success`}>{ isEditing ? ('Save') : ('Edit')}</button>
          : null
        }
        { order.isActive ?
          <button onClick={() => deleteOrder(order.id, 'admin')} className="btn btn-warning">Delete order</button>
          : null
        }
      </div>
    )
  }
}

const mapState = ({ orders, users },{ id }) => {
  const order = orders.find(order => order.id === id)
  const user = order && users.find(user => user.id === order.userId)
  return { order, user  }
}

const mapDispatch = (dispatch) => {
  return {
    deleteOrder: (id, page) => dispatch(deleteOrderFromServer(id, page))
  }
}

export default connect(mapState, mapDispatch)(AdminOrderForm);
