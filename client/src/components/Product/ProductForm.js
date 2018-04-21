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
      categoryId: product ? product.categoryId : null,
    }
    this.handleChange = this.handleChange.bind(this);
    this.onSave = this.onSave.bind(this);
  }

  handleChange(ev) {
    const change = {};
    const value = ev.target.value;
    change[ev.target.name] = ev.target.name === 'name' ? value : value * 1;
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
            className='form-control'
            placeholder='Product Name'
            name='name'
            value={name}
            onChange={handleChange}
          />
          <input
            className='form-control'
            placeholder='Price'
            name='price'
            value={price}
            onChange={handleChange}
          />
          <input
            className='form-control'
            placeholder='Quantity'
            name='quantity'
            value={quantity}
            onChange={handleChange}
          />
          <input
            className='form-control'
            placeholder='Add Image URL'
            name='imageUrl'
            value={imageUrl}
            onChange={handleChange}
          />
          <textarea
            className='form-control'
            placeholder='Description'
            name='description'
            value={description}
            onChange={handleChange}
          />
          <select
            onChange={handleChange}
            name='categoryId'
            className='form-control'
          >
            <option value='null'>Select Category</option>
            {
              categories.map(category => (
                <option key={category.id} value={category.id}/* selected={category.id === categoryId}*/>
                  {category.name}
                </option>
              ))
            }
          </select>
          <button className='btn btn-primary'>Submit</button>
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
