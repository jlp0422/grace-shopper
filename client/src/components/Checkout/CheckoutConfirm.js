import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Addresses from '../Address/Addresses';
import ActiveOrder from '../Order/ActiveOrder';
import Dropdown from './Dropdown';
import UserNav from '../User/UserNav';
import axios from 'axios';
import { updateOrderOnServer, updateProductOnServer } from '../../store';

class CheckoutConfirm extends Component {
  constructor(props) {
    super(props);
    this.state ={
      creditCardId: '',
      shippingId: '',
      billingId: '',
    }
    this.handleChange = this.handleChange.bind(this);
    this.onSave = this.onSave.bind(this);
  }

  handleChange(ev) {
    this.setState({ [ev.target.name]: ev.target.value * 1 })
  }

  getInfoForEmail() {
    const { user, ownAddresses, ownCards, orderId, items, products } = this.props;
    const { shippingId, billingId, creditCardId } = this.state;
    const { email, firstName, lastName } = user;
    const shipping = ownAddresses.find(address => address.id === shippingId)
    const { street, city, state, zip } = shipping;
    const card = ownCards.find(card => card.id === creditCardId)
    const { ccType, ccNum } = card;
    const totalPrice = items.reduce((memo, item) => {
      const product = products.find(product => item.productId === product.id)
      memo += (product.price * item.quantity)
      return memo;
    }, 0);
    const productMap = items.reduce((memo, item) => {
      const product = products.find(product => item.productId === product.id)
      const id = product.id;
      memo[id] = {}
      memo[id].name = product.name;
      memo[id].quantity = item.quantity
      memo[id].price = product.price
      return memo;
    }, {})
    const listItems = items.reduce((memo, item) => {
      const product = productMap[item.productId];
      memo += (`
        <li>
          Product #${item.productId}: (${product.quantity}) ${product.name} --- $${product.price}/each
        </li>
      `)
      return memo
    }, '')
    const htmlForEmail = (`
      <html>
        <head><title>Thank You!</title></head>
        <body>
          <h2>Hello ${firstName}!</h2>
          <p>Thank you so much for your purchase!</p>
          <p>You ordered the following:</p>
          <ul>${listItems}</ul>
          <h4>Total Price: $${totalPrice}.00</h4>
          <p>Credit Card: ${ccType} ****${ccNum.slice(-4)}</p>
          <p><b>Order#${orderId}</b> will be shipped to:</p>
          <p>
            ${firstName} ${lastName}
            <br />
            ${street}
            <br />
            ${city}, ${state} ${zip}
          </p>
          <h3>Thank You from the Team at J²A Widgets!</h3>
        </body>
      </html>
    `);
    const info = { email, orderId, htmlForEmail };
    return info;
  }

  sendEmail(info) {
    return axios.post('/api/email', info)
      .then(res => res.data)
      .catch(err => console.error(err))
  }

  onSave(ev) {
    ev.preventDefault();
    const { onUpdate, updateProduct, orderId, user, items, products } = this.props;
    const { creditCardId, shippingId, billingId } = this.state;
    onUpdate({ id: orderId, status: 'processed', date: Date.now(), userId: user.id, creditCardId, shippingId, billingId })
    // console.log('products :', products)
    items.map(item => {
      // console.log('items: ', items)
      const product = products.find(product => product.id === item.productId)
      // console.log(item)
      // console.log(product)
      const stock = product.quantity - item.quantity;
      Object.assign(product, { quantity: stock })
      // console.log(product)
      updateProduct(product)
    })
    onUpdate({ status: 'cart', userId: user.id });
    this.sendEmail(this.getInfoForEmail());
  }

  render() {
    const { handleChange, onSave } = this;
    const { ownAddresses, ownCards, user, orderId } = this.props;
    return (
      <div>
        <UserNav user={ user } />
        <div className='row'>
          <div className='col'>
            <h5>Select Shipping Address:</h5>
            <Dropdown items={ownAddresses} title='Shipping Address' name='shippingId' handleChange={handleChange} />
          </div>
          <div className='col'>
            <h5>Select Billing Address:</h5>
            <Dropdown items={ownAddresses} title='Billing Address' name='billingId' handleChange={handleChange} />
          </div>
        </div>
        <Link to={{
          pathname: `/users/${user.id}/addresses`,
          state: 'checkout',
        }}>
          <button className='btn btn-primary'>Add New Address</button>
        </Link>
          <br />
          <br />
        <h5>Select Credit Card:</h5>
          <Dropdown items={ownCards} title='Credit Card' name='creditCardId' handleChange={handleChange} />
            <Link to={{
              pathname: `/users/${user.id}/creditCards`,
              page: 'checkout',
              orderId: orderId
            }}>
              <button className='btn btn-info'>Add New Card</button>
            </Link>
          <ActiveOrder checkout={ true }/>
          <br />
          <button className='btn btn-success' onClick={ onSave }>Submit Payment</button>
      </div>
    );
  }

}

const mapState = ({ user, addresses, creditCards, orders, lineItems, products }, { orderId }) => {
  const ownAddresses = addresses.filter(address => user.id === address.userId)
  const ownCards = creditCards.filter(card => card.userId === user.id)
  const items = lineItems.filter(item => item.orderId === orderId)
  return {
    user,
    ownAddresses,
    ownCards,
    orderId,
    items,
    products
  }
};

const mapDispatch = (dispatch) => {
  return {
    onUpdate: (order) => dispatch(updateOrderOnServer(order)),
    // onUpdateProducts: (items, products) => {
    //   items.forEach(item => {
    //     const product = products.find(product => product.id === item.productId)
    //     const stock = product.quantity - item.quantity;
    //     Object.assign(product, { quantity: stock })
    //     dispatch(updateProductOnServer(product))
    //   })
    // },
    updateProduct: (product) => dispatch(updateProductOnServer(product))
  }
}

export default connect(mapState, mapDispatch)(CheckoutConfirm);
