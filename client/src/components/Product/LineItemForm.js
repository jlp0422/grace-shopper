import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updateLineItemOnServer } from '../../store';

class LineItemForm extends Component {
  constructor(props) {
    super(props);
    const { productId, orderId, lineItemMap, priceMap } = props;
    this.state = {
      id: orderId ? lineItemMap[productId].lineItemId : null,
      productId: productId,
      quantity: lineItemMap[productId] ? lineItemMap[productId].quantity : 1
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
    this.props.updateLineItem(lineItem);
  }

  render() {
    const { quantity } = this.state;
    const { productId, orderId, priceMap } = this.props;
    const { onChangeLineItem, onSave } = this;
    const quantityArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    const existingQuantity = orderId ? quantity : '';
    const buttonText = orderId ? 'Change Quantity' : 'Add to Cart';
    const total = priceMap[productId] * quantity;
    return (
      <div>
        <form onSubmit={onSave}>
          <select
            className = 'form-control'
            name = 'quantity'
            value = {existingQuantity ? existingQuantity : quantity}
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
          <button style={{ marginBottom: '10px' }} className='btn btn-primary'>{buttonText}</button>
        </form>
        <h6> {orderId ? 'Total Price: ' : '' } {orderId ? total : ''} </h6>
      </div>
    )

  }
}

const mapStateToProps = ({ lineItems, products }, { productId, orderId }) => {
  const lineItemMap = lineItems.reduce((list, lineItem) => {
    if (lineItem.orderId === orderId) {
      if (!list[lineItem.productId]) {
        list[lineItem.productId] = {};
        list[lineItem.productId].quantity = lineItem.quantity;
        list[lineItem.productId].lineItemId = lineItem.id;
      }
    }
    return list;
  }, {});

  const priceMap = products.reduce((list, product) => {
    if(!list[product.id]) {
      list[product.id] = product.price;
    }
    return list;
  },{});

  return {
    lineItemMap,
    priceMap
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    updateLineItem: (lineItem) => dispatch(updateLineItemOnServer(lineItem))
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(LineItemForm);
