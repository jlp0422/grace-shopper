import React from 'react';
import { Link } from 'react-router-dom';

const AdminNav = () => {
  const url = location.hash.substring(1)
  return (
    <div>
      <h1>Admin Tools</h1>
      <div style={{ textAlign: 'center'}} className="admin-nav margin-b-10">
        <Link className={`user-nav${url === '/admin/users' ? ('-active') : ''}`} to='/admin/users'>
          View all users
        </Link>
        <Link className={`user-nav${url === '/admin/orders' ? ('-active') : ''}`} to='/admin/orders'>
          View all orders
        </Link>
        <Link className={`user-nav${url === '/admin/promos' ? ('-active') : ''}`} to='/admin/promos'>
          View all Promo Codes
        </Link>
      </div>
    </div>
  )
}

export default AdminNav;
