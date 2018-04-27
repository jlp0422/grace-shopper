import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updateProductOnServer, updateProductCategoryOnServer } from '../../store';

class ProductForm extends Component {
  constructor(props) {
    super(props);
    const { product, productCategories } = props; // only getting product on info page passed from props
    const categoryArray = product ? productCategories.filter(association => {
      return association.productId === product.id;
    })
    .map(association => {
      return association.categoryId;
    }) : []

    // console.log(categoryArray)

    this.state = {
      id: product ? product.id : null,
      name: product ? product.name : '',
      price: product ? product.price : '',
      quantity: product ? product.quantity : '',
      imageUrl: product ? product.imageUrl : '',
      description: product ? product.description : '',
      categoryArray: product ? categoryArray : [],
    }
    this.handleChange = this.handleChange.bind(this);
    this.onSave = this.onSave.bind(this);
  }

  handleChange(ev) {
    const change = {};
    const arr = this.state.categoryArray;
    let value;
    if(ev.target.name === 'categoryArray') {
      value = ev.target.value * 1;
      return this.setState({
        categoryArray:
          arr.includes(value) ? arr.filter(id => id !== value) : [ ...arr, value ]
        })
    } else if(ev.target.name === 'name' || ev.target.name === 'imageUrl' || ev.target.name === 'description') {
      value = ev.target.value;
    } else {
      value = ev.target.value * 1;
    }
    change[ev.target.name] = value;
    this.setState(change);
  }

  onSave(ev) {
    ev.preventDefault();
    const { id, name, price, quantity, description } = this.state;
    this.props.updateProduct({ id, name,price, quantity, description });
    this.setState({ name: '', price: '', quantity: '', description: '' });
  }

  render() {
    const { name, price, quantity, description, imageUrl } = this.state;
    const { categories } = this.props;
    const { handleChange, onSave } = this;

    console.log(this.state.categoryArray)

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
                <input type='checkbox' value={category.id} name='categoryArray' onChange={handleChange} />
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

const mapState = ({ categories, productCategories }, { product }) => {
  // console.log('PF:', productCategories)
  return {
    categories,
    productCategories
    // product
  };
};

const mapDispatch = (dispatch) => {
  return {
    updateProduct: (product) => dispatch(updateProductOnServer(product))
  };
};

export default connect(mapState, mapDispatch)(ProductForm);
