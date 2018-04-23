import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

const LineItemCard = ({ productMap, priceMap, lineItem }) => {
  const total = lineItem.quantity * priceMap[lineItem.productId];
  return (
    <div className = 'row'>
      <div className = 'col'>
        <div><Link to={`/lineitems/${lineItem.id}`}>Quantity: {lineItem.quantity}</Link></div>
        <div>Product ID: {lineItem.productId}</div>
        <div>Product Name: {productMap[lineItem.productId]}</div>
        <div>Order Id: {lineItem.orderId}</div>
        <div>Total Price: {total}</div>
      </div>
    </div>
  )
}

const mapStateToProps = ({ products }, { lineItem }) => {
  const productMap = products.reduce((list, product) => {
    if (!list[product.id]) {
      list[product.id] = product.name
    };
    return list;
  }, {})
  
  const priceMap = products.reduce((list, product) => {
    if (!list[product.id]) {
      list[product.id] = product.price
    };
    return list;
  }, {})

  return {
    productMap,
    priceMap,
    lineItem
  }
}

export default connect(mapStateToProps)(LineItemCard);

