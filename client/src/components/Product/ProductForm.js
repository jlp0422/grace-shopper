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
    let value;
    if(ev.target.name === 'name' || ev.target.name === 'imageUrl' || ev.target.name === 'description') {
      value = ev.target.value;
    } else {
      value = ev.target.value * 1;
    }
    // change[ev.target.name] = value;
    // const val = ev.target.value;
    console.log(value, typeof value)
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
            className='form-control'
            placeholder='Product Name'
            name='name'
            value={name}
            onChange={handleChange}
            style={{marginBottom: '10px'}}
          />
          <input
            type='number'
            // step='1'
            className='form-control'
            placeholder='Price'
            name='price'
            value={price}
            onChange={handleChange}
            style={{ marginBottom: '10px' }}
          />
          <input
            type='number'
            // step='1'
            className='form-control'
            placeholder='Quantity'
            name='quantity'
            value={quantity}
            onChange={handleChange}
            style={{ marginBottom: '10px' }}
          />
          <input
            className='form-control'
            placeholder='Add Image URL'
            name='imageUrl'
            value={imageUrl}
            onChange={handleChange}
            style={{ marginBottom: '10px' }}
          />
          <textarea
            className='form-control'
            placeholder='Description'
            name='description'
            value={description}
            onChange={handleChange}
            style={{ marginBottom: '10px' }}
          />
          <select
            onChange={handleChange}
            name='categoryId'
            className='form-control'
            style={{ marginBottom: '10px' }}
          >
            <option value='null'>Select Category</option>
            {
              categories.map(category => (
                <option key={category.id} value={category.id * 1}/* selected={category.id === categoryId}*/>
                  {category.name}
                </option>
              ))
            }
          </select>
          <button style={{ marginBottom: '10px' }} className='btn btn-primary'>Submit</button>
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
