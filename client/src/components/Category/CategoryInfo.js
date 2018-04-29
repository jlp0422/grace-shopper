import React from 'react';
import { connect } from 'react-redux';
import { deleteCategoryOnServer } from '../../store';
import ProductCard from '../Product/ProductCard';
import CategoryForm from './CategoryForm';

const CategoryInfo = ({ category, deleteCategory, loggedIn, isAdmin, productMap, products }) => {
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
            <ul key={productCategory.id} className='list-group'>
              <li className='list-group-item'>
                <ProductCard key={productCategory.id} product={product} />
              </li>
            </ul>

          )
        })
      }

    </div>
  );
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
