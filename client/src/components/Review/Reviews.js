import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { starRating } from '../../store/reusableFunctions';

const Reviews = (props) => {
  const { product, products, productReviews, userReviews, users, page } = props;
  if(page === 'product') {
    if (!product) return null
    return (
      <div>
        <Link to={`/products/${product.id}`}><h3>{product.name}: Reviews</h3></Link>
        {
          productReviews.map(review => {
            const user = users.find(user => user.id === review.userId);
            return (
              <div key={review.id} style={{ backgroundColor: '#f0f3f8', padding:'15px', margin: '15px' }}>
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
        <h3>My Reviews</h3>
        {
          userReviews.map(review => {
            const product = products.find(product => product.id === review.productId);
            return (
              <div key={review.id} style={{ backgroundColor: '#f0f3f8', padding:'15px', margin: '15px' }}>
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

const mapState = ({ products, reviews, users }, { id, page }) => {
  const product = products && products.find(product => product.id === id)
  const productReviews = reviews.filter(review => review.productId === id);
  const userReviews = reviews.filter(review => review.userId === id);
  return {
    product,
    products,
    productReviews,
    userReviews,
    users
  }
}

export default connect(mapState)(Reviews);
