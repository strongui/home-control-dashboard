import { IAppState } from '../../store';
import { inject, observer } from 'mobx-react';
import { Link } from 'react-router-dom';
import * as React from 'react';
import Callout from '../content/Callout';
import WeatherStation from '../content/WeatherStation';

export interface IWeatherStationProps {
  store?: IAppState;
}
class Weather extends React.Component<IWeatherStationProps, {}> {
  componentDidMount() {
    if (this.props.store) this.props.store.appStore.loadWeather();
  }

  render() {
    return (
      <div className="container-fluid">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/weather">Weather</Link>
          </li>
          <li className="breadcrumb-item active">Plan for the week</li>
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

export default inject('store')(observer(Weather));
