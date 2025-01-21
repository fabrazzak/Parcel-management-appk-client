import React, { useState } from 'react';
import Chart from 'react-apexcharts'; // Assuming you installed react-apexcharts
import { ChartBar } from 'lucide-react';

const Statistics = () => {
    // Define chart options and series using useState
    const [chartData] = useState({
        options: {
            chart: {
                type: 'bar',
                height: 350,
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
            stroke: {
                show: true,
                width: 2,
                colors: ['transparent'],
            },
            xaxis: {
                categories: ['Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'],
            },
            yaxis: {
                title: {
                    text: '$ (thousands)',
                },
            },
            fill: {
                opacity: 1,
            },
            tooltip: {
                y: {
                    formatter: (val) => `$ ${val} thousands`,
                },
            },
        },
        series: [
            {
                name: 'Net Profit',
                data: [44, 55, 57, 56, 61, 58, 63, 60, 66],
            },
            {
                name: 'Revenue',
                data: [76, 85, 101, 98, 87, 105, 91, 114, 94],
            },
            {
                name: 'Free Cash Flow',
                data: [35, 41, 36, 26, 45, 48, 52, 53, 41],
            },
        ],
    });

    return (
        <div>
            <h2>This is the Statistics page</h2>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <ChartBar size={24} />
                <h3>Bar Chart Example</h3>
            </div>
            {/* Use react-apexcharts Chart component */}
            <Chart
                options={chartData.options}
                series={chartData.series}
                type="bar"
                height={350}
            />
        </div>
    );
};

export default Statistics;
