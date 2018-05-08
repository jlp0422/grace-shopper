import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updateProductOnServer, updateProductCategoryOnServer, getProductCategoriesFromServer } from '../../store';

class ProductForm extends Component {
  constructor(props) {
    super(props);
    const { product, productCategories } = props; // only getting product on info page passed from props
    const categoryArray = product ? productCategories.filter(association => {
      return association.productId === product.id;
    })
    .map(association => association.categoryId) : []
    this.state = {
      id: product ? product.id : null,
      name: product ? product.name : '',
      price: product ? product.price : '',
      quantity: product ? product.quantity : '',
      imageUrl: product ? product.imageUrl : '',
      description: product ? product.description : '',
      categoryArray: product ? categoryArray : [],
      errors: {}
    }
    this.handleChange = this.handleChange.bind(this);
    this.onSave = this.onSave.bind(this);
    this.validators = {
      name: (value) => {
        if(!value) {
          return 'Must Enter Product Name'
        }
      },
      price: (value) => {
        if(!value || typeof value !== 'number') {
          return 'Must Enter Price'
        }
      },
      quantity: (value) => {
        if(!value || typeof value !== 'number') {
          return 'Must Enter Quantity'
        }
      },
      description: (value) => {
        if(!value) {
          return 'Must Enter Product Description'
        }
      },
      categoryArray: (value) => {
        if(!value.length) {
          return 'Please select at least (1) Category'
        }
      }
    }
  }

  componentWillReceiveProps(nextProps) {
    const { product, productCategories } = nextProps
    const categoryArray = product ? productCategories.filter(association => {
      return association.productId === product.id;
    })
    .map(association => association.categoryId) : []
    this.setState(product)
    this.setState({ categoryArray })
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
    } else if (ev.target.name === 'name' || ev.target.name === 'imageUrl' || ev.target.name === 'description') {
      value = ev.target.value;
    } else {
      value = ev.target.value * 1;
    }
    change[ev.target.name] = value;
    this.setState(change);
  }

  onSave(ev) {
    ev.preventDefault();

    const errors = Object.keys(this.validators).reduce((memo, key) => {
      const validator = this.validators[key]
      const value = this.state[key]
      const error = validator(value)
      if(error) {
        memo[key] = error
      }
      return memo;
    }, {})
    this.setState({ errors });
    if(Object.keys(errors).length) {
      return;
    }
    const { id, name, price, quantity, description, categoryArray } = this.state;
    this.props.updateProduct({ id, name, price, quantity, description, categoryArray });
    this.setState({ name: '', price: '', quantity: '', description: '', categoryArray: [] });
  }

  render() {
    const { name, price, quantity, description, imageUrl, categoryArray, errors } = this.state;
    const { categories } = this.props;
    const { handleChange, onSave } = this;
    return (
      <div>
        <form onSubmit={onSave}>
          <input
            className={`form-control margin-b-10${ errors.name ? ' is-invalid' : null }`}
            placeholder='Product Name'
            name='name'
            value={name}
            onChange={handleChange}
          />
          {
            errors.name && <div className='help-block'>
              { errors.name }
            </div>
          }
          <input
            type='number'
            className={`form-control margin-b-10${ errors.price ? ' is-invalid' : null }`}
            placeholder='Price'
            name='price'
            value={price}
            onChange={handleChange}
          />
          {
            errors.price && <div className='help-block'>
              { errors.price }
            </div>
          }
          <input
            type='number'
            className={`form-control margin-b-10${ errors.quantity ? ' is-invalid' : null }`}
            placeholder='Quantity'
            name='quantity'
            value={quantity}
            onChange={handleChange}
          />
          {
            errors.quantity && <div className='help-block'>
              { errors.quantity }
            </div>
          }
          <input
            className='form-control margin-b-10'
            placeholder='Add Image URL'
            name='imageUrl'
            value={imageUrl}
            onChange={handleChange}
          />
          <textarea
            className={`form-control margin-b-10${ errors.description ? ' is-invalid' : null }`}
            placeholder='Description'
            name='description'
            value={description}
            onChange={handleChange}
          />
          {
            errors.description && <div className='help-block'>
              { errors.description }
            </div>
          }
          <h4>Select Categories</h4>
          { errors.categoryArray && <div className='help-block'>
              {errors.categoryArray}
            </div>
          }
          {
            categories.map(category => (
              <div key={category.id}>
                <input
                  type='checkbox'
                  value={category.id}
                  name='categoryArray'
                  onChange={handleChange}
                  checked={categoryArray.includes(category.id * 1)}
                />
                <span>&nbsp;{category.name}</span>
              </div>
            ))
          }
          <button className='btn btn-primary margin-b-10'>Create</button>
        </form>
      </div>
    );
  }
}

const mapState = ({ categories, productCategories }, { product }) => {
  return {
    categories,
    productCategories
    // product
  };
};

const mapDispatch = (dispatch) => {
  return {
    updateProduct: (product) => {
      dispatch(updateProductOnServer(product))
      setTimeout(() => {
        dispatch(getProductCategoriesFromServer())
      }, 100)
    }
  };
};

export default connect(mapState, mapDispatch)(ProductForm);
