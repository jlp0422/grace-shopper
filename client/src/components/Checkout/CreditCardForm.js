import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { createCreditCardOnServer } from '../../store';

class CreditCardForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ccType: '',
      ccNum: '',
      ccExp: '',
      ccSec: '',
    }
    this.onChange = this.onChange.bind(this);
    this.onSave = this.onSave.bind(this);
  }

  onChange(ev) {
    const change = {}
    change[ev.target.name] = ev.target.value;
    this.setState(change);
  }

  onSave(ev) {
    ev.preventDefault();
    const { onSave, userId } = this.props;
    const { ccType, ccNum, ccExp, ccSec } = this.state;
    onSave({ ccType, ccNum, ccExp, ccSec, userId });
    this.setState({ ccType: '', ccNum: '', ccExp: '', ccSec: '' });
  }

  render() {
    const fields = {
      ccType: 'Credit Card Type',
      ccNum: 'Credit Card Number',
      ccExp: 'Expiration',
      ccSec: 'Security Code',
    }
    const { onSave, onChange, removeCard } = this;
    const { userId } = this.props;
    return (
      <div>
        <h4>Add New Card</h4>
        <div>
          {
            Object.keys(fields).map(field => (
              <input
                key={field}
                className='form-control margin-b-10'
                placeholder={`${fields[field]}`}
                name={field}
                style={{ marginBottom: '10px' }}
                value={this.state[field]}
                onChange={onChange}
              />
            ))
          }
        </div>
        <button onClick={onSave} className="btn btn-success">Save</button>
      </div>
    );
  }
}

const mapState = ( state, { userId }) => {
  return { userId }
}

const mapDispatch = (dispatch, { location }) => {
  const { orderId, page } = location
  return {
    onSave: (creditCard) => dispatch(createCreditCardOnServer(creditCard, page, orderId))
  }
}

export default withRouter(connect(mapState, mapDispatch)(CreditCardForm));
