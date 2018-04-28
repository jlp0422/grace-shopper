import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { updateLineItemOnServer, deleteLineItemFromServer } from '../../store';

class LineItemForm extends Component {
  constructor(props) {
    super(props);
    const { productId, orderID, lineItems/*, productMap*/ } = props;
    let lineItem = lineItems.find(lineItem => lineItem.productId === productId && lineItem.orderId === orderID)

    // console.log('PI:', productId, 'OI:', orderId)

    this.state = {
      id: lineItem ? lineItem.id : '',
      // orderId: orderId ? orderId : '',
      // productId: productId ? productId : '',
      quantity: lineItem ? lineItem.quantity : 1
    }
    this.onChangeLineItem = this.onChangeLineItem.bind(this);
    this.onSave = this.onSave.bind(this);
  }

  // componentWillReceiveProps(nextProps) {
  //   console.log(nextProps)
  //   const { id, orderId, productId, quantity } = nextProps;
  //   this.setState({ id, orderId, productId, quantity });
  // }

  onChangeLineItem(ev) {
    this.setState({ quantity: ev.target.value * 1 });
  }

  onSave(ev) {
    ev.preventDefault();
    const { quantity } = this.state;
    const { productId, orderID } = this.props;


    const save = { productId, orderID, quantity };
    this.props.updateLineItem(save);
    // this.setState({ id, orderId, productId, quantity });
  }

  render() {

    // console.log('LI:', this.state)

    const { quantity, id } = this.state;
    const { productId, orderID/*, priceMap*/, deleteLineItem } = this.props;
    const { onChangeLineItem, onSave } = this;
    const buttonText = orderID ? 'Change Quantity' : 'Add to Cart';
    return (
      <div>
        <form onSubmit={onSave}>
          <input
            type='number'
            className='form-control'
            value={quantity}
            placeholder='Select Quantity'
            onChange={onChangeLineItem}
            style={{ marginBottom: '10px' }}
          />
          <button style={{ marginBottom: '10px' }} className='btn btn-primary'>{buttonText}</button>
        </form>
        {
          id ? (
          <button
            style={{ marginBottom: '10px' }}
            className='btn btn-warning'
            onClick={() => deleteLineItem(id)}
          >
            Remove From Cart
          </button>
          ) : null
        }
      </div>
    )

  }
}

const mapState = ({ lineItems, orders, user}, { productId, orderId }) => {

  // console.log(orderId)
  // const order = ;

  const orderID = !orderId ? orders.find(order => order.userId === user.id) : orderId

  // const orderLineItems = lineItems.filter(item => item.orderId === order.id)

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
    orderID,
    productId,
    lineItems,
    // productMap
  }
}

const mapDispatch = (dispatch) => {
  return {
    updateLineItem: (lineItem) => dispatch(updateLineItemOnServer(lineItem)),
    deleteLineItem: (id) => dispatch(deleteLineItemFromServer(id))
  }
};

export default withRouter(connect(mapState, mapDispatch)(LineItemForm));
