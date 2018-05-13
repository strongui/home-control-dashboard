import * as React from 'react';
import { Link } from 'react-router-dom';
import Callout from '../content/Callout';
import WeatherStation from '../content/WeatherStation';

export default class Weather extends React.Component<{}, {}> {
  render(): any {
    return (
      <div className="container-fluid">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/weather">Weather</Link>
          </li>
          <li className="breadcrumb-item active">How to use</li>
        </ol>
        <Callout
          type="success-secondary"
          title="Weather Forecast"
          description="Upcoming weather conditions for your area."
        />
        <WeatherStation />
      </div>
    );
  }
}
