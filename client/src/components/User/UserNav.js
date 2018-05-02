/* eslint-disable */
import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

const UserAccount = ({ user }) => {
  console.log(location)
  // console.log(location.hash.slice(11))
  const { id } = user
  if (!user) return null
  return (
    <div>
      <h1>My Account</h1>
      <h2>{user.firstName} {user.lastName}</h2>
      <div className="account-nav">
        <Link to={`/users/${id}/cart`}>
          My Cart
        </Link>
        <Link to={`/users/${id}/orders`}>
          My Orders
        </Link>
        <Link to={`/users/${id}/addresses`}>
          My Addresses
        </Link>
        <Link to={`/users/${id}/reviews`}>
          My Reviews
        </Link>
        <Link to={`/users/${id}/creditcards`}>
          My Credit Cards
        </Link>
        <Link to={`/users/${id}/edit`}>
          Edit Account
        </Link>
      </div>
    </div>
  )
}

const mapState = ({ user }) => {
  return { user }
}

export default connect(mapState)(UserAccount);
