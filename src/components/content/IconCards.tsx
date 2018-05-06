import * as React from 'react';
import IconCard from './IconCard';

export default class IconCards extends React.Component<{}, any> {
  render() {
    return (
      <div className="row">
        <div className="col-xl-3 col-sm-6 mb-3">
          <IconCard icon="fab fa-superpowers" on={false} title="Main fan" type="success" />
        </div>
        <div className="col-xl-3 col-sm-6 mb-3">
          <IconCard
            icon="fas fa-thermometer-three-quarters"
            on={false}
            title="Heating compressor"
            type="success"
          />
        </div>
        <div className="col-xl-3 col-sm-6 mb-3">
          <IconCard icon="fas fa-fire" on={false} title="Heating element" type="success" />
        </div>
        <div className="col-xl-3 col-sm-6 mb-3">
          <IconCard
            icon="fas fa-thermometer-empty"
            on={false}
            title="Cooling compressor"
            type="success"
          />
        </div>
      </div>
    );
  }
}
