import React from 'react';
import { connect } from 'react-redux';

const CreditCards = (props) => {
  const { userCards } = props;
  return (
    <div>
      {
        userCards.map(card => (
          <div key={card.id} style={{borderStyle:'solid'}}>
            <p>Card Type: {card.ccType}</p>
            <p>{'****************' + card.ccNum.slice(-4)}</p>
            <p>Expiration: {card.ccExp}</p>
            <p>Security Code: {card.ccSec}</p>
          </div>
        ))
      }
    </div>
  );
}

const mapState = ({ creditCards, user }) => {
  const userCards = creditCards.filter(card => card.userId === user.id)
  return {
    userCards
  }
}

export default connect(mapState)(CreditCards);
