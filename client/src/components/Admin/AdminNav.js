import React from 'react';
import { Link } from 'react-router-dom';

const AdminNav = () => {
  return (
    <div>
      <h1>Admin Tools</h1>
      <div className="admin-nav margin-b-10">
        <Link to='/admin/users'>
          View all users
        </Link>
        <Link to='/admin/orders'>
          View all orders
        </Link>
      </div>
    </div>
  )
}

export default AdminNav;
