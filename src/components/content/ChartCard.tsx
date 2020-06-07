import { inject, observer } from 'mobx-react';
import { IRootStore, storeDefaultProps } from '../../store';
import * as React from 'react';
import Knob from './Knob';

const { useRef, useState } = React;

export interface IChartCardOwnProps {
  controled?: boolean;
  description?: string;
  disabled?: boolean;
  error?: string;
  id: number;
  ident: string;
  max?: number;
  min?: number;
  storeKey?: string;
  title: string;
  type: string;
  value: number;
}

export type IChartCardProps = IChartCardOwnProps & Partial<IRootStore>;

function ChartCard({
  controled,
  description,
  error,
  id,
  ident,
  max,
  min,
  store = storeDefaultProps.store,
  storeKey,
  title,
  type,
  value: passedValue,
}: IChartCardProps) {
  const timeouts: { current: { [key: string]: number } } = useRef({});

  const [value, setStateValue] = useState(passedValue);
  const { appStore } = store;
  const { setValue } = appStore;
  let icon = 'fas fa-exclamation';
  switch (type) {
    case 'temperature':
      icon = 'fas fa-thermometer-half';
      break;
    case 'humidty':
      icon = 'fas fa-umbrella';
      break;
    default:
      break;
  }
  let cls = '';

  if (type === 'temperature') {
    if (value > 35) {
      cls = 'bg-danger text-white';
      icon = 'fas fa-thermometer-full';
    } else if (value > 25) {
      cls = 'bg-warning text-white';
      icon = 'fas fa-thermometer-three-quarters';
    } else if (value > 15) {
      cls = 'bg-success text-white';
    } else if (value > 5) {
      cls = 'bg-success-secondary text-white';
      icon = 'fas fa-thermometer-quarter';
    } else if (value > -5) {
      cls = 'bg-info text-white';
      icon = 'fas fa-thermometer-empty';
    } else if (value < -5) {
      cls = 'bg-primary text-white';
      icon = 'fas fa-thermometer-empty';
    }
    if (controled && value > 25) {
      cls = `${cls} warning hot`;
    }
    if (controled && value < 10) {
      cls = `${cls} warning cold`;
    }
  }

  if (type === 'humidty') {
    cls = 'bg-info text-white';
  }

  // Methods
  const handleChange = (newValue: number) => {
    setStateValue(newValue);
    window.clearTimeout(timeouts.current.changeTimeout);
    timeouts.current.changeTimeout = window.setTimeout(() => {
      if (storeKey) {
        setValue(storeKey, ident, id, newValue);
      }
    }, 500);
  };

  const errorLabel = <span className="badge badge-warning">{error}</span>;
  const valueText = type === 'temperature' ? `${value} &deg;C` : `${value} %`;
  const chartLabel = (
    <div className="card-body">
      <div className="card-body-chart">
        <span className={icon} aria-hidden="true" />
      </div>
      {controled ? (
        <Knob
          angleArc={250}
          angleOffset={-125}
          className={'control'}
          font={'Lato'}
          fontWeight={'normal'}
          height={120}
          inputColor={'white'}
          lineCap={'round'}
          max={max}
          min={min}
          onChange={handleChange}
          step={0.1}
          thickness={0.25}
          value={value}
          width={120}
        />
      ) : (
        <div
          className="card-body-value"
          dangerouslySetInnerHTML={{
            __html: valueText,
          }}
        />
      )}
      <h3 className="m-t-10">{title}</h3>
      <p className="mb-0">{description}</p>
    </div>
  );

  return (
    <div className={`card ${cls} chart text-right o-hidden h-100`}>
      {error ? errorLabel : chartLabel}
    </div>
  );
}

export default inject('store')(observer(ChartCard));
