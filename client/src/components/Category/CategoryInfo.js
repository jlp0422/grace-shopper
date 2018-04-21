import React from 'react';
import { connect } from 'react-redux';
import { deleteCategoryOnServer } from '../../store';

import CategoryForm from './CategoryForm';

const CategoryInfo = (props) => {
  const { category, deleteCategory } = props;
  if (!category) {
    return null;
  }
  return (
    <div>
      <h3>Category: {category.name}</h3>
      <CategoryForm category={category} />
      <button onClick={() => deleteCategory(category.id)} className='btn btn-danger'>Delete Category</button>
    </div>
  );
}

const mapState = ({ categories }, { match }) => {
  const id = match.params.id * 1;
  const category = categories.find(_category => _category.id === id);
  return {
    category
  }
}

const mapDispatch = (dispatch) => {
  return {
    deleteCategory: (categoryId) => dispatch(deleteCategoryOnServer(categoryId))
  }
}

export default connect(mapState, mapDispatch)(CategoryInfo);
