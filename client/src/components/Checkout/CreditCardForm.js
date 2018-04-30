import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updateCreditCardOnServer } from '../../store';

class CreditCardForm extends Component {
  constructor(props) {
    super(props);
    // const { user } = props;
    // const { ccType, ccNum, ccExp, ccSec } = user;

    const { userId } = props;

    this.state = {
      ccType: '',
      ccNum: '',
      ccExp: '',
      ccSec: '',
      userId
    }
    this.onChange = this.onChange.bind(this);
    this.onSave = this.onSave.bind(this);
    // this.removeCard = this.removeCard.bind(this);
  }

  onChange(ev) {
    const change = {}
    change[ev.target.name] = ev.target.value;
    this.setState(change);
  }

  onSave(ev) {
    ev.preventDefault();
    const { onSave } = this.props;
    // const { ccType, ccNum, ccExp, ccSec } = this.state;
    // const { id, firstName, lastName, username, password, email, isAdmin } = user;
    onSave(this.state);
  }

  // removeCard(ev) {
  //   ev.preventDefault();
  //   const { onSave, user } = this.props;
  //   this.setState({ ccType: '', ccNum: '', ccExp: '', ccSec: '' })
  //   const { ccType, ccNum, ccExp, ccSec } = this.state;
    // const { id, firstName, lastName, username, password, email, isAdmin } = user;
  //   onSave({ id , firstName, lastName, username, password, email, isAdmin, ccType, ccNum, ccExp, ccSec });
  // } // i'm just testing this will work, will dry out later

  render() {
    const fields = {
      ccType: 'Credit Card Type',
      ccNum: 'Credit Card Number',
      ccExp: 'Expiration',
      ccSec: 'Security Code',
    }
    const { onSave, onChange, removeCard } = this;
    const { ccType } = this.state;
    // const buttonMessage = ccType ? 'Submit Payment' : 'Submit with New Card'
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
        <button onClick={onSave} className="btn btn-success">Save</button>
      {/*
        { ccType ? <button onClick={removeCard} className="btn btn-danger">Remove Card</button> : null }
      */}
      </div>
    );
  }
}

const mapState = ({ creditCards }, { userId }) => {
  // const userCards = creditCards.filter(card => card.userId === userId);
  return { userId }
}

const mapDispatch = (dispatch) => {
  return {
    onSave: (creditCard) => dispatch(updateCreditCardOnServer(creditCard))
  }
}

export default connect(mapState, mapDispatch)(CreditCardForm);
