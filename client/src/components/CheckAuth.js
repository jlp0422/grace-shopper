import React from 'react';
import { connect } from 'react-redux';

const CheckAuth = (component) => {
  class AuthComponent extends React.Component {
    // constructor(props) {
    //   super(props)
    // }

    componentDidMount(nextProps) {
      this.checkAuth()
    }

    componentWillReceiveProps(nextProps) {
      this.checkAuth()
    }

    checkAuth() {
      if (!this.props.isAuthenticated) {
        location.hash = '/login'
      }
    }

    // isLogged = () => {
    //   return this.props
    // }

    render() {
      const { isAuthenticated } = this.props
      return (
        <div>
          {this.props}
        </div>
      )
    }
  }
}

const mapState = ({ user }) => {
  const isAuthenticated = user.id ? true : false
  console.log(isAuthenticated)
  return { user }
}

export default connect(mapState)(CheckAuth);
