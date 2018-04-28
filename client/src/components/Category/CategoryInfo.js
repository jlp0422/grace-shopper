import React from 'react';
import { connect } from 'react-redux';
import { deleteCategoryOnServer } from '../../store';

import CategoryForm from './CategoryForm';
import ProductByCategory from './ProductByCategory';

const CategoryInfo = (props) => {
  const { category, deleteCategory, loggedIn, isAdmin } = props;
  if (!category) {
    return null;
  }
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
      <ProductByCategory categoryNum={category.id} />
    </div>
  );
}

const mapState = ({ categories, user }, { match }) => {
  const id = match.params.id * 1;
  const category = categories.find(_category => _category.id === id);
  const loggedIn = !!Object.keys(user).length;
  const { isAdmin } = user;
  return {
    category,
    loggedIn,
    isAdmin
  }
}

const mapDispatch = (dispatch) => {
  return {
    deleteCategory: (categoryId) => dispatch(deleteCategoryOnServer(categoryId))
  }
}

export default connect(mapState, mapDispatch)(CategoryInfo);
