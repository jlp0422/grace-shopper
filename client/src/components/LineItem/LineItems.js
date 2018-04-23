import React from 'react';
import { connect } from 'react-redux';

import LineItemCard from './LineItemCard';
import LineItemForm from './LineItemForm';

const LineItems = ({ lineItems }) => {
  return (
    <div>
      <h2>Line Items</h2>
      <LineItemForm />
      <ul className = 'list-group'>
        {
          lineItems.map(lineItem => {
            return (
              <li key={lineItem.id} className='list-group-item'>
                <LineItemCard lineItem={lineItem} />
              </li>
            )
          })
        }
      </ul>
    </div>
  )
}

const mapStateToProps = ({ lineItems }) => {
  return {
    lineItems
  }
}

export default connect(mapStateToProps)(LineItems);

