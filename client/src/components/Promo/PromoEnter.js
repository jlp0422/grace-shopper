import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updateOrderOnServer} from '../../store';

class PromoEnter extends Component {
  constructor(/*props*/) {
    super(/*props*/);
    // const { promo } = props;
    this.state = {
      name: ''
      // id: promo ? promo.id : '',
      // name: promo ? promo.name : '',
      // isEditing: false,
      // errors: {}
    }
    this.handleChange = this.handleChange.bind(this);
    this.onApplyPromo = this.onApplyPromo.bind(this);
    // this.validators = {
    //   name: (value) => {
    //     if (!value) {
    //       return 'That is not a valid Promo Code'
    //     }
    //   }
    // }
  }

  handleChange(ev) {
    const { name, value } = ev.target;
    const change = {};
    change[name] = value;
    this.setState(change);
  }

  onApplyPromo(ev) {
    ev.preventDefault();
    const { promos, order } = this.props;
    const { id, status, date, userId, creditCardId, shippingId, billingId, promoId } = order;
    const { name } = this.state;
    const promo = promos.find(promo => promo.name === name)
    if(promo) {
      this.props.updateOrder({ id, promoId: promo.id }, 'checkout')
    }
    this.setState({ name: '' });
  }

  render() {
    const { isEditing, name } = this.state;
    const { order } = this.props;
    const { handleChange, onApplyPromo } = this;
    console.log(this.state)
    return (
      <div>
        <form onSubmit={onApplyPromo}>
          <label className="font-weight-bold">Enter a Promo Code:</label>
          <input
            placeholder='Promo Code'
            name='name'
            value={name}
            className='form-control margin-b-10'
            onChange={handleChange}
          />
          <button className='btn btn-primary' disabled={!!order.promoId}>Apply Promo Code</button>
        </form>
      </div>
    )
  }

}


const mapState = ({ promos }, { order }) => {
  return { promos, order }
}

const mapDispatch = (dispatch) => {
  return {
    // updatePromo: (promo) => dispatch(updatePromoOnServer(promo))
      updateOrder: (order, page) => dispatch(updateOrderOnServer(order, page))
  }
}

export default connect(mapState, mapDispatch)(PromoEnter);
