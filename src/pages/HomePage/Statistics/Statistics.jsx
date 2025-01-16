import { Card, CardContent, CardTitle } from '@/src/components/ui/card';

import CountUp from 'react-countup';

const Statistics = () => {
    const stats = [
        {
            title: "Parcels Booked",
            value: 12000
        },
        {
            title: "Parcels Delivered",
            value: 11500
        },
        {
            title: "Registered Users",
            value: 8500
        }
    ];
    return (
        <div className="py-12 bg-white">
            <div className="max-w-[1200px] mx-auto px-4 text-center">
                <h2 className="text-3xl font-bold mb-8 text-gray-800">Our Statistics</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {stats.map((stat, index) => (
                        <Card 
                            key={index} 
                            className="p-6 bg-gray-100 shadow-md rounded-lg transform transition-transform hover:scale-105 hover:shadow-xl">
                            <CardContent>
                                <h3 className="text-5xl font-bold text-[#9538E2] mb-4">
                                    <CountUp end={stat.value} duration={10} />
                                </h3>
                                <CardTitle className="text-xl font-semibold mb-2">{stat.title}</CardTitle>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Statistics;