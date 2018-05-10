import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updatePromoOnServer, deletePromoOnServer } from '../../store';

class PromoForm extends Component {
  constructor(props) {
    super(props);
    const { promo } = props;
    this.state = {
      id: promo ? promo.id : '',
      name: promo ? promo.name : '',
      value: promo ? promo.value : '',
      quantity: promo ? promo.quantity : '',
      isEditing: false,
      errors: {}
    }
    this.handleChange = this.handleChange.bind(this);
    this.onSave = this.onSave.bind(this);
    this.validators = {
      name: (value) => {
        if (!value) {
          return 'Please enter a Promo Code / Name'
        }
      },
      value: (value) => {
        if (!value || typeof value !== 'number') {
          return 'Must Enter Value'
        }
      },
      quantity: (value) => {
        if (!value || typeof value !== 'number') {
          return 'Must Enter Quantity'
        }
      }
    }
  }

  componentWillReceiveProps(nextProps) {
    const { promo } = nextProps;
    this.setState(promo);
  }

  handleChange(ev) {
    const change = {};
    let value;
    if (ev.target.name === 'name') {
      value = ev.target.value;
    } else {
      value = ev.target.value * 1;
    }
    change[ev.target.name] = value;
    this.setState(change);
  }

  onSave(ev) {
    ev.preventDefault();
    const { id, name, value, quantity } = this.state;
    const errors = Object.keys(this.validators).reduce((memo, key) => {
      const validator = this.validators[key];
      const value = this.state[key];
      const error = validator(value);
      if (error) {
        memo[key] = error;
      }
      return memo;
    }, {})
    this.setState({ errors });
    if (Object.keys(errors).length) {
      return;
    }
    this.props.updatePromo({ id, name, value, quantity });
    this.setState({ isEditing: false, name: '', value: '', quantity: '' });
  }

  render() {
    const { id, name, value, quantity, errors, isEditing } = this.state;
    const { deletePromo, promo, empty, admin } = this.props;
    const { handleChange, onSave } = this;
    return (
      <div>
        {
          isEditing ? (
            <button onClick={onSave} className="btn btn-success margin-t-15" disabled={!(name && value && quantity)}>Save</button>
          ) : (
              <button onClick={() => this.setState({ isEditing: true })} className="btn btn-outline-success margin-t-15">{empty ? ('Add Promo Code') : ('Edit Promo Code')}</button>
            )
        }
        {empty ? null : <button onClick={() => deletePromo(id)} className='btn btn-danger margin-t-15'>Delete Promo Code</button>}
        <input
          readOnly={isEditing ? false : true}
          className={`form-control${isEditing ? `` : `-plaintext`}`}
          placeholder='Promo Code'
          name='name'
          value={name}
          className={`form-control margin-b-10${errors.name ? 'is-invalid' : null}`}
          onChange={handleChange}
        />
        {
          errors.name && <div className='help-block'>
            {errors.name}
          </div>
        }
        <input
          readOnly={isEditing ? false : true}
          className={`form-control${isEditing ? `` : `-plaintext`}`}
          placeholder='Promo Value'
          name='value'
          value={value}
          className={`form-control margin-b-10${errors.name ? 'is-invalid' : null}`}
          onChange={handleChange}
        />
        {
          errors.value && <div className='help-block'>
            {errors.value}
          </div>
        }
        <input
          readOnly={isEditing ? false : true}
          className={`form-control${isEditing ? `` : `-plaintext`}`}
          placeholder='Promo Quantity'
          name='quantity'
          value={quantity}
          className={`form-control margin-b-10${errors.name ? 'is-invalid' : null}`}
          onChange={handleChange}
        />
        {
          errors.quantity && <div className='help-block'>
            {errors.quantity}
          </div>
        }

      </div>
    );
  }
}

const mapDispatch = (dispatch) => {
  return {
    updatePromo: (promo) => dispatch(updatePromoOnServer(promo)),
    deletePromo: (id) => dispatch(deletePromoOnServer(id))
  }
}

export default connect(null, mapDispatch)(PromoForm);