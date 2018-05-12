import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getLineItemsFromServer, getOrdersFromServer } from '../../store';
import { Helmet } from 'react-helmet';

class Home extends Component {

  componentWillMount() {
    const { reloadItems, reloadOrders } = this.props;
    setTimeout(() => {
      reloadItems();
      reloadOrders();
    }, 100)
  }

  render() {
    return (
      <div className='jumbotron'>
        <Helmet><title>Home | J²A</title></Helmet>
        <h1>J²A Widgets</h1>
        <br />
        <p>Come buy our <s>sh*t</s> stuff.</p>
      </div>
    );
  }
}

const mapDispatch = (dispatch) => {
  return {
    reloadItems: () => dispatch(getLineItemsFromServer()),
    reloadOrders: () => dispatch(getOrdersFromServer())
  }
}

export default connect(null, mapDispatch)(Home);
