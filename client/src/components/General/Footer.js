/* eslint-disable */
import React from 'react';
import { Link } from 'react-router-dom';
import { logout } from '../../store';
import { connect} from 'react-redux';

const PageFooter = ({ user, logout }) => {
  const url = location.hash.slice(1)
  return (
    <div id="footer">
      {
        user.id ? (
          <div className="footer-4">
            <Link to='/'>Home</Link>
            <Link to={`/users/${user.id}`}>My Account</Link>
            <Link to={`/users/${user.id}/cart`}>My Cart</Link>
            <span onClick={logout}>Log out</span>
          </div>
        ) : (
          <div className="footer-2">
            <Link to='/'>Home</Link>
            {
              url === '/login' ? (
                <Link to='/signup'>Sign up</Link>
              ) : (
                <Link to='/login'>Log in</Link>
              )
            }
          </div>
          )
      }
    </div>

  );
};

const mapState = ({ user }) => {
  return { user }
}

const mapDistpach = (dispatch) => {
  return {
    logout: () => dispatch(logout())
  }
}
export default connect(mapState, mapDistpach)(PageFooter);
