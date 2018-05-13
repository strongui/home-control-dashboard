import * as React from 'react';
import axios from 'axios';
import WeatherCard from './WeatherCard';
import Error from '../Error';
import Loading from '../Loading';
// const forecast = require('./data/forecast.json');
// const weather = require('./data/weather.json');

export interface ICity {
  id: number;
  name: string;
  coord: {
    lat: number,
    lon: number,
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
    temp: number,
    temp_min: number,
    temp_max: number,
    pressure: number,
    sea_level: number,
    grnd_level: number,
    humidity: number,
    temp_kf: number,
  };
  weather: IWeatherStation[];
  clouds: {
    all: number,
  };
  wind: {
    speed: number,
    deg: number,
  };
  rain: { [key: string]: number };
  sys: {
    pod: string,
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

export interface IWeatherStationState {
  error?: string | null;
  forecast?: IForecastObj;
  lastUpdate?: number;
  loaded: boolean;
  updating: boolean;
  weather?: IWeatherStationObj;
}

export default class WeatherStation extends React.Component<{}, IWeatherStationState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      error: null,
      loaded: false,
      updating: true,
    };

    this.updateWeather = this.updateWeather.bind(this);
  }

  componentDidMount() {
    this.updateWeather();
  }

  updateWeather() {
    this.setState({
      ...this.state,
      error: null,
      updating: true,
    });

    function getWeather() {
      return axios.get(
        'http://api.openweathermap.org/data/2.5/weather?lat=46.8921&lon=-71.2732&mode=json&units=metric&APPID=a40aead15bf642aab90b78be6ff65135',
      );
    }

    function getForecast() {
      return axios.get(
        'http://api.openweathermap.org/data/2.5/forecast?lat=46.8921&lon=-71.2732&mode=json&units=metric&APPID=a40aead15bf642aab90b78be6ff65135',
      );
    }

    axios.all([getWeather(), getForecast()]).then(
      axios.spread((weather, forecast) => {
        const now = new Date();
        this.setState({
          error: null,
          forecast: forecast.data as IForecastObj,
          lastUpdate: now.valueOf(),
          loaded: true,
          updating: false,
          weather: weather.data as IWeatherStationObj,
        });
      }),
    );
  }

  render() {
    const { error, loaded, updating, forecast, weather, lastUpdate } = this.state;

    if (error) return <Error title={error} />;
    if (!loaded || (!forecast || !weather)) return <Loading />;

    const { city } = forecast;
    const { name } = city;
    const listItems = forecast.list.filter(obj => {
      return obj.dt_txt.split(' ')[1] === '12:00:00';
    });
    const weatherCards = listItems.map(obj => {
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
            date={weather.dt}
            header="Current conditions"
            high={Math.round(weather.main.temp_max)}
            humidity={weather.main.humidity}
            icon={weather.weather[0].id}
            lastUpdate={lastUpdate}
            low={Math.round(weather.main.temp_min)}
            subTitle={`${weather.weather[0].description
              .charAt(0)
              .toUpperCase()}${weather.weather[0].description.slice(1)}`}
            temp={Math.round(weather.main.temp)}
            title={name}
            update={this.updateWeather}
            updating={updating}
            wind={Math.round(weather.wind.speed)}
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
