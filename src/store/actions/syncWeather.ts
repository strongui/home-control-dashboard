import axios from 'axios';
import { IForecastObj, IWeatherStationObj } from '../../components/content/WeatherStation';
import { IWeatherBase } from '../AppState';

interface IPosition {
  lat: number;
  lon: number;
}

export default async function syncWeather(lat: number, lon: number): Promise<IWeatherBase> {
  const position = {
    lat,
    lon,
  };

  function getWeather(position: IPosition) {
    return axios.get(
      `${window.location.protocol}//api.openweathermap.org/data/2.5/weather?lat=${position.lat}&lon=${position.lon}&mode=json&units=metric&APPID=a40aead15bf642aab90b78be6ff65135`
    );
  }

  function getForecast(position: IPosition) {
    return axios.get(
      `${window.location.protocol}//api.openweathermap.org/data/2.5/forecast?lat=${position.lat}&lon=${position.lon}&mode=json&units=metric&APPID=a40aead15bf642aab90b78be6ff65135`
    );
  }

  return axios.all([getWeather(position), getForecast(position)]).then(
    axios.spread((weather, forecast) => {
      const obj = {
        currentWeather: weather.data as IWeatherStationObj,
        forecast: forecast.data as IForecastObj,
      };
      return obj;
    })
  );
}
