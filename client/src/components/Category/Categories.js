import React from 'react';
import { connect } from 'react-redux';

import CategoryCard from './CategoryCard';
import CategoryForm from './CategoryForm';

const Categories = (props) => {
  const { categories } = props;
  return (
    <div>
      <h2>Categories</h2>
      <CategoryForm />
      <ul className='list-group'>
        {
          categories.map(category => (
            <li key={category.id} className='list-group-item'>
              <CategoryCard category={category} />
            </li>
          ))
        }
      </ul>
    </div>
  );
};

const mapState = ({ categories }) => {
  return {
    categories
  };
};

export default connect(mapState)(Categories);
