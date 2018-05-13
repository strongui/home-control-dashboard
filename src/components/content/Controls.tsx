import { IAppState } from '../../store';
import { inject, observer } from 'mobx-react';
import * as React from 'react';
import Callout from './Callout';
import ChartCards from './ChartCards';
import ChartCardsControlled from './ChartCardsControlled';
import IconCards from './IconCards';
import LiveMonitors from './LiveMonitors';

export interface IControlsProps {
  store?: IAppState;
}

class Controls extends React.Component<IControlsProps, {}> {
  render() {
    const { store } = this.props;
    const {
      chartCards = [],
      chartCardsControlled = [],
      iconCards = [],
      iconCardsMonitored = [],
    } = store!.appStore;
    return (
      <div>
        <ChartCards storeKey="chartCards" cards={chartCards} />
        <IconCards storeKey="iconCards" cards={iconCards} />
        <hr />
        <Callout
          type="success"
          title="Temperature Controls"
          description="Controls for all available temperature zones."
        />
        <ChartCardsControlled storeKey="chartCardsControlled" cards={chartCardsControlled} />
        <hr />
        <Callout
          type="warning"
          title="Live Monitoring"
          description="All passive monitors currently active."
        />
        <LiveMonitors storeKey="iconCardsMonitored" cards={iconCardsMonitored} />
        <hr />
      </div>
    );
  }
}

export default inject('store')(observer(Controls));
