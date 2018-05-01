import React, { Component } from 'react';
import { connect } from 'react-redux';

class Dropdown extends Component {
  constructor() {
    super();
    this.state = {}
  }

  render() {
    const { items, title } = this.props;

    console.log(items)

    return (
      <div>
        {
          items.length ? (
            <select className='form-control'>
              <option>Select Your { title }</option>
              {
                items.map(item => (
                  <option key={item.id} value={item.id}>
                    {item.ccType ? `${item.ccType} ****${item.ccNum.slice(-4)}` : item.nickname}
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
}

const mapState = ( state, { items, title }) => {
  return {
    items,
    title
  }
}

export default connect(mapState)(Dropdown);
