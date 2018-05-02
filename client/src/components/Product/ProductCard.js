import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

const ProductCard = (props) => {
  const { product, categories, categoryIds } = props;
  return (
    <div className='row'>
      <div className='col'>
        <Link to={`/products/${product.id}`}>
          <h4>{product.name}</h4>
        </Link>
        <div>Price: ${product.price}</div>
        <div>Quantity: {product.quantity ? product.quantity : 'OUT OF STOCK'}</div>
        <div>Categories:</div>
        <ul>
        {
          categories.map(category => (
            <li key={category.id}>{category.name}</li>
          ))
        }
        </ul>
      </div>
      <div className='col'>
        <img src={product.imageUrl} className='cardThumbnail'/>
      </div>
    </div>
  );
}

const mapState = ({ categories, productCategories }, { product }) => {
  const prodCat = productCategories.filter(proCa => proCa.productId === product.id)
  const pcMap = prodCat.reduce((memo, pc) => {
    if(!memo[pc.categoryId]) memo[pc.categoryId] = 1;
    else memo[pc.categoryId]++;
    return memo;
  }, {})
  const catIdArr = Object.keys(pcMap).map(categoryId => categoryId * 1)
  const filteredCategories = catIdArr.map(id => categories.find(category => category.id === id))
  return {
    categories: filteredCategories
  }
}

export default connect(mapState)(ProductCard);
