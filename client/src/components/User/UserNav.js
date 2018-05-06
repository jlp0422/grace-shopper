/* eslint-disable */
import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

const UserAccount = ({ user, loggedIn }) => {
  const url = location.hash.substring(11)
  const { id } = user
  return (
    <div>
      <h1>My Account</h1>
      <h2>{user.firstName} {user.lastName}</h2>
      <div className="account-nav">
        <Link className={`user-nav${ url === '/cart' ? ('-active') : '' }`} to={ loggedIn ? `/users/${id}/cart` : `/cart` }>
          Cart
        </Link>
        { loggedIn && <Link className={`user-nav${url === '/orders' ? ('-active') : ''}`} to={`/users/${id}/orders`}>
          Orders
        </Link> }
        { loggedIn && <Link className={`user-nav${url === '/addresses' ? ('-active') : ''}`} to={`/users/${id}/addresses`}>
          Addresses
        </Link> }
        { loggedIn && <Link className={`user-nav${url === '/reviews' ? ('-active') : ''}`} to={`/users/${id}/reviews`}>
          Reviews
        </Link> }
        { loggedIn && <Link className={`user-nav${url === '/creditcards' ? ('-active') : ''}`} to={`/users/${id}/creditcards`}>
          Credit Cards
        </Link> }
        { loggedIn && <Link className={`user-nav${url === '/edit' ? ('-active') : ''}`}to={`/users/${id}/edit`}>
          Edit Account
        </Link> }
      </div>
    </div>
  )
}

const mapState = ({ user }) => {
  const loggedIn = !!user.id
  return { user, loggedIn }
}

export default connect(mapState)(UserAccount);
