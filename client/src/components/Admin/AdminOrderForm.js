import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { deleteOrderFromServer, updateOrderOnServer } from '../../store';
import AddressForm from '../Address/AddressForm';
import Dropdown from '../Checkout/Dropdown';
import { sentenceCase } from '../../store/reusableFunctions';
import AdminNav from './AdminNav';

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
    updateOrder({ id: order.id, status: 'complete', shippingId, billingId, creditCardId, userId: user.id, date: new Date() }, 'admin')
    this.setState({ isEditing: false })
  }

  render() {
    const { order, user, userAddresses, userCards, deleteOrder } = this.props
    const { isEditing, shippingId, billingId, creditCardId } = this.state
    const { onUpdate, onChange } = this
    const shippingAddress = userAddresses.find(address => address.id === order.shippingId)
    const billingAddress = userAddresses.find(address => address.id === order.billingId)
    const card = userCards.find(card => card.id === order.creditCardId)
    // console.log(userAddresses)
    // console.log(order)
    if (!order) return null
    return (
      <div>
        <AdminNav />
        <h3>Order #{order.id}</h3>
        <h3>User: {`${user.firstName} ${user.lastName}`}</h3>
        <h5>Status: {sentenceCase(order.status)} </h5>
        <h5>Shipping Address: {shippingAddress && shippingAddress.nickname}</h5>
        { order.status === 'processed' || order.status === 'cart' ? (
          <Dropdown readOnly={ !isEditing } status={order.status} order={ order } items={userAddresses} title="Shipping Address" name="shippingId" handleChange={ onChange } />
          ) : null }

        <h5>Billing Address: {billingAddress && billingAddress.nickname}</h5>
        { order.status === 'processed' || order.status === 'cart'  ? (
          <Dropdown readOnly={!isEditing} status={order.status} order={ order } items={userAddresses} title="Billing Address" name="billingId" handleChange={onChange} />
          ) : null }

        <h5>Payment method: {card && `${card.ccType} ${card.ccNum}`}</h5>
        { order.status === 'processed' || order.status === 'cart'  ? (
          <Dropdown readOnly={!isEditing} status={order.status} order={ order } items={userCards} title="Credit Card" name="creditCardId" handleChange={onChange} />
          ) : null }

        { order.status === 'processed' || order.status === 'cart' ?
          isEditing ? (
            <button onClick={ onUpdate } disabled={ billingId && shippingId && creditCardId ? false : true } className={`btn btn-success`}>Save</button>
          ) : (
            <button onClick={() => this.setState({ isEditing: !isEditing })} className={`btn btn-outline-success`}>Edit</button>
          )
          : null
        }
        { order.status === 'processed' || order.status === 'cart'  ?
          <button onClick={() => deleteOrder(order.id, 'admin')} className="btn btn-warning">Delete order</button>
          : null
        }
        {
          isEditing ? <button onClick={() => this.setState({ isEditing: !isEditing })} className={`btn btn-outline-secondary`}>Cancel Edit</button>
          : null
        }
      </div>
    )
  }
}

const mapState = ({ orders, users, addresses, creditCards }, { id }) => {
  const order = orders.find(order => order.id === id)
  const user = order && users.find(user => user.id === order.userId)
  const userAddresses = user && addresses.filter(address => address.userId === user.id)
  const userCards = user && creditCards.filter(card => card.userId === user.id)
  return { order, user, userAddresses, userCards  }
}

const mapDispatch = (dispatch) => {
  return {
    deleteOrder: (id, page) => dispatch(deleteOrderFromServer(id, page)),
    updateOrder: (order, page) => dispatch(updateOrderOnServer(order, page))
  }
}

export default connect(mapState, mapDispatch)(AdminOrderForm);
