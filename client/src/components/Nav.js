import React from 'react';
import { connect } from 'react-redux'

const Nav = ({ categories, products, users, orders }) => {
  return (
    <hr />
  )
}

const mapState = ({ categories, products, users, orders}) => {
  return { categories, products, users, orders }
}

export default connect(mapState)(Nav);
