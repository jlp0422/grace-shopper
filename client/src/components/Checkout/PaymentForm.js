import React from 'react';

const fields = {
  type: 'Visa',
  number: '5555555555',
  expiry: '11/2022',
  cvv: '777'
}


const PaymentForm = () => {
  return (
    <div>
    <h4> Payment Details </h4>
    <form>
      {
        Object.keys(fields).map(field => (
          <input
            key={field}
            placeholder={`${fields[field]}`}
            name={field}
            style={{ marginBottom: '10px' }}
          />
        ))
      }
    </form>
    </div>
);
}

export default PaymentForm;
