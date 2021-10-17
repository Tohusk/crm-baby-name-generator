import React from 'react';
import { Bar } from 'react-chartjs-2';

const data = {
  labels: ['Very Unsatisfied', 'Unsatisfied', 'Neutral', 'Satisfied', 'Very Satisfied'],
  datasets: [
    {
      label: '# of Transactions',
      data: [12, 19, 3, 5, 10],
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(255, 170, 117, 0.2)',
        'rgba(255, 206, 86, 0.2)',
        'rgba(177, 229, 64, 0.2)',
        'rgba(75, 192, 192, 0.2)'
      ],
      borderColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(255, 170, 117, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(177, 229, 64, 1)',
        'rgba(75, 192, 192, 1)'
      ],
      borderWidth: 1,
    },
  ],
};

const options = {
  scales: {
    yAxes: [
      {
        ticks: {
          beginAtZero: true,
        },
      },
    ],
  },
  plugins: {
    legend: {
      display: false,
    },
  },
};

const VerticalBar = () => (
  <>
    <div className='home-chart-heading'>Transaction Satisfaction</div>
    <div className='home-bar-chart'><Bar data={data} options={options} /></div>
  </>
);

export default VerticalBar;