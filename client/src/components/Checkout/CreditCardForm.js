import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createCreditCardOnServer } from '../../store';

class CreditCardForm extends Component {
  constructor(props) {
    super(props);
    // const { user } = props;
    // const { ccType, ccNum, ccExp, ccSec } = user;

    // const { userId } = props;

    // console.log(userId)

    this.state = {
      ccType: '',
      ccNum: '',
      ccExp: '',
      ccSec: '',
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
    const { onSave, userId } = this.props;
    const { ccType, ccNum, ccExp, ccSec } = this.state;
    // const { id, firstName, lastName, username, password, email, isAdmin } = user;
    onSave({ ccType, ccNum, ccExp, ccSec, userId });
    this.setState({ ccType: '', ccNum: '', ccExp: '', ccSec: '' });
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
    // const { ccType } = this.state;
    // const buttonMessage = ccType ? 'Submit Payment' : 'Submit with New Card'
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
      {/*
        { ccType ? <button onClick={removeCard} className="btn btn-danger">Remove Card</button> : null }
      */}
      </div>
    );
  }
}

const mapState = ( state, { userId }) => {
  // console.log(userId)
  return { userId }
}

const mapDispatch = (dispatch) => {
  return {
    onSave: (creditCard) => dispatch(createCreditCardOnServer(creditCard))
  }
}

export default connect(mapState, mapDispatch)(CreditCardForm);
