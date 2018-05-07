import * as React from 'react';
import Callout from './Callout';
import ChartCards from './ChartCards';
import ChartCardsControlled from './ChartCardsControlled';
import IconCards from './IconCards';
import Status from './Status';
import Weather from './Weather';

export interface IWrapperProps {
  status: string;
}

export default class Wrapper extends React.Component<IWrapperProps, any> {
  render() {
    const { status } = this.props;
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
        <ChartCards />
        <IconCards />
        <hr />
        <Callout
          type="success"
          title="Temperature Controls"
          description="Controls for all available temperature zones."
        />
        <ChartCardsControlled />
        <hr />
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
