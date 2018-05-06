import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { deleteUserOnServer } from '../../store'

class Users extends React.Component {
  constructor() {
    super()
    this.state = {
      name: '',
      startIndex: 0,
      endIndex: 15
    }
    this.onChange = this.onChange.bind(this)
    this.onPreviousPage = this.onPreviousPage.bind(this)
    this.onNextPage = this.onNextPage.bind(this)
  }

  onChange(ev) {
    this.setState({ name: ev.target.value, startIndex: 0, endIndex: 15 })
  }

  onPreviousPage() {
    const { startIndex, endIndex } = this.state
    this.setState({ startIndex: startIndex - 15, endIndex: endIndex - 15 })
  }

  onNextPage() {
    const { startIndex, endIndex } = this.state
    this.setState({ startIndex: startIndex + 15, endIndex: endIndex + 15 })
  }

  render() {
    const { users, deleteUser } = this.props
    const { startIndex, endIndex, name } = this.state
    const { onChange, onNextPage, onPreviousPage } = this
    const matchingUsers = users.reduce((memo, user )=> {
      const lowerFirst = user.firstName.toLowerCase()
      const lowerLast = user.lastName.toLowerCase()
      const lowerName = name.toLowerCase()
      if (lowerFirst.match(lowerName) || lowerLast.match(lowerName)) memo.push(user)
      return memo
    }, [])
    const usersToShow = matchingUsers.reduce((memo, user, index) => {
      if (index < endIndex && index >= startIndex) memo.push(user)
      return memo
    }, [])
    const currentPage = endIndex / 15
    const lastPage = Math.ceil(matchingUsers.length / 15)
    return (
      <div>
        <h2>Users</h2>
        <input onChange={ onChange } value={ name } className="form-control margin-b-10" placeholder="Search for a user" />
        <ul className='list-group'>
          {
            usersToShow.map(user => (
              <li key={user.id} className='list-group-item'>
                <h5>{`${user.firstName} ${user.lastName}`}</h5>
                <Link to={`/admin/users/${user.id}/orders`}><h6>View order history</h6></Link>
                <Link to={`/admin/users/${user.id}`}><button className="btn btn-outline-success">Edit user</button></Link>
                <button onClick={() => deleteUser(user.id)} className="btn btn-outline-danger">Delete user</button>
              </li>
            ))
          }
        </ul>
        <div className="product-buttons">
          <button disabled={ startIndex < 15 } className="btn btn-outline-info prev-btn" onClick={ onPreviousPage }>Previous</button>
          <button disabled className="btn btn-info">Page { currentPage } / { lastPage ? lastPage : 1 }</button>
          <button disabled={ endIndex >= matchingUsers.length } className=" btn btn-outline-info next-btn" onClick={ onNextPage }>Next</button>
        </div>
      </div>
    );
  }
}

const mapState = ({ users }) => {
  return { users }
}

const mapDispatch = (dispatch) => {
  return {
    deleteUser: (id) => dispatch(deleteUserOnServer(id))
  }
}

export default connect(mapState, mapDispatch)(Users);
