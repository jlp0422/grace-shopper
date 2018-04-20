import React from 'react';
import { connect } from 'react-redux';

import ProductCard from './ProductCard';
import ProductForm from './ProductForm';

const Products = (props) => {
  const { products } = props;
  return (
    <div>
      <h2>Products</h2>
      <ProductForm />
      <ul className='list-group'>
        {
          products.map(product => (
            <li key={product.id} className='list-group-item'>
              <ProductCard product={product} />
            </li>
          ))
        }
      </ul>
    </div>
  );
}

const mapStateToProps = ({ products}) => {
  return {
    products
  }
}

export default connect(mapStateToProps)(Products);
