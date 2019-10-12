import React from 'react';
import { PayPalButton } from "react-paypal-button-v2";
 
export default class Example extends React.Component {
  render() {
    return (
      <PayPalButton
        amount="0.01"
        onSuccess={(details, data) => {
          alert("Transaction completed by " + details.payer.name.given_name);
 
          // OPTIONAL: Call your server to save the transaction
          return fetch("/paypal-transaction-complete", {
            method: "post",
            body: JSON.stringify({
              orderId: data.orderID
            })
          });
        }}
        options={{
          clientId: "PRODUCTION_CLIENT_ID"
        }}
      />
    );
  }
}