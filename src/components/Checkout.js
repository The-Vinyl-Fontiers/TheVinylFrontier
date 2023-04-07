import React, { useState } from 'react';
import StripeCheckout from 'react-stripe-checkout';

const Checkout = ({ cartTotal }) => {
    const [cart] = useState({
        name: 'My cart',
        price: cartTotal,
        description: 'My Product Description'
    });

    const handleToken = (token) => {
        console.log(token);
        alert('Payment Successful!');
    }

    return (
        <div>
            <h1>{cart.name}</h1>
            <h3>Price: ${cart.price}</h3>
            <StripeCheckout
                stripeKey={process.env.STRIPE_API_KEY}
                token={handleToken}
                amount={cart.price * 100}
                name={cart.name}
                description={cart.description}
                billingAddress={true}
                shippingAddress={true}

            />
        </div>
    );
};

export default Checkout;
