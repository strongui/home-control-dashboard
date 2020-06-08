import { inject, observer } from 'mobx-react';
import { IRootStore, storeDefaultProps } from '../../store';
import { Link } from 'react-router-dom';
import * as React from 'react';
import Callout from '../content/Callout';
import WeatherStation from '../content/WeatherStation';

const { useEffect, useState } = React;

export const defaultPosition = {
  lat: 46.8921,
  lon: -71.2732,
};

export const newYorkPosition = {
  lat: 40.73061,
  lon: -73.935242,
};

interface IWeatherStationOwnProps {}

export type IWeatherStationProps = IWeatherStationOwnProps & Partial<IRootStore>;

const initState = () => {
  return {
    ...newYorkPosition,
  };
};

function Weather({ store = storeDefaultProps.store }: IWeatherStationProps) {
  const [state, setState] = useState(initState());
  const { lat, lon } = state;
  const { appStore } = store;
  const { loadWeather } = appStore;

  useEffect(() => {
    loadWeather(lat, lon);
  }, [loadWeather, lat, lon]);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const newLatitude = position.coords.latitude;
        const newLongitude = position.coords.longitude;
        setState({ lat: newLatitude, lon: newLongitude });
      });
    }
  }, []);

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
      <WeatherStation lat={lat} lon={lon} />
    </div>
  );
}

export default inject('store')(observer(Weather));
