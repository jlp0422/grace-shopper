import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updateUserOnServer } from '../../store';

class PaymentForm extends Component {
  constructor(props) {
    super(props);
    const { user } = props;
    const { ccType, ccNum, ccExp, ccSec } = user;
    this.state = {
      ccType: user.id ? ccType : '',
      ccNum: user.id ? ccNum : '',
      ccExp: user.id ? ccExp : '',
      ccSec: user.id ? ccSec : '',
    }
    this.onChange = this.onChange.bind(this);
    this.onSave = this.onSave.bind(this);
    this.removeCard = this.removeCard.bind(this);
  }

  onChange(ev) {
    const change = {}
    change[ev.target.name] = ev.target.value;
    this.setState(change);
  }

  onSave(ev) {
    ev.preventDefault();
    const { onSave, user } = this.props;
    const { ccType, ccNum, ccExp, ccSec } = this.state;
    const { id, firstName, lastName, username, password, email, isAdmin } = user;
    onSave({ id , firstName, lastName, username, password, email, isAdmin, ccType, ccNum, ccExp, ccSec });
  }

  removeCard(ev) {
    ev.preventDefault();
    const { onSave, user } = this.props;
    this.setState({ ccType: '', ccNum: '', ccExp: '', ccSec: '' })
    const { ccType, ccNum, ccExp, ccSec } = this.state;
    const { id, firstName, lastName, username, password, email, isAdmin } = user;
    onSave({ id , firstName, lastName, username, password, email, isAdmin, ccType, ccNum, ccExp, ccSec });
  } // i'm just testing this will work, will dry out later

  render() {
    const fields = {
      ccType: 'Credit Card Type',
      ccNum: 'Credit Card Number',
      ccExp: 'Expiration',
      ccSec: 'Security Code',
    }
    const { onSave, onChange, removeCard } = this;
    const { ccType } = this.state;
    const buttonMessage = ccType ? 'Submit Payment' : 'Submit with New Card'
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
        <button onClick={onSave}>{buttonMessage}</button>
        { ccType ? <button onClick={removeCard}>Remove Card</button> : null }
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
