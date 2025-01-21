import React from 'react';
import ReactConfetti from 'react-confetti';

import { useNavigate } from 'react-router-dom'; // Use `useNavigate` from `react-router-dom` to handle routing
import { CheckCircle } from 'lucide-react';
import { Button } from '@/src/components/ui/button';
import { Helmet } from 'react-helmet-async';

const PaymentSuccess = () => {
  const navigate = useNavigate(); // Set up navigation

  // To get the window dimensions for confetti
  const width = window.innerWidth - 100;
  const height = window.innerHeight;

  return (
    <div className="flex flex-col  items-center justify-center min-h-screen bg-gradient-to-br rounded-md from-purple-600 to-indigo-800 text-white">
      {/* Confetti Effect */}
      <ReactConfetti width={width} height={height} recycle={false} />
      <Helmet>
        <title> Payment Success  || Parcel Management </title>

      </Helmet>

      {/* Success Message */}
      <div className="bg-white text-gray-800 rounded-lg shadow-lg p-8 md:p-12 text-center max-w-md ">
        <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
        <h1 className="text-2xl font-bold mb-4">Payment Successful!</h1>
        <p className="text-gray-600 mb-6">
          Your payment has been processed successfully. Thank you for your purchase!
        </p>
        <div className="space-y-4">
          {/* View Order Details Button */}
          <Button
            className="w-full bg-purple-600 hover:bg-purple-700 text-white"
            onClick={() => navigate('/orders')}
          >
            View Order Details
          </Button>
          {/* Return Home Button */}
          <Button
            variant="outline"
            className="w-full border-purple-600 text-purple-600 hover:bg-purple-100"
            onClick={() => navigate('/')}
          >
            Return to Home
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;
