/* eslint-disable */
import React from 'react';
import { HashRouter as Router, Switch, Link, Route } from 'react-router-dom';
import { connect} from 'react-redux';
import { getCategoriesFromServer, getLineItemsFromServer, getOrdersFromServer, getProductsFromServer, getUsersFromServer, getUserFromToken } from '../store';

import Home from './Home';
import Nav from './Nav';
import Categories from './Category/Categories';
import CategoryInfo from './Category/CategoryInfo';
import Products from './Product/Products';
import ProductInfo from './Product/ProductInfo';
import Users from './User/Users';
import UserInfo from './User/UserInfo';
import LoginForm from './User/LoginForm';

class App extends React.Component {
  componentDidMount() {
    const { getCategories, getProducts, getUsers, getOrders, getUser } = this.props;
    getCategories();
    getProducts();
    getUsers();
    getOrders();
    getUser();
  }

  render() {
    return (
      <Router>
        <div>
          <Route path='/' component={Nav} />
          <div className="container">
          <Switch>
            <Route exact path='/' component={Home} />
            <Route exact path='/categories' component={Categories} />
            <Route exact path='/categories/:id' component={CategoryInfo} />
            <Route exact path='/products' component={Products} />
            <Route exact path='/products/:id' component={ProductInfo} />
            <Route exact path='/users' component={Users} />
            <Route exact path='/users/:id' component={UserInfo} />
            <Route exact path='/login' component={LoginForm} />
          </Switch>
          </div>
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
    getOrders: () => dispatch(getOrdersFromServer()),
    getUser: () => {
      if (window.localStorage.getItem('token')) {
        dispatch(getUserFromToken(window.localStorage.getItem('token')))
      }
    }
  }
}

export default connect(null, mapDispatch)(App);
