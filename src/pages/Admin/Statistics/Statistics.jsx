import React, { useEffect, useState } from 'react';
import Chart from 'react-apexcharts';
import { ChartBar, LineChart } from 'lucide-react';
import useAxiosSecures from '@/src/hooks/useAxiosSecures';
import { Helmet } from 'react-helmet-async';

const Statistics = () => {
  const axiosSecures = useAxiosSecures();

  const [barChartData, setBarChartData] = useState(null);
  const [lineChartData, setLineChartData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosSecures.get('chart-data');

        let totalCanceled = [];

        const delivered = response?.data?.parcelsByStatus?.map((m) => {
          if (m.status === 'pending' || m.status === 'on-the-way') {
            totalCanceled.push(0);
            return 0;
          } else if (m.status === 'canceled') {
            return totalCanceled.push(m.count);
          }
          totalCanceled.push(0);
          return m.count;
        });

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

        setLineChartData({
          options: {
            chart: {
              type: 'line',
              height: 450,
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
              data: response.data.monthlyParcels.map((m) => m.totalParcels),
            },
            {
              name: 'Delivered Parcels',
              data: delivered,
            },
            {
              name: 'Canceled Parcels',
              data: totalCanceled,
            },
          ],
        });
      } catch (error) {
        console.error('Error fetching chart data:', error);
      }
    };

    fetchData();
  }, [axiosSecures]);

  return (
    <div className="container mx-auto p-4 sm:p-6 lg:p-8 rounded-lg shadow-lg bg-white w-full overflow-x-auto">
      <Helmet>
        <title>Statistics || Parcel Management</title>
      </Helmet>

      <h1 className="text-2xl sm:text-3xl font-bold text-[#9538E2] mb-6 sm:mb-10 text-center sm:text-left">
        Admin Dashboard: Statistics
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
        {/* Bar Chart Section */}
        {barChartData && (
          <div className="shadow-lg p-4 sm:p-6 md:p-8 rounded-md bg-white">
            <div className="flex items-center gap-2 mb-4">
              <ChartBar size={24} />
              <h3 className="font-bold text-base sm:text-lg">
                Bookings by Date
              </h3>
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
          <div className="shadow-lg p-4 sm:p-6 md:p-8 rounded-md bg-white">
            <div className="flex items-center gap-2 mb-4">
              <LineChart size={24} />
              <h3 className="font-bold text-base sm:text-lg">
                Comparison: Booked vs Delivered Parcels
              </h3>
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
