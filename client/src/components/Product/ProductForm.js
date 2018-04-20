import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updateProductOnServer } from '../../store';

class ProductForm extends Component {
  constructor(props) {
    super(props);
    // const { name, price, quantity, categoryId } = props;
    this.state = {
      name: '',
      price: '',
      quantity: '',
      categoryId: null
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
  }

  render() {
    console.log(this.state);
    const { name, price, quantity } = this.state;
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
          <select onChange={handleChange} name='categoryId'>
            <option value='null'>Select Category</option>
            {
              categories.map(category => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))
            }
          </select>
          <button>Submit</button>
        </form>
      </div>
    );
  }
}

const mapState = ({ categories }) => {
  return {
    categories
  }
}

const mapDispatch = (dispatch) => {
  return {
    updateProduct: (product) => dispatch(updateProductOnServer(product))
  }
}

export default connect(mapState, mapDispatch)(ProductForm);
