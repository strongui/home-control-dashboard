import * as React from 'react';

export default class AreaChart extends React.Component<{}, any> {
  render() {
    return (
      <div className="card mb-3">
        <div className="card-header">
          <i className="fa fa-area-chart" /> Area Chart Example
        </div>
        <div className="card-body">
          <canvas id="myAreaChart" width="100%" height="30" />
        </div>
        <div className="card-footer small text-muted">Updated yesterday at 11:59 PM</div>
      </div>
    );
  }
}
