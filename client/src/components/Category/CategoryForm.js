import React, { Component } from 'react';
import { connect } from 'react-redux';

import { updateCategoryOnServer } from '../../store';

class CategoryForm extends Component {
  constructor(props) {
    super(props);
    const { category } = props;
    this.state = {
      id: category ? category.id : '',
      name: category ? category.name : '',
      errors: {}
    }
    this.handleChange = this.handleChange.bind(this);
    this.onSave = this.onSave.bind(this);
    this.validators = {
      name: (value) => {
        if(!value) return 'Please enter a category name'
      }
    }
  }

  componentWillReceiveProps(nextProps) {
    const { category } = nextProps;
    this.setState(category);
  }

  handleChange(ev) {
    const change = {};
    change[ev.target.name] = ev.target.value;
    this.setState(change);
  }

  onSave(ev) {
    ev.preventDefault();
    const { id, name } = this.state;
    const errors = Object.keys(this.validators).reduce((memo, key) => {
      const validator = this.validators[key];
      const value = this.state[key];
      const error = validator(value);
      if(error) {
        memo[key] = error;
      }
      return memo;
    }, {})
    this.setState({ errors });
    if(Object.keys(errors)) {
      return;
    }
    this.props.updateCategory({ id, name });
    this.setState({ name: '' })
  }

  render() {
    const { name, errors } = this.state;
    const { handleChange, onSave } = this;
    return (
      <div>
        <form onSubmit={onSave}>
          <label className="font-weight-bold">Edit Category name:</label>
          <input
            placeholder='Category Name'
            name='name'
            value={name}
            className={`form-control margin-b-10${ !name ? ' is-invalid' : name ? ' is-valid' : null }`}
            onChange={handleChange}
          />
          { errors.name ? <div className='help-block'>{errors.name}</div> : null }
          <button className='btn btn-primary'>Save</button>
        </form>
      </div>
    );
  }

}

const mapDispatch = (dispatch) => {
  return {
    updateCategory: (category) => dispatch(updateCategoryOnServer(category))
  }

}

export default connect(null, mapDispatch)(CategoryForm);
