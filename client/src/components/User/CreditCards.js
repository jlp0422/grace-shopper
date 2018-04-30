import React from 'react';
import { connect } from 'react-redux';

import CreditCardForm from '../Checkout/CreditCardForm';

import { deleteCreditCardOnServer } from '../../store';

const CreditCards = (props) => {
  const { userCards, user, deleteCard } = props;
  // if(!user) return null

  // console.log(user);
  return (
    <div>
      {
        userCards.map(card => (
          <div key={card.id} style={{borderStyle:'solid'}}>
            <p>Card Type: {card.ccType}</p>
            <p>{'****************' + card.ccNum.slice(-4)}</p>
            <p>Expiration: {card.ccExp}</p>
            <p>Security Code: {card.ccSec}</p>

            <button onClick={() => deleteCard(card.id)}>Delete Card</button>

          </div>



        ))
      }
      <CreditCardForm userId={user.id} />
    </div>
  );
}

const mapState = ({ creditCards, user }) => {
  const userCards = creditCards.filter(card => card.userId === user.id)
  return {
    userCards,
    user
  }
}

const mapDispatch = (dispatch) => {
  return {
    deleteCard: (id) => dispatch(deleteCreditCardOnServer(id))
  }
}

export default connect(mapState, mapDispatch)(CreditCards);
