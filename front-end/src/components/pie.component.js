import React, {Component} from 'react';
import { Pie } from 'react-chartjs-2';

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
      return (
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
            />);
  }
  // Colour background of table row with colour of category
  render() {
    return (
        <div>

          <div>{this.showChart()}</div>
        </div>
    );
  }
}
