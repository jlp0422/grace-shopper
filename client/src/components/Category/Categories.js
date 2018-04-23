import React from 'react';
import { connect } from 'react-redux';

import CategoryCard from './CategoryCard';
import CategoryForm from './CategoryForm';

const Categories = (props) => {
  const { categories, loggedIn, isAdmin } = props;
  return (
    <div>
      <h2>Categories</h2>
      { loggedIn && isAdmin ? <CategoryForm /> : null }
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

const mapState = ({ categories, user }) => {
  const loggedIn = !!Object.keys(user).length;
  const { isAdmin } = user;
  return {
    categories,
    loggedIn,
    isAdmin
  };
};

export default connect(mapState)(Categories);
