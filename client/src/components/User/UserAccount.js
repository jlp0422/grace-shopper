import React from 'react';
import { connect } from 'react-redux';

const UserAccount = ({ totalOrders, totalReviews, savedAddresses }) => {
  return (
    <div>
      <h2>My Account</h2>
      <h4>Total Orders: {totalOrders}</h4>
      <h4>Saved Addresses: { savedAddresses }</h4>
      <h4>Total Reviews: { totalReviews }</h4>
    </div>
  )
}

const mapState = ({ orders, reviews, addresses }, { id }) => {
  const totalOrders = orders.filter(order => order.userId === id && !order.isActive).length;
  const totalReviews = reviews.filter(review => review.userId === id).length;
  const savedAddresses = addresses.filter(address => address.userId === id).length;
  return { totalOrders, totalReviews, savedAddresses }
}

export default connect(mapState)(UserAccount)
