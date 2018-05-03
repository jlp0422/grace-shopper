import React from 'react';
import { connect } from 'react-redux';
import { deleteCategoryOnServer } from '../../store';
import ProductCard from '../Product/ProductCard';
import CategoryForm from './CategoryForm';

class CategoryInfo extends React.Component {
  constructor() {
    super()
    this.state = {
      name: ''
    }
    this.onChange = this.onChange.bind(this)
  }

  onChange(ev) {
    this.setState({ name: ev.target.name })
  }

  render() {
    const { category, deleteCategory, loggedIn, isAdmin, productMap, products } = this.props
    const { onChange } = this
    const { name } = this.state
    // won't work, productMap only has IDs
    // const matchingProducts = productMap.reduce((memo, product) => {
    //   if (product.name.toLowerCase().match(name.toLowerCase())) {
    //     return memo.concat(product)
    //   }
    //   return memo
    // }, [])
    if (!category) return null;
    return (
      <div>
        <h3>Category: {category.name}</h3>
        {
          loggedIn && isAdmin ? (
            <div>
              <CategoryForm category={category} />
              <button onClick={() => deleteCategory(category.id)} className='btn btn-danger'>Delete Category</button>
            </div>
          ) : null
        }
        {
          productMap.map(productCategory => {
            const product = products.find(p => p.id === productCategory.productId)
            return (
              <ul key={product.id} className='list-group'>
                <li className='list-group-item'>
                  <ProductCard key={product.id} product={product} />
                </li>
              </ul>

            )
          })
        }
      </div>

    )
  }
}

const mapState = ({ categories, user, productCategories, products }, { match }) => {
  const id = match.params.id * 1;
  const category = categories.find(_category => _category.id === id);
  const loggedIn = !!Object.keys(user).length;
  const { isAdmin } = user;
  const productMap = productCategories.filter(combo => combo.categoryId === id)
  return {
    category,
    loggedIn,
    isAdmin,
    productMap,
    products
  }
}

const mapDispatch = (dispatch) => {
  return {
    deleteCategory: (categoryId) => dispatch(deleteCategoryOnServer(categoryId))
  }
}

export default connect(mapState, mapDispatch)(CategoryInfo);
