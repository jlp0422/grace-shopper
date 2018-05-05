import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import ProductCard from './ProductCard';
import ProductForm from './ProductForm';

class Products extends React.Component {
  constructor() {
    super()
    this.state = {
      name: '',
      startIndex: 0,
      endIndex: 7
    }
    this.onChange = this.onChange.bind(this)
  }

  onChange(ev) {
    this.setState({ name: ev.target.value })
  }

  render() {
    const { products, isAdmin, loggedIn } = this.props
    const { onChange } = this
    const { name, startIndex, endIndex } = this.state
    const matchingProducts = products.reduce((memo, product) => {
      if (product.name.toLowerCase().match(name.toLowerCase())) {
        return memo.concat(product)
      }
      return memo
    }, [])
    const tenProducts = matchingProducts.reduce((memo, product, index) => {
      if (index < endIndex && index >= startIndex) memo.push(product)
      return memo
    }, [])
    const page = endIndex / 7
    return (
      <div>
        <h2>Products</h2>
        { loggedIn && isAdmin ? (
            <Link to='/products/create'>
              <button className="btn btn-primary">Create new product</button>
            </Link>
        ) : null }
        <div style={{ margin: '10px 0px 15px'}}>
          <input placeholder={'Search for a product'} value={name} onChange={onChange} className="form-control" />
        </div>
        <ul className='list-group'>
          {
            tenProducts.map(product => (
              <li key={product.id} className='list-group-item'>
                <ProductCard product={product} />
              </li>
            ))
          }
        </ul>
        <div className="product-buttons">
          <button disabled={startIndex < 7 } className="btn btn-outline-info prev-btn" onClick={() => this.setState({ startIndex: startIndex - 7, endIndex: endIndex - 7 })}>
            Previous
          </button>
          <button disabled className="btn btn-info">Page { page }</button>
          <button disabled={ endIndex >= products.length } className="btn btn-outline-info next-btn" onClick={() => this.setState({ startIndex: startIndex + 7, endIndex: endIndex + 7})}>
            Next
          </button>
        </div>
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
