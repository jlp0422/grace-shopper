import React from 'react';
import { connect } from 'react-redux';
import { deleteProductFromServer } from '../../store';

import ProductForm from './ProductForm';
import LineItemForm from './LineItemForm';

const ProductInfo = (props) => {
  const { product, deleteProduct, loggedIn, isAdmin } = props;
  if (!product) {
    return null;
  }
  return (
    <div>
    <div className='row'>
      <h3>{product.name}</h3>
      <div className='col'>
        <img src={product.imageUrl} />
      </div>
      <div className='col'>
        <p>{product.description}</p>
        <p>Price: ${product.price}</p>
        <p>Units Available: {product.quantity}</p>
      </div>
      <LineItemForm productId={product.id} orderId ='' />
    </div>
      {
        loggedIn && isAdmin ? (
        <div>
          <ProductForm product={product} />
          <button onClick={() => deleteProduct(product.id)} className='btn btn-danger'>Delete Product</button>
        </div>
        ) : null
      }
    </div>
  );
}

const mapState = ({ products, user }, { match }) => {
  const id = match.params.id * 1;
  const product = products.find(_product => _product.id === id);
  const loggedIn = !!Object.keys(user).length;
  const { isAdmin } = user;
  return {
    product,
    loggedIn,
    isAdmin
  }
}

const mapDispatch = (dispatch) => {
  return {
    deleteProduct: (productId) => dispatch(deleteProductFromServer(productId))
  }
}

export default connect(mapState, mapDispatch)(ProductInfo);
