import axios from 'axios';
import { IForecastObj, IWeatherStationObj } from '../../components/content/WeatherStation';
import { IWeatherBase } from '../AppState';

export default function syncWeather(): Promise<IWeatherBase> {
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

  return axios.all([getWeather(), getForecast()]).then(
    axios.spread((weather, forecast) => {
      const obj = {
        currentWeather: weather.data as IWeatherStationObj,
        forecast: forecast.data as IForecastObj,
      };
      return obj;
    }),
  );
}
