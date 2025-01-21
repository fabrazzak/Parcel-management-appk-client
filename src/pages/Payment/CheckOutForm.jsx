import React, { useState } from 'react';
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import { Button } from "@/src/components/ui/button";
import axios from 'axios';
import useAxiosSecures from '@/src/hooks/useAxiosSecures';

const CheckOutForm = () => {
    const stripe = useStripe();
    const elements = useElements();
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const axiosSecures=useAxiosSecures()

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);

        const cardElement = elements.getElement(CardElement);

        if (!stripe || !elements || !cardElement) {
            setMessage("Stripe is not initialized. Please try again later.");
            setLoading(false);
            return;
        }

        try {
            // Send payment intent request to the server
            const { data } = await axiosSecures.post('create-payment-intent', {
                amount: 1000, // Example amount in cents
                currency: 'usd',
            });

            // Confirm payment with Stripe
            const { error, paymentIntent } = await stripe.confirmCardPayment(data.clientSecret, {
                payment_method: {
                    card: cardElement,
                },
            });
            console.log(paymentIntent)

            if (error) {
                setMessage(`Payment failed: ${error.message}`);
            } else if (paymentIntent.status === 'succeeded') {
                setMessage('Payment successful!');
            }
        } catch (error) {
            setMessage(`Error: ${error.response?.data?.error || error.message}`);
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div className="border rounded-lg p-4">
                <CardElement options={{ hidePostalCode: true }} />
            </div>
            <Button type="submit" disabled={!stripe || loading} className="bg-[#9538E2] text-white w-full">
                {loading ? 'Processing...' : 'Pay'}
            </Button>
            {message && <p className="text-red-500 mt-4">{message}</p>}
        </form>
    );
};

export default CheckOutForm;
