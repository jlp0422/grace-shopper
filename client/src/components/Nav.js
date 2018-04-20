import React from 'react';
import { Link } from 'react-router-dom';

const Nav = () => {

  return (
    <div>
      <ul>
        <li>
          <Link to='/'>Home</Link>
        </li>
        <li>
          <Link to='/categories'>Categories</Link>
        </li>
        <li>
          <Link to='/products'>Products</Link>
        </li>
        <li>
          <Link to='/users'>Users</Link>
        </li>
      </ul>
    </div>
  );
}

export default Nav;
