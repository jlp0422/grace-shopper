import React from 'react';
import { connect } from 'react-redux';
import PromoForm from './PromoForm';

const Promos = ({promos}) => {
    return(
        <div>
        <h2>Promos</h2>
        <h4> Add New Promo Code: </h4>
        <ul className="list-group">
        <li className="list-group-item">
          <PromoForm empty={ true }/>
        </li>
      </ul>
      <h4> Existing Promo Codes: </h4>
            <ul className='list-group'>
                {
                    promos.map(promo => (
                        <li key={promo.id} className='list-group-item'>
                            <PromoForm promo={promo}/>
                        </li>
                    ))
                }
            </ul>
        </div>
        )
}

const mapState = ({ promos }) => {
    return {
        promos
    }
}

export default connect(mapState)(Promos)