import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updateUserOnServer } from '../../store';

class PaymentForm extends Component {
  constructor() {
    super();
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
    const { onSave, user } = this.props;

    console.log(user);

    const { ccType, ccNum, ccExp, ccSec } = this.state;
    const { id, firstName, lastName, username, password, email, isAdmin } = user;
    onSave({ id , firstName, lastName, username, password, email, isAdmin, ccType, ccNum, ccExp, ccSec });
  }

  render() {
    const fields = {
      ccType: 'Credit Card Type',
      ccNum: 'Credit Card Number',
      ccExp: 'Expiration',
      ccSec: 'Security Code',
    }
    const { onSave, onChange } = this;
    return (
      <div>
        <h4> Payment Details </h4>
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
        <button onClick={onSave}>submit payment</button>
      </div>
    );
  }
}

const mapState = ({ user }) => {
  return { user }
}

const mapDispatch = (dispatch) => {
  return {
    onSave: (ccInfo) => dispatch(updateUserOnServer(ccInfo))
  }
}

export default connect(mapState, mapDispatch)(PaymentForm);
