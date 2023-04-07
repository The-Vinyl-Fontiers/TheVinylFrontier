import React from 'react';
import { useStripe } from '@stripe/react-stripe-js';

const StripeCheckoutButton = ({ cartSubtotal, cartTaxTotal }) => {
    const stripe = useStripe();

    const handleClick = async (event) => {
        // Call your backend to create a Stripe Checkout Session
        const response = await fetch('/api/create-checkout-session', {
            method: 'POST',
            body: JSON.stringify({
                amount: (cartSubtotal + cartTaxTotal) * 100, // Stripe expects amount in cents
                // Add any additional information here that you need to pass to your backend
            }),
            headers: {
                'Content-Type': 'application/json',
            },
        });
        const { sessionId } = await response.json();

        // Redirect the user to the Stripe Checkout page
        const result = await stripe.redirectToCheckout({
            sessionId,
        });

        if (result.error) {
            console.error(result.error);
        }
    };

    return <button onClick={handleClick}>Checkout</button>;
};

export default StripeCheckoutButton;
