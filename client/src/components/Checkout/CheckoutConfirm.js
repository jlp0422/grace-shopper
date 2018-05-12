import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Addresses from '../Address/Addresses';
import ActiveOrder from '../Order/ActiveOrder';
import Dropdown from './Dropdown';
import UserNav from '../User/UserNav';
import StripePayment from './StripePayment';
import axios from 'axios';
import { updateOrderOnServer, updateProductOnServer, updatePromoOnServer } from '../../store';
import { getInfoForCheckoutEmail } from '../../store/emailMethods';
import { Helmet } from 'react-helmet';

class CheckoutConfirm extends Component {
  constructor(props) {
    super(props);
    this.state ={
      // creditCardId: '',
      shippingId: '',
      billingId: '',
      errors: {}
    }
    this.handleChange = this.handleChange.bind(this);
    this.onSave = this.onSave.bind(this);
    // this.validators = {
    //   shippingId: (value) => {
    //     if(!value) {
    //       return 'Please select a shipping address'
    //     }
    //   },
    //   billingId: (value) => {
    //     if(!value) {
    //       return 'Please select a billing address'
    //     }
    //   }
    // }
  }

  handleChange(ev) {
    this.setState({ [ev.target.name]: ev.target.value * 1 })
  }

  sendEmail(info) {
    return axios.post('/api/email', info)
      .then(res => res.data)
      .catch(err => console.error(err))
  }

  onSave(/*ev*/) {
    // ev.preventDefault();
    const { onUpdate, updateProduct, orderId, user, updatePromo, /*ownCards,*/ ownAddresses, items, products, promo, order } = this.props;
    const { /*creditCardId,*/ shippingId, billingId } = this.state;
    onUpdate({ id: orderId, status: 'processed', date: Date.now(), userId: user.id, /*creditCardId,*/ shippingId, billingId })
    items.map(item => {
      const product = products.find(product => product.id === item.productId)
      const stock = product.quantity - item.quantity;
      Object.assign(product, { quantity: stock })
      updateProduct(product, 'checkout')
    })
    // const promo = promos.find(promo => promo.id === order.promoId )
    if(promo) {
      const quant = promo && promo.quantity - 1;
      Object.assign(promo, { quantity: quant })
      updatePromo(promo, 'no-refresh')
    }
    onUpdate({ status: 'cart', userId: user.id });
    this.sendEmail(getInfoForCheckoutEmail({ user, ownAddresses, /*ownCards,*/ orderId, items, products, shippingId, billingId/*, creditCardId*/ }));
  }

  // checkErrors() {
  //   if()
  // }

  render() {
    const { handleChange, onSave } = this;
    const { shippingId, billingId} = this.state;
    const { ownAddresses, /*ownCards,*/ user, orderId, finalPrice } = this.props;
    return (
      <div>
        <Helmet><title>Checkout | J²A</title></Helmet>
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
          page: 'checkout',
          orderId: orderId
        }}>
          <button className='btn btn-primary'>Add New Address</button>
        </Link>
          <br />
          <br />
          <ActiveOrder checkout={ true }/>
          <br />
          {/*<button className='btn btn-success' onClick={ onSave }>Submit Payment</button>*/}
          <StripePayment onSave={onSave} amount={finalPrice} name={`${user.firstName} ${user.lastName}`} email={user.email} orderId={orderId} billingId={billingId} shippingId={shippingId} />

      </div>
    );
  }

}

const mapState = ({ user, addresses, orders, lineItems, products, promos }, { orderId }) => {
  const ownAddresses = addresses.filter(address => user.id === address.userId)
  const items = lineItems.filter(item => item.orderId === orderId)
  const totalPrice = items.reduce((memo, item) => {
    const product = products.find(product => product.id === item.productId)
    memo += product.price * item.quantity;
    return memo;
  }, 0)
  const order = orderId && orders.find(order => order.id === orderId);
  const promo = order && promos.find(promo => promo.id === order.promoId)
  const promoPrice = promo && totalPrice - promo.value;
  const finalPrice = promoPrice ? promoPrice : totalPrice;
  return {
    user,
    ownAddresses,
    orderId,
    items,
    products,
    finalPrice,
    promos,
    order
  }
};

const mapDispatch = (dispatch) => {
  return {
    onUpdate: (order) => dispatch(updateOrderOnServer(order)),
    updateProduct: (product, page) => dispatch(updateProductOnServer(product, page)),
    updatePromo: (promo, page) => dispatch(updatePromoOnServer(promo, page))
  }
}

export default connect(mapState, mapDispatch)(CheckoutConfirm);
