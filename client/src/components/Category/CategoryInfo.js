import React from 'react';
import { connect } from 'react-redux';
import { deleteCategoryOnServer } from '../../store';

import CategoryForm from './CategoryForm';

const CategoryInfo = (props) => {
  const { category, deleteCategory, isLogged, isAdmin } = props;
  if (!category) {
    return null;
  }
  return (
    <div>
      <h3>Category: {category.name}</h3>
      {
        isLogged && isAdmin ? (
          <div>
            <CategoryForm category={category} />
            <button onClick={() => deleteCategory(category.id)} className='btn btn-danger'>Delete Category</button>
          </div>
        ) : null
      }
    </div>
  );
}

const mapState = ({ categories, user }, { match }) => {
  const id = match.params.id * 1;
  const category = categories.find(_category => _category.id === id);
  const isLogged = !!Object.keys(user).length;
  const { isAdmin } = user;
  return {
    category,
    isLogged,
    isAdmin
  }
}

const mapDispatch = (dispatch) => {
  return {
    deleteCategory: (categoryId) => dispatch(deleteCategoryOnServer(categoryId))
  }
}

export default connect(mapState, mapDispatch)(CategoryInfo);
