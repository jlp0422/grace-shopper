/* eslint-disable */
import React from 'react';
import { HashRouter as Router, Switch, Link, Route } from 'react-router-dom';
import { connect} from 'react-redux';
import { getCategoriesFromServer, getProductsFromServer, getUsersFromServer, getOrdersFromServer } from '../store';
import Nav from './Nav';

class App extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    const { getCategories, getProducts, getUsers, getOrders } = this.props
    getCategories()
    getProducts()
    getUsers()
    getOrders()
  }

  render() {
    return (
      <Router>
        <div>
        <Route path='/' component={ Nav } />
        </div>
      </Router>
    )
  }
}

const mapDispatch = (dispatch) => {
  return {
    getCategories: () => dispatch(getCategoriesFromServer()),
    getProducts: () => dispatch(getProductsFromServer()),
    getUsers: () => dispatch(getUsersFromServer()),
    getOrders: () => dispatch(getOrdersFromServer())
  }
}

export default connect(null, mapDispatch)(App);
