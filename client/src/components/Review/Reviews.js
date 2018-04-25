import React from 'react';
import { connect } from 'react-redux';

const Reviews = (props) => {
  // console.log(props);


  const { product, reviews, users } = props;

  if(!product) {
    return null;
  }

  return (
    <div>
      <h3>{product.name}: Reviews</h3>
      {
        reviews.map(review => {
          const user = users.find(user => user.id === review.userId);
          return (
            <div key={review.id} style={{ backgroundColor: 'lightgrey' }}>
              <h4>{user.username}'s Review: {review.rating} Stars</h4>
              <p>{review.description}</p>
            </div>
          )
        })
      }
    </div>
  );
}

const mapState = ({ products, reviews, users }, { match }) => {
  const id = match.params.id * 1;
  const product = products.find(product => product.id === id);
  const ownReviews = reviews.filter(review => review.productId === id);
  return {
    product,
    reviews: ownReviews,
    users
  }
}

export default connect(mapState)(Reviews);
