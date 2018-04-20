/* eslint-disable */
import React from 'react';
import { HashRouter as Router, Switch, Link, Route } from 'react-router-dom';
import { connect} from 'react-redux';
import { getCategoriesFromServer } from '../store'

// const App = ({categories}) => {
//   console.log(categories)
//   return (
//     <hr />
//   )
// }

class App extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    this.props.getCategories()
  }

  render() {
    return (
      <hr />
    )
  }
}

const mapState = ({categories}) => {
  return {categories}
}

const mapDispatch = (dispatch) => {
  return {
    getCategories: () => dispatch(getCategoriesFromServer())
  }
}

export default connect(mapState, mapDispatch)(App);
