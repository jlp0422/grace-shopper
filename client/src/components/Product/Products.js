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
      endIndex: 10
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
    console.log('ten products: ', tenProducts)
    // console.log('products: ', products.length)
    // console.log('start index: ', startIndex)
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
        <div style={{ margin: '0 auto'}}>
          { startIndex <= 0 ? null :
            <button onClick={() => this.setState({ startIndex: startIndex - 10, endIndex: endIndex - 10 })}>Previous</button>
          }
          { endIndex >= products.length ? null :
            <button onClick={() => this.setState({ startIndex: startIndex + 10, endIndex: endIndex + 10})}>Next</button>
          }
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
