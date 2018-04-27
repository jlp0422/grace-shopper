import React, { Component } from 'react';
import { connect } from 'react-redux';

class ProductByCategory extends Component {
  constructor(props) {
    super(props);
      const    


  }



}

const mapStateToProps = ({ productCategories }, {categoryNum}) => {
  const productsForCategory = productCategories.filter(productCategory => productCategory.categoryId === categoryNum )
  return {
    productsForCategory
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(ProductByCategory)