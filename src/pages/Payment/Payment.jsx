
import { loadStripe } from '@stripe/stripe-js';
import CheckOutForm from './CheckOutForm'; // Adjust the path as necessary
import { Elements } from '@stripe/react-stripe-js';
import { Helmet } from 'react-helmet-async';

// Stripe public key
const stripePromise = loadStripe('pk_test_51JJjG3IyzOvKR7N2fjUzoyayFK8q9tR1QwZVPhN6l7YYMI7ZZ4EytT6xAwl0DoeSvLJlgUOB7gbpf2FZDlhobWYR007blbKeKw');

const PaymentPage = () => {
    return (
        <div className="container mx-auto p-8">
            <Helmet>
                <title> Payment || Parcel Management </title>

            </Helmet>
            <h1 className="text-3xl font-bold mb-6">Stripe Payment</h1>
            <Elements stripe={stripePromise}>
                <CheckOutForm />
            </Elements>
        </div>
    );
};

export default PaymentPage;
