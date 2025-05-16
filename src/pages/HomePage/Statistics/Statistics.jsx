import { Card, CardContent, CardTitle } from '@/src/components/ui/card';
import useAllGetBookParcels from '@/src/hooks/useAllGetBookParcels';
import useAllGetUsers from '@/src/hooks/useAllGetUsers';
import useAxiosSecures from '@/src/hooks/useAxiosSecures';
import { useEffect, useState } from 'react';

import CountUp from 'react-countup';

const Statistics = () => {
   const{allBookParcels} =useAllGetBookParcels()
   const {data}=useAllGetUsers()
   const axiosSecures = useAxiosSecures();
   const [bookedData,setBookedData]=useState([])
   useEffect(()=>{
    const fetchData= async()=>{
      const response=  await axiosSecures.get('chart-data');
      setBookedData(response.data)

    }
    fetchData()
    
   },[])
   const deliveredData = bookedData?.parcelsByStatus?.find(item => item.status === 'delivered');
   const deliveredCount = deliveredData ? deliveredData.count : 0;
   console.log(bookedData,"Book Data")


    const stats = [
        {
            title: "Parcels Booked",
            value: allBookParcels?.length
        },
        {
            title: "Parcels Delivered",
            value: deliveredCount ? deliveredCount : 0
        },
        {
            title: "Registered Users",
            value: data?.users?.length
        }
    ];
    return (
        <div className="py-12  bg-gradient-to-r from-purple-500 to-purple-700 dark:from-black/80 darK:to-black/60">
            <div className="max-w-[1200px] mx-auto px-4 text-center">
                <h2 className="text-3xl font-bold mb-8 text-white">Our Statistics</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {stats.map((stat, index) => (
                        <Card 
                            key={index} 
                            className="p-6 bg-gray-100 dark:bg-black shadow-md rounded-lg transform transition-transform hover:scale-105 hover:shadow-xl">
                            <CardContent>
                                <h3 className="text-5xl font-bold text-[#9538E2] dark:text-white mb-4">
                                    <CountUp end={stat.value} duration={2} />
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