import React from 'react';
import { connect } from 'react-redux';
import NotAdmin from '../Admin/NotAdmin';

const CheckAdmin = (Component) => {
  class AdminComponent extends React.Component {
    render() {
      const { isAdmin } = this.props
      return (
        <div>{ isAdmin ? <Component {...this.props } /> : <NotAdmin /> }</div>
      )
    }
  }

  const mapState = ({ user }) => {
    const { isAdmin } = user
    return { isAdmin }
  }

  return connect(mapState)(AdminComponent);
}

export default CheckAdmin;
