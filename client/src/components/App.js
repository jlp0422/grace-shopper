/* eslint-disable */
import React from 'react';
import { HashRouter as Router, Switch, Link, Route } from 'react-router-dom';
import { connect} from 'react-redux';
import { getCategoriesFromServer, getLineItemsFromServer, getOrdersFromServer, getProductsFromServer, getUsersFromServer, getUserFromToken, getAddressesFromServer, getReviewsFromServer, getProductCategoriesFromServer, getCreditCardsFromServer } from '../store';

import CheckAuth from './General/CheckAuth';
import CheckAdmin from './General/CheckAdmin';
import Home from './General/Home';
import Nav from './General/Nav';
import Footer from './General/Footer';
import FourOhFour from './General/FourOhFour';
import Categories from './Category/Categories';
import CategoryInfo from './Category/CategoryInfo';
import CategoryForm from './Category/CategoryForm';
import Products from './Product/Products';
import ProductForm from './Product/ProductForm';
import ProductInfo from './Product/ProductInfo';
import Users from './User/Users';
import UserNav from './User/UserNav';
import LoginForm from './User/LoginForm';
import Orders from './Order/Orders';
import ActiveOrder from './Order/ActiveOrder';
import PastOrders from './Order/PastOrders';
import Reviews from './Review/Reviews';
import UserForm from './User/UserForm';
import UserAccount from './User/UserAccount';
import Addresses from './Address/Addresses';
import CheckoutConfirm from './Checkout/CheckoutConfirm';
import ThankYou from './Checkout/ThankYou';
import AdminUserForm from './Admin/AdminUserForm';
import AdminOrderForm from './Admin/AdminOrderForm';
import AdminNav from './Admin/AdminNav';
import CreditCards from './User/CreditCards';

class App extends React.Component {
  componentDidMount() {
    const { getCategories, getProducts, getUsers, getOrders, getUser, getLineItems, getAddresses, getReviews, getProductCategories, getCreditCards } = this.props;
    getCategories();
    getProducts();
    getUsers();
    getOrders();
    getUser();
    getLineItems();
    getAddresses();
    getReviews();
    getProductCategories();
    getCreditCards();
  }

  render() {
    const UserNavAuth = CheckAuth(UserNav)
    const ReviewsAuth = CheckAuth(Reviews)
    const AddressesAuth = CheckAuth(Addresses)
    const UserAccountAuth = CheckAuth(UserAccount)
    const AdminUserFormAuth = CheckAdmin(AdminUserForm)
    const AdminOrderFormAuth = CheckAdmin(AdminOrderForm)
    return (
      <Router>
        <div>
          <Route path='/' component={ Nav } />
          <div className="container">
            <div id="body-elements">
              <Route path='/users/:id' render={({ match, history }) => (
                <UserNavAuth history={ history } id={ match.params.id * 1 } />
              )} />
              <Route path='/admin' component={CheckAdmin(AdminNav)} />
              <Switch>
                <Route exact path='/' component={ Home } />
                {/* CATEGORY ROUTES */}
                <Route exact path='/categories' component={ Categories } />
                <Route exact path='/categories/create' component={CategoryForm} />
                <Route exact path='/categories/:id' component={ CategoryInfo } />

                {/* PRODUCT ROUTES */}
                <Route exact path='/products' component={ Products } />
                <Route exact path='/products/create' component={ ProductForm } />
                <Route exact path='/products/:id' component={ ProductInfo } />
                <Route exact path='/products/:id/reviews' render={ ({ match }) => (
                  <Reviews page='product' id={ match.params.id * 1 } />
                 )} />

                {/* USER ROUTES */}
                <Route exact path='/users/:id' render={({ match }) => (
                  <UserAccountAuth id={ match.params.id * 1} />
                )} />
                <Route exact path='/users/:id/cart' component={ CheckAuth(ActiveOrder) } />
                <Route exact path='/users/:id/orders' component={ CheckAuth(PastOrders) } />
                <Route exact path='/users/:id/creditCards' component={ CheckAuth(CreditCards) } />
                <Route exact path='/users/:id/checkout' component={ CheckAuth(CheckoutConfirm) } />
                <Route exact path='/users/:id/checkout/thankyou' component={ CheckAuth(ThankYou) } />
                <Route exact path='/users/:id/reviews' render={ ({ match }) => (
                  <ReviewsAuth page='user' id={ match.params.id * 1 } />
                )} />
                <Route exact path='/users/:id/addresses' render={({ match }) => (
                  <AddressesAuth id={ match.params.id } />
                )} />
                <Route exact path='/users/:id/edit' component={ CheckAuth(UserForm) } />

                {/* AUTH ROUTES */}
                <Route exact path='/login' component={ LoginForm } />
                <Route exact path='/signup' component={ LoginForm } />

                {/* ADMIN ROUTES */}
                {/* all routes need to have CheckAdmin HOC */}
                <Route exact path='/admin/users' component={CheckAdmin(Users)} />
                <Route exact path='/admin/users/:id' render={({ match }) => (
                  <AdminUserFormAuth id={ match.params.id * 1} />
                )} />
                <Route exact path='/admin/orders' component={CheckAdmin(Orders)} />
                <Route exact path ='/admin/orders/:id' render={({ match }) => (
                  <AdminOrderFormAuth id={ match.params.id * 1 } />
                )} />
                {/* shows on /admin and any /users page right now, since those are not in switch
                 <Route path='/:id' component={ FourOhFour } />
                */}
              </Switch>
            </div>
          <Route component={ Footer } />
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
    getLineItems: () => dispatch(getLineItemsFromServer()),
    getAddresses: () => dispatch(getAddressesFromServer()),
    getReviews: () => dispatch(getReviewsFromServer()),
    getProductCategories: () => dispatch(getProductCategoriesFromServer()),
    getCreditCards: () => dispatch(getCreditCardsFromServer()),
    getUser: () => {
      if (window.localStorage.getItem('token')) {
        dispatch(getUserFromToken(window.localStorage.getItem('token')))
      }
    }
  }
}

export default connect(null, mapDispatch)(App);
