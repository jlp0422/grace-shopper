import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import ProductCard from './ProductCard';
import ProductForm from './ProductForm';

class Products extends React.Component {
  constructor() {
    super()
    this.state = {
      name: ''
    }
    this.onChange = this.onChange.bind(this)
  }

  onChange(ev) {
    this.setState({ name: ev.target.value })
  }

  render() {
    const { products, isAdmin, loggedIn } = this.props
    const { onChange } = this
    const { name } = this.state
    const matchingProducts = products.reduce((memo, product) => {
      if (product.name.toLowerCase().match(name.toLowerCase())) {
        return memo.concat(product)
      }
      return memo
    }, [])
    return (
      <div>
        <h2>Products</h2>
        { loggedIn && isAdmin ? (
            <Link to='/products/create'>
              <button className="btn btn-primary">Create new product</button>
            </Link>
        ) : null }
        <div>
          <input placeholder={'Search for a product'} value={name} onChange={onChange} className="form-control" />
        </div>
        <ul className='list-group'>
          {
            matchingProducts.map(product => (
              <li key={product.id} className='list-group-item'>
                <ProductCard product={product} />
              </li>
            ))
          }
        </ul>
      </div>
    )
  }
}

const mapState = ({ products, user, productCategories }) => {
  const { isAdmin } = user;
  const loggedIn = !!Object.keys(user).length;
  return {
    products,
    isAdmin,
    loggedIn,
  };
};

export default connect(mapState)(Products);
