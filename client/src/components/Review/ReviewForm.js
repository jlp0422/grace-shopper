import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

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

  }


  render() {
    console.log(this.state)
    const { handleChange, onSave } = this;
    return (
      <div>
        <h3>Rate this product!</h3>
        <form>
          <select className='form-control' name='rating' onChange={handleChange}>
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
            className='form-control'
            placeholder='How did you like this product?'
            onChange={handleChange}
          />
        </form>
      </div>
    );
  }
}

const mapState = ({user}, ownProps) => {
  console.log('ownProps:', ownProps)
  const productId = ownProps.productId
  const userId = user.id;
  return {
    userId,
    productId
  }
}

const mapDispatch = (dispatch) => {
  return {
    // onSave: () => dispatch()
  }
}

export default withRouter(connect(mapState, mapDispatch)(ReviewForm));
