/* eslint-disable */
import React from 'react';
import { HashRouter as Router, Switch, Link, Route } from 'react-router-dom';
import { connect} from 'react-redux';
import { getCategoriesFromServer, getLineItemsFromServer, getOrdersFromServer, getProductsFromServer, getUsersFromServer } from '../store';

import Home from './Home';
import Nav from './Nav';
import Categories from './Category/Categories';
import Products from './Product/Products';
import Users from './User/Users';

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.getCategories();
    this.props.getLineItems();
    this.props.getOrders();
    this.props.getProducts();
    this.props.getUsers();
  }

  render() {
    return (
      <Router>
        <div>
          <Route component={Nav} />
          <Switch>
            <Route exact path='/' component={Home} />
            <Route exact path='/categories' component={Categories} />
            <Route exact path='/products' component={Products} />
            <Route exact path='/users' component={Users} />

          </Switch>
        </div>
      </Router>
    )
  }
}

// const mapState = ({categories}) => {
//   return {categories}
// }

const mapDispatch = (dispatch) => {
  return {
    getCategories: () => dispatch(getCategoriesFromServer()),
    getLineItems: () => dispatch(getLineItemsFromServer()),
    getOrders: () => dispatch(getOrdersFromServer()),
    getProducts: () => dispatch(getProductsFromServer()),
    getUsers: () => dispatch(getUsersFromServer()),

  }
}

// export default connect(mapState, mapDispatch)(App);
export default connect(null, mapDispatch)(App);
