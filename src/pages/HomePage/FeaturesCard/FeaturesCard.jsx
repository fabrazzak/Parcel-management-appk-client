import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/src/components/ui/card';
import React from 'react';
import { FaClock, FaShieldAlt, FaTruck } from 'react-icons/fa';

const FeaturesCard = () => {
    const features = [
        {
            icon: <FaShieldAlt size={40} className="text-[#9538E2]" />,
            title: "Parcel Safety",
            description: "Your parcels are handled with the utmost care and security."
        },
        {
            icon: <FaTruck size={40} className="text-[#9538E2]" />,
            title: "Super Fast Delivery",
            description: "Experience lightning-fast delivery to your doorstep."
        },
        {
            icon: <FaClock size={40} className="text-[#9538E2]" />,
            title: "On-Time Service",
            description: "We value your time and ensure on-time delivery, every time."
        }
    ];
    return (
        <div className="py-12 bg-gray-100">
            <div className="max-w-[1200px] mx-auto px-4 text-center">
                <h2 className="text-3xl font-bold mb-8 text-gray-800">Our Features</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {features.map((feature, index) => (
                        <Card
                            key={index}
                            className="p-6 bg-white shadow-md rounded-lg transform transition-transform hover:scale-105 hover:shadow-xl">
                            <CardHeader className="flex justify-center  items-center">
                                {feature.icon}
                            </CardHeader>
                            <CardContent>
                                <CardTitle className="text-xl font-semibold mb-2">{feature.title}</CardTitle>
                                <CardDescription className="text-gray-600">
                                    {feature.description}
                                </CardDescription>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default FeaturesCard;