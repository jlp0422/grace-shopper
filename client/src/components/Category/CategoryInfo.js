import React from 'react';
import { connect } from 'react-redux';

const CategoryInfo = (props) => {
  const { category } = props;
  if (!category) {
    return null;
  }
  return (
    <div>
      <h4>Category: {category.name}</h4>
      <p>Filler Text</p>
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

export default connect(mapState)(CategoryInfo);
