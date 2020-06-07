import axios from 'axios';
import { IForecastObj, IWeatherStationObj } from '../../components/content/WeatherStation';
import { IWeatherBase } from '../AppState';

interface IPosition {
  lat: number;
  lon: number;
}

export default async function syncWeather(): Promise<IWeatherBase> {
  function getPosition(): IPosition {
    const defaultLatitude = 46.8921;
    const defaultLongitutde = -71.2732;
    const location = { lat: defaultLatitude, lon: defaultLongitutde };

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const newLatitude = position.coords.latitude;
        const newLongitude = position.coords.longitude;
        return { lat: newLatitude, lon: newLongitude };
      });
    }

    return location;
  }

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

  const position = await getPosition();

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
