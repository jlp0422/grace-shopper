import React from 'react';
import { Link } from 'react-router-dom';

const CategoryCard = (props) => {
  const { category } = props;
  return (
    <div>
      <Link to={`/categories/${category.id}`}>
        <h4>{category.name}</h4>
      </Link>
    </div>
  );
}

export default CategoryCard;
