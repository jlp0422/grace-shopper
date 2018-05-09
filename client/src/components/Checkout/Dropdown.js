import React, { Component } from 'react';
import { connect } from 'react-redux';

const Dropdown = ({items, title, name, handleChange, readOnly, card, shipping, billing, status }) => {
  return (
    <div>
    {
      readOnly ? <p>{status === 'cart' ? (`Select a ${title}`) : (`Click "Edit" to change ${title} `)}</p> :
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

const mapState = ( { addresses, creditCards} , { items, title, name, handleChange, readOnly, order, status }) => {
  const shipping = order && addresses.find(address => address.id === order.shippingId)
  const billing = order && addresses.find(address => address.id === order.billingId)
  const card = order && creditCards.find(card => card.id === order.creditCardId)
  return {
    items,
    title,
    name,
    handleChange,
    readOnly,
    shipping,
    billing,
    card,
    status
  }
}

export default connect(mapState)(Dropdown);
