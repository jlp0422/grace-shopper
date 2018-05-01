import React, { Component } from 'react';
import { connect } from 'react-redux';

class Dropdown extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  render() {
    const { addresses, title } = this.props
    // console.log('add:', addresses)
    // return ('test');
    // if(!addresses.length) return null
    return (
      <div>
        <select className='form-control'>
          <option>Select Your { title }</option>
          {
            addresses.map(address => (
              <option key={address.id}>{address.nickname}</option>
            ))
          }
        </select>
      </div>
    );
  }
}

const mapState = ( state, { addresses, title }) => {
  // console.log('add:', addresses)
  return {
    addresses,
    title
  }
}

export default connect(mapState)(Dropdown);
