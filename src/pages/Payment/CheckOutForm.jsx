import React, { useState } from 'react';
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import axios from 'axios';
import useAxiosSecures from '@/src/hooks/useAxiosSecures';
import { useNavigate } from 'react-router-dom';

const CheckOutForm = () => {
    const stripe = useStripe();
    const elements = useElements();
    const [loading, setLoading] = useState(false);
    const axiosSecures=useAxiosSecures()
    const navigate=useNavigate()

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!stripe || !elements) return;

        const card = elements.getElement(CardElement);
        if (!card) return;

        setLoading(true);
        try {
            const { data } = await axiosSecures.post('https://percel-management-app-server.vercel.app/create-payment-intent', {
                amount: 1000,
                currency: 'usd',
            });

            const { error: confirmError, paymentIntent } = await stripe.confirmCardPayment(
                data.clientSecret,
                {
                    payment_method: {
                        card: card,
                    },
                }
            );

            if(paymentIntent.status =="succeeded"){
                navigate("/dashboard/payment-success")
            }

            if (confirmError) {
                console.error('Error confirming payment:', confirmError);
                return;
            }

            console.log('Payment successful:', paymentIntent);
        } catch (error) {
            console.error('Payment Error:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="shadow-lg p-8">
            <CardElement
                className="p-2 rounded-lg border"
                options={{
                    style: {
                        base: {
                            fontSize: '16px',
                            color: '#424770',
                            '::placeholder': { color: '#aab7c4' },
                        },
                        invalid: { color: '#9e2146' },
                    },
                }}
            />
            <button
                className="btn bg-purple-600 px-8 py-2 rounded-lg mt-4 text-white font-bold"
                type="submit"
                disabled={!stripe || loading}
            >
                {loading ? 'Processing...' : 'Pay'}
            </button>
        </form>
    );
};

export default CheckOutForm;
