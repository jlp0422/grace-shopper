// import React, { Component } from 'react';
// import { withRouter, Link } from 'react-router-dom';
// import { connect } from 'react-redux';
// import { createCreditCardOnServer } from '../../store';

// class CreditCardForm extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       ccType: '',
//       ccNum: '',
//       ccExp: '',
//       ccSec: '',
//       errors: {}
//     }
//     this.onChange = this.onChange.bind(this);
//     this.onSave = this.onSave.bind(this);
//     this.validators = {
//       ccType: (value) => {
//         if(!value) {
//           return 'Please enter the type of Credit Card you are using'
//         }
//       },
//       ccNum: (value) => {
//         if(value.length !== 16 && typeof value * 1 !== 'number') {
//           return 'Please enter a valid Credit Card Number'
//         }
//       },
//       ccExp: (value) => {
//         const msg = 'Please enter your cards expiration MM/YYYY';
//         if(value.indexOf('/') === -1) {
//           return msg;
//         }
//         const month = value.split('/')[0] * 1;
//         const year = value.split('/')[1] * 1;
//         if(month <= 0 || month > 12 || year <= 2017 || year > 2030) {
//           return msg;
//         }
//       },
//       ccSec: (value) => {
//         if(value * 1 < 100 || value * 1 > 999) {
//           return 'Please enter your security code'
//         }
//       },
//     }
//   }

//   onChange(ev) {
//     const { name, value } = ev.target
//     const change = {}
//     change[name] = value;
//     this.setState(change);
//   }

//   onSave(ev) {
//     ev.preventDefault();
//     const errors = Object.keys(this.validators).reduce((memo, key) => {
//       const validator = this.validators[key];
//       const value = this.state[key];
//       const error = validator(value);
//       if(error) {
//         memo[key] = error
//       }
//       return memo;
//     }, {})
//     this.setState({ errors })
//     if(Object.keys(errors).length) {
//       return;
//     }
//     const { onSave, userId } = this.props;
//     const { ccType, ccNum, ccExp, ccSec } = this.state;
//     onSave({ ccType, ccNum, ccExp, ccSec, userId });
//     this.setState({ ccType: '', ccNum: '', ccExp: '', ccSec: '' });
//   }

//   render() {
//     const fields = {
//       ccNum: 'Credit Card Number',
//       ccExp: 'Expiration MM/YYYY',
//       ccSec: 'Security Code',
//     }
//     const cardTypes = ['VISA', 'DISCOVER', 'MASTERCARD', 'AMEX'];
//     const { onSave, onChange, removeCard } = this;
//     const { userId } = this.props;
//     const { ccType, ccNum, ccExp, ccSec, errors } = this.state;
//     return (
//       <div>
//         <h4>Add New Card</h4>
//         <div>
//           <select className={`form-control margin-b-10${errors.ccType ? ' is-invalid' : null }`} onChange={onChange} name='ccType'>
//             <option>Select Card Type</option>
//             {
//               cardTypes.map((type, index) => (
//                 <option key={index} value={type}>
//                   {type}
//                 </option>
//               ))
//             }
//           </select>
//           { errors.ccType && <div className='help-block'>{errors.ccType}</div>}
//           {
//             Object.keys(fields).map(field => (
//               <div key={field}>
//                 <input
//                   className={`form-control margin-b-10${errors[field] ? ' is-invalid' : null }`}
//                   placeholder={`${fields[field]}`}
//                   name={field}
//                   style={{ marginBottom: '10px' }}
//                   value={this.state[field]}
//                   onChange={onChange}
//                 />
//                 { errors[field] && <div className='help-block'>{errors[field]}</div>}
//               </div>
//             ))
//           }
//         </div>
//         <button onClick={onSave} className="btn btn-success">Save</button>
//       </div>
//     );
//   }
// }

// const mapState = ( state, { userId }) => {
//   return { userId }
// }

// const mapDispatch = (dispatch, { location }) => {
//   const { orderId, page } = location
//   return {
//     onSave: (creditCard) => dispatch(createCreditCardOnServer(creditCard, page, orderId))
//   }
// }

// export default withRouter(connect(mapState, mapDispatch)(CreditCardForm));
