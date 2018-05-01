import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { deleteOrderFromServer, updateOrderOnServer } from '../../store';
import AddressForm from '../Address/AddressForm'

class AdminOrderForm extends React.Component {
  constructor(props) {
    super(props)
    // console.log(props)
    this.state = {
      shippingId: '',
      billingId: '',
      creditCardId: '',
      isEditing: false
    }
    this.onUpdate = this.onUpdate.bind(this)
    this.onChange = this.onChange.bind(this)
  }

  onChange(ev) {

  }

  onUpdate(ev) {
    ev.preventDefault()
    const { shipping, billing, cc } = this.state
    const { updateOrder, order } = this.props
    updateOrder({ id: order.id, shippingId, billingId, creditCardId }, 'admin')
    this.setState({ isEditing: false })
  }

  render() {
    const { order, user, deleteOrder } = this.props
    const { isEditing, shippingId, billingId, creditCardId } = this.state
    const { onUpdate, onChange } = this
    if (!order) return null
    console.log(this.state)
    return (
      <div>
        <h3>Order #{order.id}</h3>
        <h4>User: {`${user.firstName} ${user.lastName}`}</h4>
        <h5>Status: {order.isActive ? ('Active') : ('Completed')} </h5>
        {/* add Dropdown component once merged for Shipping, Billing and Payment Method */}
        <h5>Shipping Address: { order.isActive ? null : ('shipping address') }</h5>
        <h5>Billing Address: { order.isActive ? null : ('billing address') }</h5>
        <h5>Payment method: { order.isActive ? null : ('cc num') }</h5>
        { order.isActive ?
          isEditing ? (
            <button onClick={ onUpdate } className={`btn btn-success`}>Save</button>
          ) : (
            <button onClick={() => this.setState({ isEditing: !isEditing })} className={`btn btn-outline-success`}>Edit</button>
          )
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
    deleteOrder: (id, page) => dispatch(deleteOrderFromServer(id, page)),
    updateOrder: (order, page) => dispatch(updateOrderOnServer(order, page))
  }
}

export default connect(mapState, mapDispatch)(AdminOrderForm);
