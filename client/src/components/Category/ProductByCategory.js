import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

const ProductByCategory = ({ productArray }) => {
  return (
    <div>
      <h4>Number of Products: {productArray.length}</h4>
      <ul className = 'list-group'>
        {
          productArray.map(product => {
            return (
              <li key={product.id} className='list-group-item'>
                <div>Name: <Link to={`/products/${product.id}`}>{product.name} </Link></div>
                <div>Price: ${product.price}</div>                  
              </li>
            )
          })
        }
      </ul>
    </div>
  )
}

const mapStateToProps = ({ productCategories, products }, {categoryNum}) => {
  const productsForCategory = productCategories.filter(productCategory => productCategory.categoryId === categoryNum )
  let productArray = [];
  const productMap = productsForCategory.forEach(productforCategory => {
    const product = products.find(product => product.id === productforCategory.productId);
    if (productArray.indexOf(product) === -1) {
      productArray = [...productArray, product];
    }
  })
  return {
    productArray
  }
}

export default connect(mapStateToProps)(ProductByCategory)