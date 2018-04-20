import React from 'react';
import { connect } from 'react-redux';

import { deleteProductFromServer } from '../../store';

import ProductForm from './ProductForm';

const ProductInfo = (props) => {
  const { product, deleteProduct } = props;
  if (!product) {
    return null;
  }
  return (
    <div>
      <h3>{product.name}</h3>
      <ProductForm product={product} />
      <button onClick={() => deleteProduct(product.id)}>Delete Product</button>
    </div>
  );
}


const mapState = ({ products }, { match }) => {
  const id = match.params.id * 1;
  const product = products.find(_product => _product.id === id);
  return {
    product
  }
}

const mapDispatch = (dispatch) => {
  return {
    deleteProduct: (productId) => dispatch(deleteProductFromServer(productId))
  }
}

export default connect(mapState, mapDispatch)(ProductInfo);
