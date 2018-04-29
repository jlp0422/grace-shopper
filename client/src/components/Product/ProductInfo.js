import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { deleteProductFromServer } from '../../store';
import { starRating } from '../../store/reusableFunctions';

import ProductForm from './ProductForm';
import LineItemForm from './LineItemForm';
import ReviewForm from '../Review/ReviewForm';

const ProductInfo = (props) => {
  const { product, deleteProduct, loggedIn, isAdmin, rating, reviewCount, makeSingular, activeOrder } = props;
  const displayRating = rating ? starRating(rating, 'stars-large') : 'This product has a rating of Zero :('
  if (!product) return null;
  if (!activeOrder) return null;
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

      <LineItemForm orderId={activeOrder.id} productId={product.id} />

    </div>
    { displayRating }
    <h5 style={{display:'inline'}}>There {makeSingular[0]} ({reviewCount}) review{makeSingular[1]} on this product</h5>
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

const mapState = ({ products, user, reviews, orders }, { match }) => {
  const id = match.params.id * 1;
  const product = products.find(_product => _product.id === id);
  const loggedIn = !!user.id;
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
  const activeOrder = orders.find(order => order.userId === user.id && order.isActive)
  console.log(activeOrder)
  return {
    product,
    loggedIn,
    isAdmin,
    rating,
    reviewCount,
    makeSingular,
    activeOrder
  }
}

const mapDispatch = (dispatch) => {
  return {
    deleteProduct: (productId) => dispatch(deleteProductFromServer(productId))
  }
}

export default connect(mapState, mapDispatch)(ProductInfo);
