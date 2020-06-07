import { inject, observer } from 'mobx-react';
import { IRootStore, storeDefaultProps } from '../../store';
import * as React from 'react';
import Callout from './Callout';
import ChartCards from './ChartCards';
import ChartCardsControlled from './ChartCardsControlled';
import IconCards from './IconCards';
import LiveMonitors from './LiveMonitors';

interface IControlsOwnProps {}

export type IControlsProps = IControlsOwnProps & Partial<IRootStore>;

function Controls({ store = storeDefaultProps.store }: IControlsProps) {
  const { appStore } = store;
  const {
    chartCards = [],
    chartCardsControlled = [],
    iconCards = [],
    iconCardsMonitored = [],
  } = appStore;
  return (
    <React.Fragment>
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
    </React.Fragment>
  );
}

export default inject('store')(observer(Controls));
