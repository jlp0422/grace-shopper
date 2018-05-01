import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import ProductCard from './ProductCard';
import ProductForm from './ProductForm';

class Products extends React.Component {
  constructor() {
    super()
    this.state = {
      search: ''
    }
    this.onChange = this.onChange.bind(this)
  }

  onChange(ev) {
    this.setState({ search: ev.target.value })
  }

  render() {
    const { products, isAdmin, loggedIn } = this.props
    const { onChange } = this
    const { search } = this.state
    const matchingProducts = products.reduce((memo, product) => {
      if (product.name.toLowerCase().match(search.toLowerCase())) {
        return memo.concat(product)
      }
      return memo
    }, [])
    console.log(matchingProducts)
    return (
      <div>
        <h2>Products</h2>
        { loggedIn && isAdmin ? (
          <div>
            <Link to='/products/create'>
              <button className="btn btn-primary">Create new product</button>
            </Link>
            <div>
              <input value={ search } onChange={ onChange } className="form-control" />
            </div>
          </div>
        ) : null }
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
