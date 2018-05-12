import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updateOrderOnServer} from '../../store';

class PromoEnter extends Component {
  constructor() {
    super();
    this.state = {
      name: ''
    }
    this.handleChange = this.handleChange.bind(this);
    this.onApplyPromo = this.onApplyPromo.bind(this);
  }

  handleChange(ev) {
    const { name, value } = ev.target;
    const change = {};
    change[name] = value;
    this.setState(change);
  }

  onApplyPromo(ev) {
    ev.preventDefault();
    const { promos, order, updateOrder } = this.props;
    const { id, status, date, userId, creditCardId, shippingId, billingId, promoId } = order;
    const { name } = this.state;
    const promo = promos.find(promo => promo.name === name)
    if(promo) {
      updateOrder({ id, status, date, userId, creditCardId, shippingId, billingId, promoId: promo.id }, 'checkout')
    }
    this.setState({ name: '' });
  }

  render() {
    const { name } = this.state;
    const { order } = this.props;
    const { handleChange, onApplyPromo } = this;
    console.log(this.state)
    if(!order.id) return null
    return (
      <div>
        <div>
          <label className="font-weight-bold">Enter a Promo Code:</label>
          <input
            placeholder='Promo Code'
            name='name'
            value={name}
            className='form-control margin-b-10'
            onChange={handleChange}
          />
          <button className='btn btn-primary' disabled={!!order.promoId} onClick={onApplyPromo}>Apply Promo Code</button>
        </div>
      </div>
    )
  }
}

const mapState = ({ promos }, { order }) => {
  return { promos, order }
}

const mapDispatch = (dispatch) => {
  return {
    updateOrder: (order, page) => dispatch(updateOrderOnServer(order, page))
  }
}

export default connect(mapState, mapDispatch)(PromoEnter);
