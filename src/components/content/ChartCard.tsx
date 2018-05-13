import { IAppState } from '../../store';
import { inject, observer } from 'mobx-react';
import * as React from 'react';
// tslint:disable-next-line import-name
import Knob from 'react-canvas-knob';
export interface IChartCardProps {
  controled?: boolean;
  description?: string;
  disabled?: boolean;
  error?: string;
  id: number;
  ident: string;
  max?: number;
  min?: number;
  store?: IAppState;
  storeKey?: string;
  title: string;
  type: string;
  value: number;
}

export interface IChartCardState {
  value: number;
}

class ChartCard extends React.Component<IChartCardProps, IChartCardState> {
  private timeout: any;
  constructor(props: IChartCardProps) {
    super(props);
    this.state = {
      value: 0,
    };
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    this.setState({ value: this.props.value });
  }

  handleChange(newValue: number) {
    this.setState({ value: newValue });
    clearTimeout(this.timeout);
    this.timeout = setTimeout(() => {
      this.props.store!.appStore.setValue(this.props.storeKey!, this.props.ident, this.props.id, newValue);
    }, 500);
  }

  render() {
    const { value } = this.state;
    const { controled, description, error, min, max, title, type } = this.props;
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
            onChange={this.handleChange}
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
}

export default inject('store')(observer(ChartCard));
