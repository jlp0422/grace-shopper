import React from 'react';
import { connect } from 'react-redux';

const Categories = (props) => {
  const { categories } = props;
  return (
    <div>
      <h2>Categories</h2>
      <ul>
        {
          categories.map(category => (
            <li key={category.id}>
              {category.name}
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
