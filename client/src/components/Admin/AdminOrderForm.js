import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { deleteOrderFromServer, updateOrderOnServer } from '../../store';
import AddressForm from '../Address/AddressForm';
import Dropdown from '../Checkout/Dropdown';

/*
STILL NEEDS MORE WORK
 */

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
    const change = {}
    this.setState({ [ev.target.name]: ev.target.value * 1 })
  }

  onUpdate(ev) {
    ev.preventDefault()
    const { shippingId, billingId, creditCardId } = this.state
    const { updateOrder, order, user } = this.props
    updateOrder({ id: order.id, shippingId, billingId, creditCardId, userId: user.id }, 'admin')
    this.setState({ isEditing: false })
  }

  render() {
    const { order, user, userAddresses, userCards, deleteOrder } = this.props
    const { isEditing, shippingId, billingId, creditCardId } = this.state
    const { onUpdate, onChange } = this
    if (!order) return null
    console.log(this.state)
    return (
      <div>
        <h3>Order #{order.id}</h3>
        <h4>User: {`${user.firstName} ${user.lastName}`}</h4>
        <h5>Status: {order.isActive ? ('Active') : ('Completed')} </h5>
        <h5>Shipping Address: { order.isActive ? (
          <Dropdown items={userAddresses} title="Shipping Address" name="shippingId" handleChange={ onChange } />
        ) : ('Shipping address')}</h5>
        <h5>Billing Address: { order.isActive ? (
          <Dropdown items={userAddresses} title="Billing Address" name="billingId" handleChange={onChange} />
        ) : ('billing address') }</h5>
        <h5>Payment method: { order.isActive ? (
          <Dropdown items={userCards} title="Credit Card" name="creditCardId" handleChange={onChange} />
        ) : ('cc num') }</h5>
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

const mapState = ({ orders, users, addresses, creditCards },{ id }) => {
  const order = orders.find(order => order.id === id)
  const user = order && users.find(user => user.id === order.userId)
  const userAddresses = user && addresses.filter(address => address.userId === user.id)
  const userCards = user && creditCards.filter(card => card.userId === user.id)
  console.log(userAddresses)
  return { order, user, userAddresses, userCards  }
}

const mapDispatch = (dispatch) => {
  return {
    deleteOrder: (id, page) => dispatch(deleteOrderFromServer(id, page)),
    updateOrder: (order, page) => dispatch(updateOrderOnServer(order, page))
  }
}

export default connect(mapState, mapDispatch)(AdminOrderForm);
