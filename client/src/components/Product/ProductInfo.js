import React, { Component } from 'react';
import { connect } from 'react-redux';

class ProductInfo extends Component {
  constructor() {
    super();
  }

  render() {

    return (
      <div>{this.props.product.name}</div>
    );
  }

}


const mapState = ({ products }, { match }) => {
  const id = match.params.id * 1;
  const product = products.find(product => product.id === id);
  return {
    product
  }
}

export default connect(mapState)(ProductInfo);
