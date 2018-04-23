import React from 'react';
import { connect } from 'react-redux';
import { deleteLineItemFromServer } from '../../store';

import LineItemForm from './LineItemForm';
import LineItemCard from './LineItemCard';

const LineItemInfo = ({ lineItem, deleteLineItem }) => {
  if (!lineItem) {
    return null;
  }
  return (
    <div>
      <div className='row'>
        <div className='col'>
          <h2>Line Item</h2>
          <LineItemCard lineItem={lineItem} />
          <LineItemForm lineItem={lineItem} />
          <button onClick={() => deleteLineItem(lineItem.id)} className='btn btn-danger'>Delete Line Item</button>
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = ({ lineItems }, { match }) => {
  const id = match.params.id * 1;
  const lineItem = lineItems.find(lineItem => lineItem.id === id);
  return {
    lineItem
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    deleteLineItem: (lineItemId) => dispatch(deleteLineItemFromServer(lineItemId))    
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LineItemInfo);