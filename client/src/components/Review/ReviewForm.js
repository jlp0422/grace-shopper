import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import { createReviewOnServer } from '../../store';

class ReviewForm extends Component {
  constructor(props) {
    super(props);
    const { userId, productId, rating } = props;
    this.state = {
      userId: userId ? userId : '',
      productId: productId ? productId : '',
      rating: '',
      description: ''
    }
    this.handleChange = this.handleChange.bind(this);
    this.onSave = this.onSave.bind(this);
  }

  handleChange(ev) {
    const change = {};
    const value = ev.target.name === 'rating' ? ev.target.value * 1 : ev.target.value;
    change[ev.target.name] = value;
    this.setState(change);
  }

  onSave(ev) {
    ev.preventDefault();
    this.props.onSave(this.state);
    this.setState({ rating: '', description: '' });
  }


  render() {
    const { handleChange, onSave } = this;
    return (
      <div>
        <h3>Rate this product!</h3>
        <form onSubmit={onSave}>
          <select className='form-control margin-b-10' name='rating' onChange={handleChange}>
            <option>Select Rating</option>
            {
              [0, 1, 2, 3, 4, 5].map(rating => (
                <option key={rating} value={rating}>
                  {rating}
                </option>
              ))
            }
          </select>
          <textarea
            name='description'
            className='form-control margin-b-10'
            placeholder='How did you like this product?'
            onChange={handleChange}
          />
          <button className='btn btn-primary'>Submit Review</button>
        </form>
      </div>
    );
  }
}

const mapState = ({user}, ownProps) => {
  const { productId } = ownProps;
  const userId = user.id;
  return {
    userId,
    productId
  }
}

const mapDispatch = (dispatch) => {
  return {
    onSave: (review) => dispatch(createReviewOnServer(review))
  }
}

export default withRouter(connect(mapState, mapDispatch)(ReviewForm));
