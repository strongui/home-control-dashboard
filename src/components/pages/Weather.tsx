import { inject, observer } from 'mobx-react';
import { IRootStore, storeDefaultProps } from '../../store';
import { Link } from 'react-router-dom';
import * as React from 'react';
import Callout from '../content/Callout';
import WeatherStation from '../content/WeatherStation';

const { useEffect } = React;

interface IWeatherStationOwnProps {}

export type IWeatherStationProps = IWeatherStationOwnProps & Partial<IRootStore>;

function Weather({ store = storeDefaultProps.store }: IWeatherStationProps) {
  const { appStore } = store;
  const { loadWeather, user } = appStore;
  const weatherApiId = user?.api?.weatherApiId;

  useEffect(() => {
    loadWeather();
  }, [loadWeather, weatherApiId]);

  return (
    <div className="container-fluid">
      <ol className="breadcrumb">
        <li className="breadcrumb-item">
          <Link to="/weather">Weather</Link>
        </li>
        <li className="breadcrumb-item active">Plan for the week</li>
      </ol>
      {!weatherApiId && (
        <Callout
          type="warning"
          title="Open Weather API id missing"
          description="In order for this component to work, you must define your Open Weather API id in your account settings."
        />
      )}
      {weatherApiId && (
        <React.Fragment>
          <Callout
            type="success-secondary"
            title="Weather Forecast"
            description="Upcoming weather conditions for your area."
          />
          <WeatherStation />
        </React.Fragment>
      )}
    </div>
  );
}

export default inject('store')(observer(Weather));
