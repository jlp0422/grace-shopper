import React, { Component } from 'react';
import { connect } from 'react-redux';

class PaymentForm extends Component {
  constructor() {
    super();
    this.state = {
      ccType: '',
      ccNum: '',
      ccExp: '',
      ccSec: '',
    }
    // this.onChange = this.onChange.bind(this);
    // this.onSave = this.onSave.bind(this);
  }

  // onChange(ev) {

  // }

  render() {
    const fields = {
      ccType: 'Credit Card Type',
      ccNum: 'Credit Card Number',
      ccExp: 'Expiration',
      ccSec: 'Security Code',
    }

    return (
      <div>
        <h4> Payment Details </h4>
        <form>
          {
            Object.keys(fields).map(field => (
              <input
                key={field}
                className='form-control margin-b-10'
                placeholder={`${fields[field]}`}
                name={field}
                style={{ marginBottom: '10px' }}
                value={this.state[field]}
              />
            ))
          }
        </form>
      </div>
    );
  }
}

const mapDispatch = (dispatch) => {
  return {

  }
}

export default connect(null, mapDispatch)(PaymentForm);
