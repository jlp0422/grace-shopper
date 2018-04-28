import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { updateLineItemOnServer } from '../../store';

class LineItemForm extends Component {
  constructor(props) {
    super(props);
    const { productId, orderId, lineItems/*, productMap*/ } = props;
    let lineItem = lineItems.find(lineItem => lineItem.productId === productId && lineItem.orderId === orderId)

    // console.log('PI:', productId, 'OI:', orderId)

    this.state = {
      id: lineItem ? lineItem.id : '',
      orderId: lineItem ? orderId : '',
      productId: lineItem ? productId : '',
      quantity: lineItem ? lineItem.quantity : 1
    }
    this.onChangeLineItem = this.onChangeLineItem.bind(this);
    this.onSave = this.onSave.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    const { id, orderId, productId, quantity } = nextProps;
    this.setState({ id, orderId, productId, quantity });
  }

  onChangeLineItem(ev) {
    this.setState({ quantity: ev.target.value * 1 });
  }

  onSave(ev) {
    ev.preventDefault();
    this.props.updateLineItem(this.state);
    // this.setState({ id, orderId, productId, quantity });
  }

  render() {

    // console.log('LI:', this.state)

    const { quantity } = this.state;
    const { productId, orderId/*, priceMap*/ } = this.props;
    const { onChangeLineItem, onSave } = this;
    const quantityArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    // const existingQuantity = orderId ? quantity : '';
    const buttonText = orderId ? 'Change Quantity' : 'Add to Cart';
    // const total = priceMap[productId] * quantity;
    return (
      <div>
        <form onSubmit={onSave}>
          <select
            className = 'form-control'
            name = 'quantity'
            value = {quantity}
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
        {/*<h6> {orderId ? 'Total Price: ' : '' } {orderId ? total : ''} </h6>*/}
      </div>
    )

  }
}

const mapState = ({ lineItems, orders, user }, { productId, orderId }) => {
  const order = orders.find(order => order.id === orderId);

  const orderLineItems = lineItems.filter(item => item.orderId === order.id)

  // const productMap = orderLineItems.reduce((memo, lineItem) => {
  //   const id = lineItem.productId;
  //     memo[id] = {};
  //     memo[id].quantity = lineItem.quantity;
  //     memo[id].lineItemId = lineItem.id;
  //   return memo;
  // }, {});



  //   const productMap = lineItems.reduce((memo, lineItem) => {
  //   if (order && lineItem.orderId === order.id) {
  //     const prodId = lineItem.productId;
  //     if (!memo[prodId]) {
  //       memo[prodId] = {};
  //       memo[prodId].quantity = lineItem.quantity;
  //       memo[prodId].lineItemId = lineItem.id;
  //     }
  //   }
  //   return memo;
  // }, {});

    // console.log('MAP:', productMap)

  return {
    orderId,
    productId,
    lineItems,
    // productMap
  }
}

const mapDispatch = (dispatch) => {
  return {
    updateLineItem: (lineItem) => dispatch(updateLineItemOnServer(lineItem))
  }
};

export default withRouter(connect(mapState, mapDispatch)(LineItemForm));
