import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updateLineItemOnServer } from '../../store';

class LineItemForm extends Component {
  constructor(props) {
    super(props);
    const { lineItem } = props;
    this.state = {
      id: lineItem ? lineItem.id : null,
      quantity: lineItem ? lineItem.quantity : '',
      productId: lineItem ? lineItem.productId : null,
      orderId: lineItem ? lineItem.orderId : null
    }  
    this.onChangeLineItem = this.onChangeLineItem.bind(this);
    this.onSave = this.onSave.bind(this);
  }

  onChangeLineItem(ev) {
    const change = {};
    change[ev.target.name] = ev.target.value * 1;
    this.setState(change)
  }

  onSave(ev) {
    ev.preventDefault();
    const lineItem = this.state;
    this.props.updateLineItem(lineItem);
  }

  render() {
    const { id, quantity, productId, orderId } = this.state;
    const { products, orders } = this.props;
    const { onChangeLineItem, onSave } = this;
    return (
      <div>
        <form onSubmit={onSave}>
          <input
            className='form-control'
            placeholder='Quantity'
            name='quantity'
            value={quantity}
            onChange={onChangeLineItem}
            style={{ marginBottom: '10px' }}
          />
          <select
            className='form-control'
            name='productId'
            onChange={ onChangeLineItem }
            style={{ marginBottom: '10px' }}            
          >
            <option value=''>Select Product ID</option>
            {
              products.map(product => {
                return (
                  <option key={product.id} value={product.id}>{product.id}</option>
                )
              })
            }
          </select>
          <select
            className = 'form-control'
            name = 'orderId'
            onChange = {onChangeLineItem}
            style={{ marginBottom: '10px' }}            
          >
            <option value = ''>Select Order ID</option>
            {
              orders.map(order => {
                return (
                  <option key = {order.id} value = {order.id}>{order.id}</option>
                )
              })
            }
          </select>
          <button style={{ marginBottom: '10px' }} className='btn btn-primary'>Submit</button>
        </form>
      </div>
    )
  }
}

const mapStateToProps = ({ products, orders }) => {
  return {
    products,
    orders
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateLineItem: (lineItem) => dispatch(updateLineItemOnServer(lineItem))
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(LineItemForm);
