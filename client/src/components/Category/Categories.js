import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import CategoryCard from './CategoryCard';
import CategoryForm from './CategoryForm';
import { Helmet } from 'react-helmet';

class Categories extends React.Component {
  constructor() {
    super()
    this.state = {
      name: ''
    }
    this.onChange = this.onChange.bind(this)
  }

  onChange(ev) {
    this.setState({ name: ev.target.value})
  }

  render() {
    const { categories, loggedIn, isAdmin } = this.props
    const { onChange } = this
    const { name } = this.state
    const matchingCategories = categories.reduce((memo, category) => {
      if (category.name.toLowerCase().match(name.toLowerCase())) {
        return memo.concat(category)
      }
      return memo
    }, [])
    return (
      <div>
        <Helmet><title>Categories | J²A</title></Helmet>
        <h2>Categories</h2>
        { loggedIn && isAdmin ? (
            <Link to='/categories/create'>
              <button className="btn btn-primary">Create new category</button>
            </Link>
          ) : null }
          <div style={{ margin: '10px 0px 15px' }}>
            <input placeholder={'Search for a category'} value={ name } onChange={ onChange } className="form-control" />
          </div>
        <ul className='list-group'>
          {
            matchingCategories.map(category => (
              <li key={category.id} className='list-group-item'>
                <CategoryCard category={category} />
              </li>
            ))
          }
        </ul>
      </div>
    )
  }
}


const mapState = ({ categories, user }) => {
  const loggedIn = !!user.id;
  const { isAdmin } = user;
  return {
    categories,
    loggedIn,
    isAdmin
  };
};

export default connect(mapState)(Categories);
