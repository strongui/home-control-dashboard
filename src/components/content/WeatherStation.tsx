import { inject, observer } from 'mobx-react';
import { IRootStore, storeDefaultProps } from '../../store';
import * as React from 'react';
import Error from '../Error';
import Loading from '../Loading';
import WeatherCard from './WeatherCard';

export interface ICity {
  id: number;
  name: string;
  coord: {
    lat: number;
    lon: number;
  };
  country: string;
}

export interface IWeatherStation {
  id: 802;
  main: string;
  description: string;
  icon: string;
}

export interface IWeatherStationObj {
  dt: number;
  main: {
    temp: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    sea_level: number;
    grnd_level: number;
    humidity: number;
    temp_kf: number;
  };
  weather: IWeatherStation[];
  clouds: {
    all: number;
  };
  wind: {
    speed: number;
    deg: number;
  };
  rain: { [key: string]: number };
  sys: {
    pod: string;
  };
  dt_txt: string;
}

export interface IForecastObj {
  cod: string;
  message: number;
  cnt: number;
  list: IWeatherStationObj[];
  city: ICity;
}

interface IWeatherStationOwnProps {}

export type IWeatherStationProps = IWeatherStationOwnProps & IRootStore;

@inject('store')
@observer
export default class WeatherStation extends React.Component<IWeatherStationProps, {}> {
  static defaultProps = storeDefaultProps;

  render() {
    const { store } = this.props;
    const {
      error,
      loaded,
      updating,
      forecast,
      currentWeather,
      lastUpdate,
    } = store!.appStore.weather;

    if (error) return <Error title={error} />;
    if (!loaded || !forecast || !currentWeather) return <Loading />;

    const { city } = forecast;
    const { name } = city;
    const listItems = forecast.list.filter((obj) => {
      return obj.dt_txt.split(' ')[1] === '12:00:00';
    });
    const weatherCards = listItems.map((obj) => {
      return (
        <div className="d-flex justify-content-around" key={obj.dt}>
          <WeatherCard
            date={obj.dt}
            high={Math.round(obj.main.temp_max)}
            humidity={obj.main.humidity}
            icon={obj.weather[0].id}
            low={Math.round(obj.main.temp_min)}
            minimal={true}
            subTitle={`${obj.weather[0].description
              .charAt(0)
              .toUpperCase()}${obj.weather[0].description.slice(1)}`}
            temp={Math.round(obj.main.temp)}
            title={name}
            updating={updating}
            wind={Math.round(obj.wind.speed)}
          />
        </div>
      );
    });

    return (
      <div className="row">
        <div className="col-md-5 col-sm-12 mb-3">
          <WeatherCard
            date={currentWeather.dt}
            header="Current conditions"
            high={Math.round(currentWeather.main.temp_max)}
            humidity={currentWeather.main.humidity}
            icon={currentWeather.weather[0].id}
            lastUpdate={lastUpdate}
            low={Math.round(currentWeather.main.temp_min)}
            subTitle={`${currentWeather.weather[0].description
              .charAt(0)
              .toUpperCase()}${currentWeather.weather[0].description.slice(1)}`}
            temp={Math.round(currentWeather.main.temp)}
            title={name}
            update={this.props.store!.appStore.loadWeather}
            updating={updating}
            wind={Math.round(currentWeather.wind.speed)}
          />
        </div>
        <div className="col-md-7 col-sm-12">
          <div className="card">
            <div className="card-header">
              <span className="fas fa-newspaper" aria-hidden="true" /> 5 Day Forecast
            </div>
            <div className="card-body">
              <div className="d-flex">{weatherCards}</div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
