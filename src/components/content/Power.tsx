import * as React from 'react';
import { Line as LineChart } from 'react-chartjs-2';
import useInterval from '../../helpers/hookHelpers/useInterval';

const { useState } = React;

const monthNames = [
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

const defaultKWhPrice = 0.12;
const defaultKWh = 1.205645;

interface IPowerProps {
  kWh?: number;
  kWhPrice?: number;
}
interface IPowerState {
  average: number;
  cooling: number;
  date: Date;
  heating: number;
  hotWater: number;
  lighting: number;
  monthDaysTotal: number;
  monthName: string;
  outlets: number;
  todayTotal: number;
  total: number;
}

const getChartMonthLabels = () => {
  const mNames: string[] = [];
  const date = new Date();
  for (let i = 0; i <= date.getMonth(); i += 1) {
    mNames.push(monthNames[i]);
  }
  return mNames;
};

const getPowerUsed = (props: { kWh: number }) => {
  const { kWh } = props;
  const date = new Date();
  const monthDaysTotal = Number(
    parseFloat((date.getDate() * 24 * kWh - date.getHours() * kWh).toString()).toFixed(2)
  );
  const todayTotal = Number(
    parseFloat(
      (
        date.getHours() * kWh +
        (date.getMinutes() / 60) * kWh +
        (date.getSeconds() / 60 / 60) * kWh
      ).toString()
    ).toFixed(2)
  );

  const total = Number(parseFloat((monthDaysTotal + todayTotal).toString()).toFixed(2));
  const average = Number(parseFloat((total / date.getDate()).toString()).toFixed(2));
  const cooling = Number(parseFloat((total * 0.05).toString()).toFixed(2));
  const heating = Number(parseFloat((total * 0.35).toString()).toFixed(2));
  const hotWater = Number(parseFloat((total * 0.15).toString()).toFixed(2));
  const lighting = Number(parseFloat((total * 0.2).toString()).toFixed(2));
  const outlets = Number(parseFloat((total * 0.25).toString()).toFixed(2));
  const monthName = monthNames[date.getMonth()];
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
};

const getPowerCost = (hours: number, kWhPrice: number) => {
  return parseFloat(String(hours * kWhPrice)).toFixed(2);
};

const initState = ({ kWhPrice = defaultKWhPrice, kWh = defaultKWh }: IPowerProps) => {
  const powerUsed = getPowerUsed({ kWh });
  const date = new Date();
  return {
    date,
    ...powerUsed,
  };
};
export default function Power({ kWhPrice = defaultKWhPrice, kWh = defaultKWh }: IPowerProps) {
  const [state, setState] = useState(initState({ kWhPrice, kWh }));
  const {
    average,
    cooling,
    date,
    heating,
    hotWater,
    lighting,
    monthName,
    outlets,
    todayTotal,
    total,
  } = state;

  const powerCost = getPowerCost(total, kWhPrice);

  const chartData = {
    datasets: [
      {
        data: [1125, 1250, 983, 972, total],
        fillColor: 'rgba(220,220,220,0.2)',
        label: `${date.getFullYear()} kWh used`,
        pointColor: 'rgba(220,220,220,1)',
        pointHighlightFill: '#fff',
        pointHighlightStroke: 'rgba(220,220,220,1)',
        pointStrokeColor: '#fff',
        strokeColor: 'rgba(220,220,220,1)',
      },
      {
        data: [968, 1073, 1125, 827, 912],
        fillColor: 'rgba(38,198,218,0.2)',
        label: `${date.getFullYear() - 1} kWh used`,
        pointColor: 'rgba(151,187,205,1)',
        pointHighlightFill: '#fff',
        pointHighlightStroke: 'rgba(151,187,205,1)',
        pointStrokeColor: '#fff',
        strokeColor: 'rgba(151,187,205,1)',
      },
    ],
    labels: getChartMonthLabels(),
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

  useInterval(() => {
    setState(initState({ kWhPrice, kWh }));
  }, 1000);

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
                style={{
                  display: 'inline-block',
                  height: '124px',
                  overflow: 'hidden',
                  padding: '2px',
                  textAlign: 'center',
                  width: '124px',
                }}
              >
                <span
                  className="fas fa-hand-holding-usd circle-icon medium text-danger mb-2"
                  aria-hidden="true"
                />
              </span>
              <h4 className="total text-nowrap">{powerCost} $</h4>
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
