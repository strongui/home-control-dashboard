import * as React from 'react';
import ChartCard from './ChartCard';

export default class ChartCards extends React.Component<{}, any> {
  render() {
    return (
      <div className="row">
        <div className="col-xl-6 col-sm-6 mb-3">
          <ChartCard
            title="Temperature"
            description="Current exterior temperature."
            type="temperature"
            value={11}
          />
        </div>
        <div className="col-xl-6 col-sm-6 mb-3">
          <ChartCard
            title="Humidty"
            description="Current exterior humidity."
            type="humidty"
            value={95}
          />
        </div>
      </div>
    );
  }
}
