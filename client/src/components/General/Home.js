// import React from 'react';

// const Home = () => {
//   return (
//     <div className='jumbotron'>
//       <h1>J²A Widgets</h1>
//       <br />
//       <p>Come buy our <s>sh*t</s> stuff.</p>
//     </div>
//   );
// }

// export default Home;




import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getOrdersFromServer } from '../../store';

class Home extends Component {

  // componentDidMount() {
    // const { loadOrders } = this.props;
    // console.log(loadOrders())
    // this.forceUpdate()
    // loadOrders();
  // }

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
    loadOrders: () => dispatch(getOrdersFromServer())
  }
}

export default connect(null, mapDispatch)(Home);
