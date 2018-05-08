import { IChartCardProps } from './ChartCard';
import { IIconCardProps } from './IconCard';
import * as React from 'react';
import Callout from './Callout';
import ChartCards from './ChartCards';
import ChartCardsControlled from './ChartCardsControlled';
import IconCards from './IconCards';
import LiveMonitors from './LiveMonitors';

export interface IControlsProps {
  chartCards: IChartCardProps[];
  chartCardsControlled: IChartCardProps[];
  iconCards: IIconCardProps[];
  iconCardsMonitored: IIconCardProps[];
}

export default class Controls extends React.PureComponent<IControlsProps, {}> {
  render() {
    const { chartCards, chartCardsControlled, iconCards, iconCardsMonitored } = this.props;
    return (
      <div>
        <ChartCards cards={chartCards} />
        <IconCards cards={iconCards} />
        <hr />
        <Callout
          type="success"
          title="Temperature Controls"
          description="Controls for all available temperature zones."
        />
        <ChartCardsControlled cards={chartCardsControlled} />
        <hr />
        <Callout
          type="warning"
          title="Live Monitoring"
          description="All passive monitors currently active."
        />
        <LiveMonitors cards={iconCardsMonitored} />
        <hr />
      </div>
    );
  }
}
