import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import ProductCard from './ProductCard';
import ProductForm from './ProductForm';

const Products = (props) => {
  const { products, loggedIn, isAdmin } = props;
  return (
    <div>
      <h2>Products</h2>
      { loggedIn && isAdmin ? (
        <div>
          <Link to='/products/create'>
            <button className="btn btn-primary">Create new product</button>
          </Link>
        </div>
      ) : null }
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

const mapState = ({ products, user, productCategories }) => {
  const { isAdmin } = user;
  const loggedIn = !!Object.keys(user).length;
  return {
    products,
    isAdmin,
    loggedIn,
  };
};

export default connect(mapState)(Products);
