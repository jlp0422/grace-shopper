import React from 'react';
import { connect } from 'react-redux';

const Products = (props) => {
  const { products } = props;
  return (
    <div>
      <h2>Products</h2>
      <ul>
        {
          products.map(product => (
            <li key={product.id}>
              {product.name}: ${product.price}/unit
            </li>
          ))
        }
      </ul>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    products: state.products
  }
}

export default connect(mapStateToProps)(Products);
