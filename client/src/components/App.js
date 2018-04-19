import React from 'react';
import { HashRouter as Router, Switch, Link, Route } from 'react-router-dom';
import { connect} from 'react-redux';

const App = () => {
  return (
    <hr />
  )
}

const mapState = ({categories}) => {
  return {categories}
}
export default connect(mapState)(App);
