import React from 'react';
import { Link } from 'react-router-dom';

const NotAdmin = () => {
  return (
    <div>
      <h3>You are not authorized to view this page.</h3>
      <h5>If you think this is an error, please reach out to an administrator</h5>
      <Link to='/'><button className="btn btn-info">Back to home</button></Link>
    </div>
  )
}

export default NotAdmin;
