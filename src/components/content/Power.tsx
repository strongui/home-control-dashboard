import * as React from 'react';
import { Line as LineChart } from 'react-chartjs-2';

interface IPowerState {
  average: number;
  cooling: number;
  heating: number;
  hotWater: number;
  lighting: number;
  monthDaysTotal: number;
  monthName: string;
  outlets: number;
  todayTotal: number;
  total: number;
}

export default class Power extends React.Component<{}, IPowerState> {
  private interval: any;
  private kWhPrice = 0.12;
  private kWh = 1.205645;
  private date = new Date();
  private monthNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  constructor(props: {}) {
    super(props);
    this.state = { ...this.powerUsed };
  }

  componentDidMount() {
    this.interval = setInterval(() => {
      this.setState(() => {
        return { ...this.powerUsed };
      });
    }, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  get powerUsed() {
    const date = new Date();
    const monthDaysTotal = Number(
      parseFloat((date.getDate() * 24 * this.kWh - date.getHours() * this.kWh).toString()).toFixed(
        2,
      ),
    );
    const todayTotal = Number(
      parseFloat(
        (
          date.getHours() * this.kWh +
          date.getMinutes() / 60 * this.kWh +
          date.getSeconds() / 60 / 60 * this.kWh
        ).toString(),
      ).toFixed(2),
    );

    const total = Number(parseFloat((monthDaysTotal + todayTotal).toString()).toFixed(2));
    const average = Number(parseFloat((total / date.getDate()).toString()).toFixed(2));
    const cooling = Number(parseFloat((total * 0.05).toString()).toFixed(2));
    const heating = Number(parseFloat((total * 0.35).toString()).toFixed(2));
    const hotWater = Number(parseFloat((total * 0.15).toString()).toFixed(2));
    const lighting = Number(parseFloat((total * 0.2).toString()).toFixed(2));
    const outlets = Number(parseFloat((total * 0.25).toString()).toFixed(2));
    const monthName = this.monthNames[date.getMonth()];
    return {
      average,
      cooling,
      heating,
      hotWater,
      lighting,
      monthDaysTotal,
      monthName,
      outlets,
      todayTotal,
      total,
    };
  }

  get chartMonthLabels() {
    const monthNames: string[] = [];
    const date = new Date();
    for (let i = 0; i <= date.getMonth(); i += 1) {
      monthNames.push(this.monthNames[i]);
    }
    return monthNames;
  }

  powerCost(hours: number) {
    return parseFloat((hours * this.kWhPrice).toString()).toFixed(2);
  }

  render() {
    const {
      average,
      cooling,
      heating,
      hotWater,
      lighting,
      monthName,
      outlets,
      todayTotal,
      total,
    } = this.state;
    const chartData = {
      datasets: [
        {
          data: [1125, 1250, 983, 972, total],
          fillColor: 'rgba(220,220,220,0.2)',
          label: `${this.date.getFullYear()} kWh used`,
          pointColor: 'rgba(220,220,220,1)',
          pointHighlightFill: '#fff',
          pointHighlightStroke: 'rgba(220,220,220,1)',
          pointStrokeColor: '#fff',
          strokeColor: 'rgba(220,220,220,1)',
        },
        {
          data: [968, 1073, 1125, 827, 912],
          fillColor: 'rgba(151,187,205,0.2)',
          label: `${this.date.getFullYear() - 1} kWh used`,
          pointColor: 'rgba(151,187,205,1)',
          pointHighlightFill: '#fff',
          pointHighlightStroke: 'rgba(151,187,205,1)',
          pointStrokeColor: '#fff',
          strokeColor: 'rgba(151,187,205,1)',
        },
      ],
      labels: this.chartMonthLabels,
    };

    const chartOptions: any = {
      // Boolean - Whether the line is curved between points
      bezierCurve: true,
      // Number - Tension of the bezier curve between points
      bezierCurveTension: 0.4,
      // Boolean - Whether to fill the dataset with a colour
      datasetFill: true,
      // Boolean - Whether to show a stroke for datasets
      datasetStroke: true,
      // Number - Pixel width of dataset stroke
      datasetStrokeWidth: 2,
      // String - A legend template
      legendTemplate:
        '<ul class="<%=name.toLowerCase()%>-legend"><% for (var i=0; i<datasets.length; i++){%><li><span style="background-color:<%=datasets[i].strokeColor%>"><%if(datasets[i].label){%><%=datasets[i].label%><%}%></span></li><%}%></ul>',
      // Boolean - Whether to horizontally center the label and point dot inside the grid
      offsetGridLines: false,
      // Boolean - Whether to show a dot for each point
      pointDot: true,
      // Number - Radius of each point dot in pixels
      pointDotRadius: 4,
      // Number - Pixel width of point dot stroke
      pointDotStrokeWidth: 1,
      // Number - amount extra to add to the radius to cater for hit detection outside the drawn point
      pointHitDetectionRadius: 20,
      // String - Colour of the grid lines
      scaleGridLineColor: 'rgba(0,0,0,.05)',
      // Number - Width of the grid lines
      scaleGridLineWidth: 1,
      // Boolean - Whether grid lines are shown across the chart
      scaleShowGridLines: true,
      // Boolean - Whether to show horizontal lines (except X axis)
      scaleShowHorizontalLines: true,
      // Boolean - Whether to show vertical lines (except Y axis)
      scaleShowVerticalLines: true,
    };

    return (
      <div className="card o-hidden">
        <div className="card-body bg-info">
          <div className="card-body-icon upside text-white">
            <span className="fas fa-plug" aria-hidden="true" />
          </div>
          <h4 className="text-white card-title">Power usage</h4>
          <h6 className="card-subtitle text-white m-b-0 op-5">
            Today: {todayTotal} kW <small> ({average} / per day) </small>
          </h6>
        </div>
        <div className="card-body">
          <h6 className="chart">Chart</h6>
          <LineChart data={chartData} options={chartOptions} />
          <hr />
          <div className="totals">
            <div className="row">
              <div className="col-md-6 col-sm-12">
                <h6 className="mb-3">{monthName} cost</h6>
                <span
                  className="fas fa-hand-holding-usd circle-icon medium text-danger mb-2"
                  aria-hidden="true"
                />
                <h4 className="total text-nowrap">{this.powerCost(total)} $</h4>
                <small className="hours text-nowrap mb-3">{total} kW</small>
              </div>
              <div className="col-md-6 col-sm-12">
                <h6 className="mb-3">Breakdown</h6>
                <div className="table-responsive">
                  <table className="table table-striped table-sm">
                    <tbody>
                      <tr>
                        <th scope="row">Cooling</th>
                        <td className="text-right">{cooling} W</td>
                      </tr>
                      <tr>
                        <th scope="row">Heating</th>
                        <td className="text-right">{heating} W</td>
                      </tr>
                      <tr>
                        <th scope="row">Hot water</th>
                        <td className="text-right">{hotWater} W</td>
                      </tr>
                      <tr>
                        <th scope="row">Lighting</th>
                        <td className="text-right">{lighting} W</td>
                      </tr>
                      <tr>
                        <th scope="row">Outlets</th>
                        <td className="text-right">{outlets} W</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
