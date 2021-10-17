import React, {Component} from 'react';
import { Pie } from 'react-chartjs-2';

/*const data = {
  labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
  datasets: [
    {
      label: '# of Votes',
      data: [12, 19, 3, 5, 2, 3],
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(255, 159, 64, 0.2)',
      ],
      borderColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 159, 64, 1)',
      ],
      borderWidth: 1,
    },
  ],
};*/

export default class PieChart extends Component {
  constructor(props) {
    super(props);

    const labelList = [];
    const colourList = [];
    const dataList = [];
    for (const c of this.props.categoryChartStat) {
      labelList.push(c.name);
      colourList.push(c.colour);
      dataList.push(c.count);
    }

    const datasetList = [{
      backgroundColor: colourList,
      data: dataList,
    }]

    this.state = {
      labels: labelList,
      datasets: datasetList,
    };
  }

  showChart() {
    if (this.state.labels.length === 0) {
      return "No Data";
    } else {
      return (
          <div>
            <div className='home-chart-heading'>Category Popularity</div>
            <Pie
              data={{
                labels: this.state.labels,
                datasets: this.state.datasets,
              }}
              options={{
                plugins: {
                  legend: {
                    display: true,
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
        <div>{this.showChart()}</div>
    );
  }
}
