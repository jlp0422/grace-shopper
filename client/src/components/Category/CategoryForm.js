import React, { Component } from 'react';
import { connect } from 'react-redux';

import { updateCategoryOnServer } from '../../store';

class CategoryForm extends Component {
  constructor(props) {
    super(props);
    const { category } = props;
    this.state = {
      id: category ? category.id : '',
      name: category ? category.name : ''
    }
    this.handleChange = this.handleChange.bind(this);
    this.onSave = this.onSave.bind(this);
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
    this.props.updateCategory(this.state);
    this.setState({ name: '' })
  }

  render() {
    const { name } = this.state;
    const { handleChange, onSave } = this;
    return (
      <div>
        <form onSubmit={onSave}>
          <label className="font-weight-bold">Category name</label>
          <input
            placeholder='Category Name'
            name='name'
            value={name}
            className='form-control'
            onChange={handleChange}
          />
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
