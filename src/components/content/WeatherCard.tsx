import * as React from 'react';
import moment from 'moment';

export interface IWeatherCardProps {
  date: number;
  header?: string;
  high: number;
  humidity: number;
  icon: number;
  lastUpdate?: number;
  lat?: number;
  lon?: number;
  low: number;
  minimal?: boolean;
  subTitle?: string;
  temp: number;
  title?: string;
  update?: (lat: number, lon: number) => any;
  updating?: boolean;
  wind: number;
}

export default function WeatherCard({
  date,
  header,
  high,
  humidity,
  icon,
  lastUpdate,
  lat,
  lon,
  low,
  minimal,
  subTitle,
  temp,
  title,
  update,
  updating,
  wind,
}: IWeatherCardProps) {
  const momentDate = moment.unix(date);
  const dateText = minimal
    ? momentDate.format('dddd / D')
    : `Last updated: ${moment(lastUpdate).format('dddd, h:mm:ss a')}`;

  const handleUpdateClick = () => {
    if (updating || !lat || !lon || !update) return;
    update(lat, lon);
  };

  return (
    <div className={`card weather${minimal ? ' minimal' : ''}`}>
      {header && (
        <div className="card-header">
          <span className="fas fa-sun" aria-hidden="true" /> {header}
        </div>
      )}
      <div className="card-body">
        <div className="row">
          <div className="col-sm-12">
            <div className="date">
              {dateText}
              {!minimal && (
                <button
                  className="btn btn-secondary btn-sm ml-1 update"
                  onClick={handleUpdateClick}
                  type="button"
                >
                  <span className={`fas fa-sync${updating ? ' fa-spin' : ''}`} aria-hidden="true" />{' '}
                </button>
              )}
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-sm-3">
            <div className="icon">
              <span className={`owf owf-${icon}`} aria-hidden="true" />
            </div>
          </div>
          <div className="col-sm-6">
            <div className="description">
              <div className="title">{title}</div>
              <div className="sub-title">{subTitle}</div>
            </div>
          </div>
          <div className="col-sm-3">
            <div className="temperature">
              {temp} <small>&deg;C</small>
            </div>
          </div>
        </div>
        <hr />

        <div className="row">
          <div className="col-sm-4">
            <div className="humidty">
              <span className="fas fa-umbrella" aria-hidden="true" /> {humidity}%
            </div>
          </div>
          <div className="col-sm-4">
            <div className="temp">
              <span className="fas fa-thermometer-half" aria-hidden="true" /> {low} &deg; {high}{' '}
              &deg;
            </div>
          </div>
          <div className="col-sm-4">
            <div className="wind">
              <span className="fas fa-flag" aria-hidden="true" /> {wind} km/h
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
