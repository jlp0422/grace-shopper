import React from 'react';
import { connect } from 'react-redux';
import UserNav from './UserNav';
import { Helmet } from 'react-helmet';

const UserAccount = ({ totalOrders, totalReviews, savedAddresses, user }) => {
  return (
    <div>
      {user.firstName && <Helmet><title>{user.firstName}'s Account | J²A</title></Helmet> }
      <UserNav user={ user } />
      <h2>My Account</h2>
      <h4>Total Orders: {totalOrders}</h4>
      <h4>Saved Addresses: { savedAddresses }</h4>
      <h4>Total Reviews: { totalReviews }</h4>
    </div>
  )
}

const mapState = ({ orders, reviews, addresses, user }, { id }) => {
  const totalOrders = orders.filter(order => order.userId === id && order.status !== 'cart').length;
  const totalReviews = reviews.filter(review => review.userId === id).length;
  const savedAddresses = addresses.filter(address => address.userId === id).length;
  return { totalOrders, totalReviews, savedAddresses, user }
}

export default connect(mapState)(UserAccount)
