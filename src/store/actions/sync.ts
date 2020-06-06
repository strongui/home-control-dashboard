import { IChartCardOwnProps } from '../../components/content/ChartCard';
import { IIconCardOwnProps } from '../../components/content/IconCard';
import { ILightSwitch } from '../../components/content/LightSwitch';
import { INotification } from '../../components/header/Notification';

const alertsJson = require('../data/alerts.json');
const lightsJson = require('../data/lights.json');
const messagesJson = require('../data/messages.json');
const monitorsJson = require('../data/monitors.json');
export interface IApiResponse {
  coolingCompressorOn: boolean;
  fanOn: boolean;
  heatingCompressorOn: boolean;
  heatingElementOn: boolean;
  mainFloorTemp: number;
  outsideHumidity: number;
  outsideTemp: number;
}

interface ISyncResponse {
  alerts: INotification[];
  chartCards: IChartCardOwnProps[];
  chartCardsControlled: IChartCardOwnProps[];
  iconCards: IIconCardOwnProps[];
  iconCardsMonitored: IIconCardOwnProps[];
  lights: ILightSwitch[];
  messages: INotification[];
  status: string;
}

function buildNewState(obj: IApiResponse): ISyncResponse {
  const {
    coolingCompressorOn,
    fanOn,
    heatingCompressorOn,
    heatingElementOn,
    mainFloorTemp,
    outsideHumidity,
    outsideTemp,
  } = obj;

  const statuses = ['online', 'offline', 'error', 'syncing'];
  const status = statuses[0];
  const chartCards = [
    {
      description: 'Current exterior temperature.',
      id: 1,
      ident: 'temp',
      title: 'Temperature',
      type: 'temperature',
      value: outsideTemp,
    },
    {
      description: 'Current exterior humidity.',
      id: 2,
      ident: 'humi',
      title: 'Humidty',
      type: 'humidty',
      value: outsideHumidity,
    },
  ];

  const iconCards = [
    {
      icon: 'fab fa-superpowers',
      id: 1,
      ident: 'fan',
      title: 'Main fan',
      type: 'success',
      value: fanOn,
    },
    {
      icon: 'fas fa-thermometer-three-quarters',
      id: 2,
      ident: 'heatingCompressor',
      title: 'Heating compressor',
      type: 'success',
      value: heatingCompressorOn,
    },
    {
      icon: 'fas fa-fire',
      id: 3,
      ident: 'heatingElement',
      title: 'Heating element',
      type: 'success',
      value: heatingElementOn,
    },
    {
      icon: 'fas fa-thermometer-empty',
      id: 4,
      ident: 'coolingCompressor',
      title: 'Cooling compressor',
      type: 'success',
      value: coolingCompressorOn,
    },
  ];

  const iconCardsMonitored = monitorsJson;

  const chartCardsControlled = [
    {
      controled: true,
      description: 'Control second floor temperature.',
      disabled: true,
      id: 1,
      ident: 'secondFloorTemp',
      max: 40,
      min: 0,
      title: 'Second Floor',
      type: 'temperature',
      value: randomIntFromInterval(18, 20),
    },
    {
      controled: true,
      description: 'Control main floor temperature.',
      disabled: false,
      id: 2,
      ident: 'mainFloorTemp',
      max: 40,
      min: 0,
      title: 'Main Floor',
      type: 'temperature',
      value: mainFloorTemp,
    },
    {
      controled: true,
      description: 'Control basement floor temperature.',
      disabled: true,
      id: 3,
      ident: 'basementFloorTemp',
      max: 40,
      min: 0,
      title: 'Basement Floor',
      type: 'temperature',
      value: randomIntFromInterval(20, 25),
    },
  ];

  return {
    alerts: alertsJson,
    chartCards,
    chartCardsControlled,
    iconCards,
    iconCardsMonitored,
    lights: lightsJson,
    messages: messagesJson,
    status,
  };
}

function fakeFetch(ms: number): Promise<IApiResponse> {
  return new Promise((resolve) =>
    setTimeout(() => {
      resolve({
        coolingCompressorOn: false,
        fanOn: false,
        heatingCompressorOn: false,
        heatingElementOn: false,
        mainFloorTemp: randomIntFromInterval(18, 22),
        outsideHumidity: randomIntFromInterval(34, 89),
        outsideTemp: randomIntFromInterval(7, 25),
      });
    }, ms)
  );
}

function randomIntFromInterval(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

export default function sync(latency = 0): Promise<ISyncResponse> {
  return new Promise((resolve, reject) => {
    fakeFetch(latency).then((response) => {
      const newState = buildNewState(response);
      resolve(newState);
    });
  });
}
