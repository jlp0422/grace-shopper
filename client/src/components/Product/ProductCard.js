import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

const UserCard = (props) => {
  const { product, category } = props;
  return (
    <div>
      <Link to={`/products/${product.id}`}>
        <h4>{product.name}</h4>
      </Link>
      <div>Price: {product.price}</div>
      <div>Quantity: {product.quantity}</div>
      <div>Category: {category ? category.name : 'No Category'}</div>
    </div>
  );
}

const mapState = ({ categories }, { product }) => {
  const category = categories.find(_category => _category.id === product.categoryId);
  return {
    category
  }
}

export default connect(mapState)(UserCard);
