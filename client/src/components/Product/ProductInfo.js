import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { deleteProductFromServer } from '../../store';

import ProductForm from './ProductForm';
import LineItemForm from './LineItemForm';

const ProductInfo = (props) => {
  const { product, deleteProduct, loggedIn, isAdmin, rating, reviewCount, makeSingular } = props;
  if (!product) {
    return null;
  }
  return (    
    <div>
    <div className='row'>
      <h3>{product.name}</h3>
    </div>
    <div className='row'>
      <div className='col'>
        <img src={product.imageUrl} />
      </div>
      <div className='col'>
        <p>{product.description}</p>
        <p>Price: ${product.price}</p>
        <p>Units Available: {product.quantity}</p>
      </div>
      <LineItemForm productId={product.id} orderId ='' userId= '' />
    </div>
    <h4>Current Rating: {rating}</h4>
    <h5>There {makeSingular[0]} ({reviewCount}) review{makeSingular[1]} on this product</h5>
    <Link to={`/products/${product.id}/reviews`}>
      <h6>Click here for all reviews</h6>
    </Link>
      {
        loggedIn ? (
          <ReviewForm productId={product.id} />
        ) : null
      }
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

const mapState = ({ products, user, reviews }, { match }) => {
  const id = match.params.id * 1;
  const product = products.find(_product => _product.id === id);
  const loggedIn = !!Object.keys(user).length;
  const { isAdmin } = user;
  const ownReviews = reviews.filter(review => review.productId === id)
  const reviewCount = ownReviews.length;
  const makeSingular = reviewCount === 1 ? [ 'is', '' ] : [ 'are' ,'s' ];
  const rating = ownReviews.reduce((memo, review, index, array) => {
    memo += review.rating;
    if(index === array.length - 1) {
      return Math.round(memo / array.length);
    } else {
      return memo;
    }
  }, 0);

  return {
    product,
    loggedIn,
    isAdmin,
    rating,
    reviewCount,
    makeSingular
  }
}

const mapDispatch = (dispatch) => {
  return {
    deleteProduct: (productId) => dispatch(deleteProductFromServer(productId))
  }
}

export default connect(mapState, mapDispatch)(ProductInfo);
