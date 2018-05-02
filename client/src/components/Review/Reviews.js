import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { starRating } from '../../store/reusableFunctions';
import UserNav from '../User/UserNav';

const Reviews = (props) => {
  const { product, products, productReviews, userReviews, users, page, user } = props;
  if(page === 'product') {
    if (!product) return null
    return (
      <div>
        <Link to={`/products/${product.id}`}><h3>{product.name}: Reviews</h3></Link>
        {
          productReviews.map(review => {
            const user = users.find(user => user.id === review.userId);
            return (
              <div key={review.id} className='review-card'>
                <h4>
                  {
                    user.username} {review.rating ? (
                      starRating(review.rating, 'stars-small')
                    ) : '(0 stars)'
                  }
                </h4>
                <p>{review.description}</p>
              </div>
            )
          })
        }
      </div>
    );
  }

  if(page === 'user') {
    return (
      <div>
        <UserNav user={user} />
        <h2>My Reviews</h2>
        {
          userReviews.map(review => {
            const product = products.find(product => product.id === review.productId);
            return (
              <div key={review.id}  className='review-card'>
                <Link to={`/products/${product.id}/reviews`}>
                  <h4>
                  {
                    product.name} {review.rating ? (
                      starRating(review.rating, 'stars-small')
                    ) : '(0 stars)'
                  }
                  </h4>
                </Link>
                <p>{review.description}</p>
              </div>
            )
          })
        }
      </div>
    );
  }


}

const mapState = ({ products, reviews, users, user }, { id, page }) => {
  const product = products && products.find(product => product.id === id)
  const productReviews = reviews.filter(review => review.productId === id);
  const userReviews = reviews.filter(review => review.userId === id);
  return {
    product,
    products,
    productReviews,
    userReviews,
    users,
    user
  }
}

export default connect(mapState)(Reviews);
