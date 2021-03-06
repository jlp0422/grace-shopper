/* eslint-disable */
import React from 'react';
import { HashRouter as Router, Switch, Link, Route } from 'react-router-dom';
import { connect} from 'react-redux';
import { getCategoriesFromServer, getLineItemsFromServer, getOrdersFromServer, getProductsFromServer, getUsersFromServer, getUserFromToken, getAddressesFromServer, getReviewsFromServer, getProductCategoriesFromServer, getCreditCardsFromServer, updateOrderOnServer, getPromosFromServer } from '../store';

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
import Promos from './Promo/Promos';

class App extends React.Component {
  componentDidMount() {
    const { getCategories, getProducts, getUsers, getOrders, getUser, getLineItems, getAddresses, getReviews, getProductCategories, getCreditCards, hasUser, createOrder, getPromos } = this.props;
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
    getPromos();
    !hasUser ? createOrder({ status: 'cart' }) : null
  }

  render() {
    const UserNavAuth = CheckAuth(UserNav)
    const ReviewsAuth = CheckAuth(Reviews)
    const AddressesAuth = CheckAuth(Addresses)
    const UserAccountAuth = CheckAuth(UserAccount)
    const CheckoutConfirmAuth = CheckAuth(CheckoutConfirm)
    const ThankYouAuth = CheckAuth(ThankYou)
    const AdminUserFormAdmin = CheckAdmin(AdminUserForm)
    const AdminOrderFormAdmin = CheckAdmin(AdminOrderForm)
    const OrdersAdmin = CheckAdmin(Orders)
    const PromosAdmin = CheckAdmin(Promos)
    return (
      <Router>
        <div>
          <Route path='/' component={ Nav } />
          <div className="container">
            <div id="body-elements">
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
                <Route exact path='/cart' component={ ActiveOrder } />
                <Route exact path='/users/:id/cart' component={ CheckAuth(ActiveOrder) } />
                <Route exact path='/users/:id/orders' component={ CheckAuth(PastOrders) } />
                <Route exact path='/users/:id/creditCards' component={ CheckAuth(CreditCards) } />
                <Route exact path='/users/:id/checkout/:orderId' render={({ match }) => (
                  <CheckoutConfirmAuth id={ match.params.id * 1} orderId={ match.params.orderId * 1 } />
                )} />
                <Route exact path='/users/:id/checkout/:orderId/thankyou' render={({ match }) => (
                  <ThankYouAuth id={match.params.id * 1} orderId={match.params.orderId * 1} />
                )} />
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
                <Route exact path='/admin' component={CheckAdmin(AdminNav)} />
                <Route exact path='/admin/users' component={CheckAdmin(Users)} />
                <Route exact path='/admin/users/:id' render={({ match }) => (
                  <AdminUserFormAdmin id={ match.params.id * 1} />
                )} />
                <Route exact path='/admin/users/:id/orders' render={({ match }) => (
                  <OrdersAdmin id={match.params.id * 1} />
                )} />
                <Route exact path='/admin/orders' component={CheckAdmin(Orders)} />
                <Route exact path ='/admin/orders/:id' render={({ match }) => (
                  <AdminOrderFormAdmin id={ match.params.id * 1 } />
                )} />
                <Route exact path='/admin/promos' component={ CheckAdmin(Promos) } />

                {/* 404 PAGE */}
                <Route path='/:id' component={ FourOhFour } />
              </Switch>
            </div>
          <Route component={ Footer } />
          </div>
        </div>
      </Router>
    )
  }
}

const mapState = ({ orders, user }) => {
  const hasUser = !!user.id || orders.find(order => order.userId === undefined)
  return {
    hasUser
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
    getPromos: () => dispatch(getPromosFromServer()),
    getUser: () => {
      if (window.localStorage.getItem('token')) {
        dispatch(getUserFromToken(window.localStorage.getItem('token')))
      }
    },
    createOrder: (order) => dispatch(updateOrderOnServer(order))
  }
}

export default connect(mapState, mapDispatch)(App);
