import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

const UserCard = (props) => {
  const { product, categories, categoryIds } = props;

  // console.log('test')

// console.log('Association:', product.product_categories)

  // console.log('NEW:', categories)

  // console.log('ID arr:', categoryIds)
  // console.log('New Categories:', categories)

  return (
    <div className='row'>
      <div className='col'>
        <Link to={`/products/${product.id}`}>
          <h4>{product.name}</h4>
        </Link>
        <div>Price: ${product.price}</div>
        <div>Quantity: {product.quantity}</div>
        <div>Categories:</div>
        {
          categories.map(category => (
            <div>{category.name}</div>
          ))
        }
      </div>
      <div className='col'>
        <img src={product.imageUrl} className='cardThumbnail'/>
      </div>
    </div>
  );
}

const mapState = ({ categories, productCategories }, { product }) => {
  // const category = categories.find(_category => _category.id === product.categoryId);

  // const categoryIds = productCategories.filter(association => association.productId === product.id)

  // const _categories = categories.filter(category => categoryIds.includes(category.id))

  const pcMap = product.product_categories.reduce((memo, pc) => {
    if(!memo[pc.categoryId]) {
      memo[pc.categoryId] = 1
    } else {
      memo[pc.categoryId]++
    }
    return memo
  }, {})

  // console.log(Object.keys(pcMap).map(categoryId => categoryId * 1))

  const catIdArr = Object.keys(pcMap).map(categoryId => categoryId * 1)

  // console.log(catIdArr)

  const filteredCategories = catIdArr.map(id => categories.find(category => category.id === id))

  console.log(filteredCategories);

  // console.log('ID arr:', categoryIds)
  // console.log('New Categories:', _categories)

  return {
    // category,
    categories: filteredCategories
    // categoryIds
  }
}

export default connect(mapState)(UserCard);
