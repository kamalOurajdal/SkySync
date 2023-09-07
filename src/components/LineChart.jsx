import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, Ticks } from "chart.js/auto";

const LineChart = ({data}) => {
  const dataChart = {
    labels: data.time,
    datasets: [
      {
        data: data.data,
        fill: false,
        // responsive: true,
        borderColor: 'orange',
        backgroundColor:'blue',
        pointHoverBackgroundColor:'blue',
        tension: 0.2,
      },
    ],
  };

  const options = {
    plugins: {
      legend: {
        display: false,
      },
      datalabels: { // Enable data labels
        display: true,
        color: 'black', // Label color
      },
    },
    scales: {
      x: {
        display: false,
      },
      y: {
        display: false,
        
      },
    },
  };

  return (
    <div className=" mt-6  w-full px-6">
      <Line data={dataChart} options={options}   height={20} />
    </div>
  );
};

export default LineChart;
