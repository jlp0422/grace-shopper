import React, { Component } from 'react';
import { connect } from 'react-redux';

class PromoEnter extends Component {
  constructor(props) {
    super(props);
    const { promo } = props;
    this.state = {
      id: promo ? promo.id : '',
      name: promo ? promo.name : '',
      isEditing: false,
      errors: {}
    }
    this.handleChange = this.handleChange.bind(this);
    this.onSave = this.onSave.bind(this);
    this.validators = {
      name: (value) => {
        if (!value) {
          return 'That is not a valid Promo Code'
        }
      }
    }
  }

  handleChange(ev) {
    const change = {}
    change[ev.target.name] = ev.target.value
    this.setState(change);
  }

  onSave(ev) {
    ev.preventDefault();
    const { id, name } = this.state;
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
    this.props.updatePromo({ id, name });
    this.setState({ name: '' });
  }

  render() {
    const { errors, isEditing } = this.state;
    const { handleChange, onSave } = this;
    return (
      <div>
        <form onSubmit={onSave}>
          <label className="font-weight-bold">Enter a Promo Code:</label>
          <input
            placeholder='Promo Code'
            name='name'
            value={name}
            className={`form-control margin-b-10${errors.name ? ' is-invalid' : null}`}
            onChange={handleChange}
          />
          {errors.name && <div className='help-block'>{errors.name}</div>}
          <button className='btn btn-primary'>Apply Promo Code</button>
        </form>
      </div>
    )
  }

}


// const mapState({ promos }) => {
//     // const isMatch 
//     return { promos }
// }

const mapDispatch = (dispatch) => {
  return {
    updatePromo: (promo) => dispatch(updatePromoOnServer(promo))
  }

}

export default connect(null, mapDispatch)(PromoEnter);