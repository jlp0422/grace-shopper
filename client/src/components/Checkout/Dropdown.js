import React, { Component } from 'react';
import { connect } from 'react-redux';

const Dropdown = (props) => {
  const { items, title, name, handleChange, readOnly } = props;
  console.log(readOnly)
  return (
    <div>
    {
      readOnly ? <p>No { title } selected </p> :
        items.length ? (
          <select className='form-control' name={name} onChange={ handleChange }>
            <option>Select Your { title }</option>
            {
              items.map(item => (
                <option key={item.id} value={item.id}>
                  {item.ccType ? (`${item.ccType} ****${item.ccNum.slice(-4)}`) : item.nickname}
                </option>
              ))
            }
          </select>
        ) : (
          <p>You have no saved {title}s</p>
        )
      }
    </div>
  );
}

const mapState = ( state, { items, title, name, handleChange, readOnly }) => {
  return {
    items,
    title,
    name,
    handleChange,
    readOnly
  }
}

export default connect(mapState)(Dropdown);
