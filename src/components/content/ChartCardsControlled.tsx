import * as React from 'react';
import ChartCard from './ChartCard';

export default class ChartCardsControlled extends React.Component<{}, any> {
  render() {
    return (
      <div className="row">
        <div className="col-xl-4 col-sm-6 mb-3">
          <ChartCard
            controled={true}
            id="second-floor-temp"
            min={0}
            max={40}
            description="Control second floor temperature."
            title="Second Floor"
            type="temperature"
            value={11}
          />
        </div>
        <div className="col-xl-4 col-sm-6 mb-3">
          <ChartCard
            controled={true}
            id="first-floor-temp"
            min={0}
            max={40}
            description="Control first floor temperature."
            title="First Floor"
            type="temperature"
            value={11}
          />
        </div>
        <div className="col-xl-4 col-sm-6 mb-3">
          <ChartCard
            controled={true}
            id="basement-temp"
            min={0}
            max={40}
            description="Control basement temperature."
            title="Basement"
            type="temperature"
            value={11}
          />
        </div>
      </div>
    );
  }
}
