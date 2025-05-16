import { Card, CardContent } from '@/src/components/ui/card';
import React from 'react';
import { FaBox, FaCheckCircle, FaShippingFast, FaUserCheck } from 'react-icons/fa';

const HowItWork = () => {
    const steps = [
        { icon: <FaBox size={30} />, title: "Book Your Parcel", description: "Enter details and book instantly." },
        { icon: <FaUserCheck size={30} />, title: "Assign to Courier", description: "We assign a trusted delivery partner." },
        { icon: <FaShippingFast size={30} />, title: "Delivery in Progress", description: "Track your package in real-time." },
        { icon: <FaCheckCircle size={30} />, title: "Parcel Delivered", description: "Your package arrives safely." }
      ];
    return (
        <section className="py-12 bg-gray-100 dark:bg-black text-gray-800 text-center">
        <h2 className="text-3xl font-bold mb-8 dark:text-white ">How It Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6justify-center gap-6 max-w-[1200px] mx-auto">
          {steps.map((step, index) => (
            <Card key={index} className="   text-center p-6 bg-white dark:bg-black shadow-md rounded-lg transform transition-transform hover:scale-105 hover:shadow-xl">
              <CardContent>
                <div className="text-primary mx-auto text-center flex justify-center mb-4">{step.icon}</div>
                <h3 className="text-lg font-semibold">{step.title}</h3>
                <p className="text-sm text-gray-400">{step.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    );
};

export default HowItWork;