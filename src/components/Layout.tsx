// import axios from 'axios';
const alertsJson = require('./data/alerts.json');
const messagesJson = require('./data/messages.json');
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { IChartCardProps } from './content/ChartCard';
import { IIconCardProps } from './content/IconCard';
import { INotification } from './header/Notification';
import * as React from 'react';
import Api from './pages/Api';
import Dashboard from './pages/Dashboard';
import Footer from './footer/Footer';
import Header from './header/Header';

export interface ILayoutState {
  alerts?: INotification[];
  chartCards?: IChartCardProps[];
  chartCardsControlled?: IChartCardProps[];
  controlsInitialized: boolean;
  iconCards?: IIconCardProps[];
  iconCardsMonitored?: IIconCardProps[];
  messages?: INotification[];
  status: string;
  user?: { name: string, username: string, sex: string } | null;
}

export interface IApiResponse {
  coolingCompressorOn: boolean;
  fanOn: boolean;
  heatingCompressorOn: boolean;
  heatingElementOn: boolean;
  mainFloorTemp: number;
  outsideHumidity: number;
  outsideTemp: number;
}

export type IDismissNotification = (notification: string, id: number) => void;

function randomIntFromInterval(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

class Layout extends React.Component<{}, ILayoutState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      controlsInitialized: false,
      status: 'offline',
    };
    this.buildNewState = this.buildNewState.bind(this);
    this.dismissNotification = this.dismissNotification.bind(this);
    this.syncState = this.syncState.bind(this);
  }

  componentDidMount() {
    this.syncState();
  }

  buildNewState(obj: IApiResponse) {
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
        id: 'temp',
        title: 'Temperature',
        type: 'temperature',
        value: outsideTemp,
      },
      {
        description: 'Current exterior humidity.',
        id: 'humi',
        title: 'Humidty',
        type: 'humidty',
        value: outsideHumidity,
      },
    ];

    const iconCards = [
      {
        icon: 'fab fa-superpowers',
        id: 1,
        on: fanOn,
        title: 'Main fan',
        type: 'success',
      },
      {
        icon: 'fas fa-thermometer-three-quarters',
        id: 2,
        on: heatingCompressorOn,
        title: 'Heating compressor',
        type: 'success',
      },
      {
        icon: 'fas fa-fire',
        id: 3,
        on: heatingElementOn,
        title: 'Heating element',
        type: 'success',
      },
      {
        icon: 'fas fa-thermometer-empty',
        id: 4,
        on: coolingCompressorOn,
        title: 'Cooling compressor',
        type: 'success',
      },
    ];

    const iconCardsMonitored = [
      {
        icon: 'fas fa-tint',
        id: 1,
        monitored: true,
        title: 'Basement water sensor',
        type: 'success-secondary',
      },
      {
        icon: 'fas fa-smoking',
        id: 2,
        monitored: true,
        title: 'Smoke detectors',
        type: 'success-secondary',
      },
      {
        error: 'Intruder detected!',
        icon: 'fas fa-bell',
        id: 3,
        monitored: true,
        title: 'Security system',
        type: 'success-secondary',
      },
    ];

    const chartCardsControlled = [
      {
        controled: true,
        description: 'Control second floor temperature.',
        disabled: true,
        id: 'secondFloorTemp',
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
        id: 'mainFloorTemp',
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
        id: 'basementFloorTemp',
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
      controlsInitialized: true,
      iconCards,
      iconCardsMonitored,
      messages: messagesJson,
      status,
      temp: Math.floor(Math.random() * 10) + 1,
      user: null,
    };
  }

  dismissNotification(notification: string, id: number) {
    this.setState({
      ...this.state,
      [notification]: this.state[notification].filter((obj: INotification) => obj.key !== id),
    });
  }

  syncState() {
    function fakeFetch(ms: number): Promise<IApiResponse> {
      return new Promise(resolve =>
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
        }, ms),
      );
    }
    // axios.get('http://smiousse.zapto.org:5580/rest/settings/get/status/jarpit')
    fakeFetch(200).then(response => {
      const newState = this.buildNewState(response);
      this.setState(newState);
    });
  }

  render() {
    const {
      // user,
      alerts,
      chartCards,
      chartCardsControlled,
      controlsInitialized,
      iconCards,
      iconCardsMonitored,
      messages,
      status,
    } = this.state;
    return (
      <Router>
        <div className="App">
          <Header
            alerts={alerts}
            dismissNotification={this.dismissNotification}
            messages={messages}
          />
          <div className="content-wrapper">
            <Route
              exact
              path="/"
              render={props => (
                <Dashboard
                  {...props}
                  chartCards={chartCards}
                  chartCardsControlled={chartCardsControlled}
                  controlsInitialized={controlsInitialized}
                  iconCards={iconCards}
                  iconCardsMonitored={iconCardsMonitored}
                  status={status}
                />
              )}
            />
            <Route path="/api" component={Api} />
            <Footer />
          </div>
        </div>
      </Router>
    );
  }
}

export default Layout;
