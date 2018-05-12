import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import ProductCard from './ProductCard';
import ProductForm from './ProductForm';
import { Helmet } from 'react-helmet';

class Products extends React.Component {
  constructor() {
    super()
    this.state = {
      name: '',
      startIndex: 0,
      endIndex: 7
    }
    this.onChange = this.onChange.bind(this)
    this.onPrevPage = this.onPrevPage.bind(this)
    this.onNextPage = this.onNextPage.bind(this)
  }

  onChange(ev) {
    this.setState({ name: ev.target.value, startIndex: 0, endIndex: 7 })
  }

  onPrevPage() {
    const { startIndex, endIndex } = this.state
    this.setState({ startIndex: startIndex - 7, endIndex: endIndex - 7 })
  }

  onNextPage() {
    const { startIndex, endIndex } = this.state
    this.setState({ startIndex: startIndex + 7, endIndex: endIndex + 7 })
  }

  render() {
    const { products, isAdmin, loggedIn } = this.props
    const { onChange, onNextPage, onPrevPage } = this
    const { name, startIndex, endIndex } = this.state
    const matchingProducts = products.reduce((memo, product) => {
      if (product.name.toLowerCase().match(name.toLowerCase())) {
        memo.push(product)
      }
      return memo
    }, [])
    const tenProducts = matchingProducts.reduce((memo, product, index) => {
      if (index < endIndex && index >= startIndex) memo.push(product)
      return memo
    }, [])
    const currentPage = endIndex / 7
    const lastPage = Math.ceil(matchingProducts.length / 7)
    return (
      <div>
        <Helmet><title>Products | J²A</title></Helmet>
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
          <button disabled={startIndex < 7 } className="btn btn-outline-info prev-btn" onClick={ onPrevPage }>
            &laquo; Previous
          </button>
          <button disabled className="btn btn-info">Page { currentPage } / { lastPage < 1 ? 1 : lastPage }</button>
          <button disabled={ endIndex >= matchingProducts.length } className="btn btn-outline-info next-btn" onClick={ onNextPage }>
            Next &raquo;
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
