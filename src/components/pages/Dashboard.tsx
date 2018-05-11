import * as React from 'react';
import Callout from '../content/Callout';
import Controls from '../content/Controls';
import Weather from '../content/Weather';
import Loading from '../Loading';
import Status from '../content/Status';

import { IChartCardProps } from '../content/ChartCard';
import { IIconCardProps } from '../content/IconCard';

export interface IDashboardProps {
  chartCards?: IChartCardProps[];
  chartCardsControlled?: IChartCardProps[];
  controlsInitialized: boolean;
  iconCards?: IIconCardProps[];
  iconCardsMonitored?: IIconCardProps[];
  status: string;
}

export default class Dashboard extends React.Component<IDashboardProps, {}> {
  render() {
    const {
      chartCards,
      chartCardsControlled,
      controlsInitialized,
      iconCards,
      iconCardsMonitored,
      status,
    } = this.props;
    return (
      <div className="container-fluid">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <a href="#">Dashboard</a>
          </li>
          <li className="breadcrumb-item active">System Status</li>
        </ol>

        <Callout
          type="info"
          title="System Status"
          description="Overal system status and main system controls."
          titleExtra={<Status className="ml-2" status={status} />}
        />

        {controlsInitialized &&
        chartCards &&
        chartCardsControlled &&
        iconCards &&
        iconCardsMonitored ? (
          <Controls
            chartCards={chartCards}
            chartCardsControlled={chartCardsControlled}
            iconCards={iconCards}
            iconCardsMonitored={iconCardsMonitored}
          />
        ) : (
          <Loading />
        )}

        <Callout
          type="success-secondary"
          title="Weather Forecast"
          description="Upcoming weather conditions for your area."
        />
        <Weather />
        <hr />
      </div>
    );
  }
}
