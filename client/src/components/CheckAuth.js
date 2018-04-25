import React from 'react';
import { connect } from 'react-redux';

const CheckAuth = (component) => {
  return class extends React.Component {
    constructor(props) {
      super(props)
      const { user } = this.props
      console.log(user)
    }

    componentDidMount(nextProps) {
      const { user } = nextProps
      console.log(user)
    }

    render() {
      return <component />
      // if (auth.isAuthenticated()) {
      //   return ('logged in')
      // }
      // else {
      //   return ('not logged in')
      // }
    }
  }
}

const mapState = ({ user }) => {
  return { user }
}

export default connect(mapState)(CheckAuth);
