/* eslint-disable */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updateUserOnServer, updateLoggedUser } from '../../store';

class UserForm extends Component {
  constructor(props) {
    super(props);
    console.log(props)
    const { user } = props;
    const { id } = user
    this.state = {

      id: id ? user.id : '',
      firstName: id ? user.firstName : '',
      lastName: id ? user.lastName : '',
      isAdmin: id ? user.isAdmin : '',
      username: id ? user.username : '',
      password: id ? user.password : '',
      email: id ? user.email : '',

    }

    this.handleChange = this.handleChange.bind(this);
    this.onSave = this.onSave.bind(this);
  }

  // ------------------------ LIFECYCLE METHODS ------------------------

  componentWillReceiveProps(nextProps) {
    const { user } = nextProps;
    this.setState(user ? user : null);
  }

  // ---------------------------- METHODS ----------------------------

  handleChange(ev) {
    const change = {};
    change[ev.target.name] = ev.target.value;
    this.setState(change);
  }

  onSave(ev) {
    ev.preventDefault();
    const { firstName, lastName, isAdmin, username, password, email, street, city, state, zip } = this.state;
    // const save = { firstName, lastName, isAdmin, username, password, email, street, city, state, zip };
    // this.props.updateUser(save);
    this.props.updateUser(this.state);
    this.props.updateLoggedUser(this.state);
    // this.setState({
    //   firstName: '',
    //   lastName: '',
    //   isAdmin: '',
    //   username: '',
    //   password: '',
    //   email: '',
    //   street: '',
    //   city: '',
    //   state: '',
    //   zip: ''
    // });
  }

  // --------------------------- RENDER -------------------------

  render() {

    // console.log(this.state);

    // const { firstName, lastName, isAdmin, username, password, email, street, city, state, zip } = this.state;
    // const userProps = { firstName, lastName, isAdmin, username, password, email, street, city, state, zip };
    // const { users/*, user*/ } = this.props;
    const { handleChange, onSave } = this;
    const fields = {
      firstName: 'First Name',
      lastName: 'Last Name',
      username: 'Username',
      password: 'Password',
      email: 'Email Address',
      /*street: 'Street', city: 'City', state: 'State', zip: 'Zip Code'*/
    }
    return (
      <div>
        <form onSubmit={onSave}>
          {
            Object.keys(fields).map(field => (
              <div key={field} className=''>
                <label className="font-weight-bold">{fields[field]}</label>
                <input
                  key={field}
                  className='form-control'
                  placeholder={`${fields[field]}`}
                  name={field}
                  value={this.state[field]}
                  onChange={handleChange}
                  style={{ marginBottom: '10px' }}
                />
              </div>
            ))
          }
          <button className='btn btn-primary'>Submit</button>
        </form>
      </div>
    );
  }
}

// const mapState = ({ /*users,*/ user }) => {
//   return {
// //     users,
//     user
//   }
// }

const mapDispatch = (dispatch) => {
  return {
    updateUser: (user) => dispatch(updateUserOnServer(user)),
    updateLoggedUser: (user) => dispatch(updateLoggedUser(user))
  };
};

// export default connect(null, mapDispatch)(UserForm);
