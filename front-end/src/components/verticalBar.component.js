import React, {Component} from 'react';
import {Bar} from 'react-chartjs-2';

export default class VerticalBar extends Component {
  constructor(props) {
    super(props);

    const dataList = this.props.ratingsFreq;

    this.state = {
      data: dataList,
    };
  }

  showChart() {
    if (this.state.data.length === 0) {
      return <div className="overview-card-stat">No Data</div>;
    } else {
      return (
          <div className='home-bar-chart'>
            <Bar
                data={{
                  labels: ['Very Unsatisfied', 'Unsatisfied', 'Neutral', 'Satisfied', 'Very Satisfied'],
                  datasets: [{
                    data: this.state.data,
                    backgroundColor: [
                      'rgba(255, 68, 68, 0.2)',
                      'rgba(255, 170, 30, 0.2)',
                      'rgba(255, 215, 68, 0.2)',
                      'rgba(177, 229, 64, 0.2)',
                      'rgba(64, 221, 64, 0.2)'
                    ],
                    borderColor: [
                      'rgba(255, 68, 68, 1)',
                      'rgba(255, 170, 30, 1)',
                      'rgba(255, 215, 68, 1)',
                      'rgba(177, 229, 64, 1)',
                      'rgba(64, 221, 64, 1)'
                    ],
                    borderWidth: 1,
                  }],
                }}
                options={{
                  plugins: {
                    legend: {
                      display: false,
                    },
                  },
                }}
            />
          </div>);
    }
  }
  // Colour background of table row with colour of category
  render() {
    return (
        <div>
          <div className='home-chart-heading'>Category Popularity</div>
          <div>{this.showChart()}</div>
        </div>
    );
  }
}


// const data = {
//   labels: ['Very Unsatisfied', 'Unsatisfied', 'Neutral', 'Satisfied', 'Very Satisfied'],
//   datasets: [
//     {
//       label: '# of Transactions',
//       data: [12, 19, 3, 5, 10],
//       backgroundColor: [
//         'rgba(255, 99, 132, 0.2)',
//         'rgba(255, 170, 117, 0.2)',
//         'rgba(255, 206, 86, 0.2)',
//         'rgba(177, 229, 64, 0.2)',
//         'rgba(75, 192, 192, 0.2)'
//       ],
//       borderColor: [
//         'rgba(255, 99, 132, 1)',
//         'rgba(255, 170, 117, 1)',
//         'rgba(255, 206, 86, 1)',
//         'rgba(177, 229, 64, 1)',
//         'rgba(75, 192, 192, 1)'
//       ],
//       borderWidth: 1,
//     },
//   ],
// };
//
// const options = {
//   scales: {
//     yAxes: [
//       {
//         ticks: {
//           beginAtZero: true,
//         },
//       },
//     ],
//   },
//   plugins: {
//     legend: {
//       display: false,
//     },
//   },
// };
//
// const VerticalBar = () => (
//   <>
//     <div className='home-chart-heading'>Transaction Satisfaction</div>
//     <div className='home-bar-chart'><Bar data={data} options={options} /></div>
//   </>
// );
//
// export default VerticalBar;