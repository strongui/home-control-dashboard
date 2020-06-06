import { inject, observer } from 'mobx-react';
import * as React from 'react';
import { IRootStore, storeDefaultProps } from '../../store';

export interface ILightSwitch {
  group?: string;
  groupLabel?: string;
  id: number;
  ident: string;
  label: string;
  value: boolean;
}

interface ILightSwitchOwnProps extends ILightSwitch {
  storeKey: string;
}

export type ILightSwitchProps = ILightSwitchOwnProps & IRootStore;

@inject('store')
@observer
export default class LightSwitch extends React.Component<ILightSwitchProps, {}> {
  static defaultProps = storeDefaultProps;

  render() {
    const { id, ident, label, storeKey, value } = this.props;
    const switchId = `lightswitch-${storeKey}-${id}`;
    return (
      <div>
        <input
          type="checkbox"
          name="switch"
          id={switchId}
          checked={value}
          className="light-switch"
          onChange={() => this.props.store!.appStore.setValue(storeKey, ident, id, !value)}
        />
        <label className="switch" htmlFor={switchId}>
          <span className="text">{label}</span>
          <span className="indicator" />
        </label>
      </div>
    );
  }
}
