import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { deleteProductFromServer } from '../../store';

import ProductForm from './ProductForm';
import ReviewForm from '../Review/ReviewForm';

const ProductInfo = (props) => {
  const { product, deleteProduct, loggedIn, isAdmin, rating, reviewers, isOrAre, makeSingular } = props;

  // console.log(rating);

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
    </div>
    <h4>Current Rating: {rating}</h4>
    <h5>There {isOrAre} ({reviewers}) review{makeSingular} on this product</h5>
    <h6>Click here for all reviews (make link)</h6>
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
  const reviewers = ownReviews.length;

  const isOrAre = reviewers === 1 ? 'is' : 'are';
  const makeSingular = reviewers === 1 ? '' : 's';

  // console.log('Reviews:', ownReviews)

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
    reviewers,
    isOrAre,
    makeSingular
  }
}

const mapDispatch = (dispatch) => {
  return {
    deleteProduct: (productId) => dispatch(deleteProductFromServer(productId))
  }
}

export default connect(mapState, mapDispatch)(ProductInfo);
