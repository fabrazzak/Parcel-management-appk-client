import React, { useEffect, useState } from 'react';
import Chart from 'react-apexcharts'; // Assuming you installed react-apexcharts
import { ChartBar, LineChart } from 'lucide-react';
import useAxiosSecures from '@/src/hooks/useAxiosSecures';

const Statistics = () => {
    
    const axiosSecures = useAxiosSecures();

    const [barChartData, setBarChartData] = useState(null);
    const [lineChartData, setLineChartData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axiosSecures.get('chart-data');

               
                let totalCanceled=[]
              
                const delivered = response?.data?.parcelsByStatus?.map((m) => {
                    if (m.status == "pending" ||  m.status == "on-the-way") {
                        totalCanceled.push(0) 
                        return 0
                    }else if (m.status == "canceled" ) {
                        return totalCanceled.push(m.count) 
                    }
                    totalCanceled.push(0) 
                    return m.count;

                })
              



                // Prepare Bar Chart Data
                setBarChartData({
                    options: {
                        chart: {
                            type: 'bar',
                            height: 470,
                        },
                        
                        plotOptions: {
                            bar: {
                                horizontal: false,
                                columnWidth: '55%',
                                borderRadius: 5,
                            },
                        },
                        dataLabels: {
                            enabled: false,
                        },
                        xaxis: {
                            categories: response.data.monthlyParcels.map((m) => m.month),
                        },
                        yaxis: {
                            title: {
                                text: 'Bookings by Month',
                            },
                        },
                        tooltip: {
                            y: {
                                formatter: (val) => `${val} bookings`,
                            },
                        },
                    },
                    series: [
                        {
                            name: 'Bookings',
                            data: response.data.monthlyParcels.map((m) => m.totalParcels),
                        },
                    ],
                });

                // Prepare Line Chart Data
                setLineChartData({
                    options: {
                        chart: {
                            type: 'line',
                            height:450,
                        },
                        dataLabels: {
                            enabled: false,
                        },
                        stroke: {
                            curve: 'smooth',
                            width: 2,
                        },
                        xaxis: {
                            categories: response.data.monthlyParcels.map((m) => m.month),
                        },
                        yaxis: {
                            title: {
                                text: 'Parcels',
                            },
                        },
                        tooltip: {
                            y: {
                                formatter: (val) => `${val} parcels`,
                            },
                        },
                    },
                    series: [
                        {
                            name: 'Booked Parcels',
                            data: response.data.monthlyParcels.map((m) => m.totalParcels) },
                        {
                            name: 'Delivered Parcels',
                            data: delivered, 
                        },{
                            name: 'Canceled Parcels',
                            data: totalCanceled, 
                        }
                    ],
                });
            } catch (error) {
                console.error('Error fetching chart data:', error);
            }
        };
        
        console.log("hello")

        fetchData();
    }, [axiosSecures]);

    return (
        <div className='container  mx-auto p-8 rounded-lg shadow-lg bg-white overflow-x-auto  w-[360px] lg:w-full md:w-[700px]'>

            <h1 className="text-3xl font-bold text-[#9538E2] mb-10">
                Admin Dashboard: Statistics
            </h1>
            <div className=" grid grid-cols-2 gap-8   ">



                {/* Bar Chart Section */}
                {barChartData && (
                    <div className='shadow-lg p-10 rounded-sm' style={{ marginBottom: '30px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <ChartBar size={24} />
                            <h3 className='font-bold'>Bookings by Date</h3>
                        </div>
                        <Chart
                            options={barChartData.options}
                            series={barChartData.series}
                            type="bar"
                            height={350}
                        />
                    </div>
                )}

                {/* Line Chart Section */}
                {lineChartData && (
                    <div className='shadow-lg p-6 rounded-sm'>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <LineChart size={24} />
                            <h3 className='font-bold'>Comparison: Booked vs Delivered Parcels</h3>
                        </div>
                        <Chart
                            options={lineChartData.options}
                            series={lineChartData.series}
                            type="line"
                            height={350}
                        />
                    </div>
                )}
            </div>
        </div>


    );
};

export default Statistics;
