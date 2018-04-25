import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updateProductOnServer } from '../../store';

class ProductForm extends Component {
  constructor(props) {
    super(props);
    const { product } = props;
    this.state = {
      id: product ? product.id : null,
      name: product ? product.name : '',
      price: product ? product.price : '',
      quantity: product ? product.quantity : '',
      description: product ? product.description : '',
      // categoryId: product ? product.categoryId : null,
    }
    this.handleChange = this.handleChange.bind(this);
    this.onSave = this.onSave.bind(this);
  }

  handleChange(ev) {
    const change = {};
    let value;
    if(ev.target.name === 'name' || ev.target.name === 'imageUrl' || ev.target.name === 'description') {
      value = ev.target.value;
    } else {
      value = ev.target.value * 1;
    }
    change[ev.target.name] = value;
    this.setState(change);
  }

  onSave(ev) {
    ev.preventDefault();
    this.props.updateProduct(this.state);
    this.setState({ name: '', price: '', quantity: '', description: '' });
  }

  render() {
    const { name, price, quantity, /*categoryId, */description, imageUrl } = this.state;
    const { categories } = this.props;
    const { handleChange, onSave } = this;
    return (
      <div>
        <form onSubmit={onSave}>
          <input
            className='form-control margin-b-10'
            placeholder='Product Name'
            name='name'
            value={name}
            onChange={handleChange}
          />
          <input
            type='number'
            className='form-control margin-b-10'
            placeholder='Price'
            name='price'
            value={price}
            onChange={handleChange}
          />
          <input
            type='number'
            className='form-control margin-b-10'
            placeholder='Quantity'
            name='quantity'
            value={quantity}
            onChange={handleChange}
          />
          <input
            className='form-control margin-b-10'
            placeholder='Add Image URL'
            name='imageUrl'
            value={imageUrl}
            onChange={handleChange}
          />
          <textarea
            className='form-control margin-b-10'
            placeholder='Description'
            name='description'
            value={description}
            onChange={handleChange}
          />
          <h4>Select Categories</h4>
          {
            categories.map(category => (
              <div key={category.id}>
                <input type='checkbox' value={category.id} name='categoryId' />
                <label>&nbsp;{category.name}</label>
              </div>
            ))
          }
          {/*<select
            onChange={handleChange}
            name='categoryId'
            className='form-control margin-b-10'
          >
            <option value='null'>Select Category</option>
            {
              categories.map(category => (
                <option key={category.id} value={category.id * 1}>
                  {category.name}
                </option>
              ))
            }
          </select>*/}
          <button className='btn btn-primary margin-b-10'>Create</button>
        </form>
      </div>
    );
  }
}

const mapState = ({ categories }) => {
  return {
    categories
  };
};

const mapDispatch = (dispatch) => {
  return {
    updateProduct: (product) => dispatch(updateProductOnServer(product))
  };
};

export default connect(mapState, mapDispatch)(ProductForm);
