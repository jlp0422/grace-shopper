import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

class UserCard extends Component {
  constructor() {
    super();
  }

  render() {
    const { product, category } = this.props;
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

}

const mapState = ({ categories }, { match, product }) => {
  // console.log(product)
  // const id = match.params.id * 1;
  const category = categories.find(category => category.id === product.categoryId);
  return {
    category
  }
}

export default connect(mapState)(UserCard);
