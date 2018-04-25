import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updateLineItemOnServer } from '../../store';

class LineItemForm extends Component {
  constructor(props) {
    super(props);
    const { productId, orderId, lineItemMap } = props;
    this.state = {
      id: orderId ? lineItemMap[productId].lineItemId : null,
      productId: productId,
      quantity: lineItemMap[productId] ? lineItemMap[productId] : 1
    }  
    this.onChangeLineItem = this.onChangeLineItem.bind(this);
    this.onSave = this.onSave.bind(this);
  }

  onChangeLineItem(ev) {
    this.setState({ quantity: ev.target.value })
  }

  onSave(ev) {
    ev.preventDefault();
    const lineItem = this.state;
    console.log(lineItem);
    this.props.updateLineItem(lineItem);
  }

  render() {
    const { quantity } = this.state;
    const { productId, orderId } = this.props;
    const { onChangeLineItem, onSave } = this;
    const quantityArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    const existingQuantity = orderId ? {quantity} : '';
    return (
      <div>
        <form onSubmit={onSave}>
          <select
            className = 'form-control'
            name = 'quantity'
            onChange = {onChangeLineItem}
            style={{ marginBottom: '10px' }}        
          >
            <option value=''>Select Quantity</option>
            {
              quantityArray.map(quantity => {
                return (
                  <option key = {quantity} value = {quantity}>{quantity}</option>
                )
              })
            }            
          </select>
          <button style={{ marginBottom: '10px' }} className='btn btn-primary'>Add to Cart</button>
        </form>
      </div>
    )

  }
}

const mapStateToProps = ({ lineItems }, { productId, orderId }) => {
  const lineItemMap = lineItems.reduce((list, lineItem) => {
    if (lineItem.orderId === orderId) {
      if (!list[lineItem.productId]) {
        list[lineItem.productId] = {};
        list[lineItem.productId].quantity = lineItem.quantity;
        list[lineItem.productId].lineItemId = lineItem.id;
      }
    }
    return list;
  }, {})
  return {
    lineItemMap
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    updateLineItem: (lineItem) => dispatch(updateLineItemOnServer(lineItem))
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(LineItemForm);
