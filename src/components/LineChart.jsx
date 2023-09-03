import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, Ticks } from "chart.js/auto";

const LineChart = ({data}) => {
  console.log(data);
  const dataChart = {
    labels: data.time,
    datasets: [
      {
        data: data.data,
        fill: false,
        // responsive: true,
        borderColor: 'yellow',
        backgroundColor:'red',
        pointHoverBackgroundColor:'blue',
        tension: 0.1,
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
    <div className=" pt-6">
      <Line data={dataChart} options={options}   height={20}/>
    </div>
  );
};

export default LineChart;
