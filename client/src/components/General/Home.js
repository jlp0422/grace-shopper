import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getLineItemsFromServer } from '../../store';

class Home extends Component {

  componentWillMount() {
    const { reloadItems } = this.props;
    setTimeout(() => {
      reloadItems();
    }, 100)
  }

  render() {
    return (
      <div className='jumbotron'>
        <h1>J²A Widgets</h1>
        <br />
        <p>Come buy our <s>sh*t</s> stuff.</p>
      </div>
    );
  }
}

const mapDispatch = (dispatch) => {
  return {
    reloadItems: () => dispatch(getLineItemsFromServer())
  }
}

export default connect(null, mapDispatch)(Home);
