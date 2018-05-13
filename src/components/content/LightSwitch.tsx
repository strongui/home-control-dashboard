import { IAppState } from '../../store';
import { inject, observer } from 'mobx-react';
import * as React from 'react';

export interface ILightSwitch {
  group?: string;
  groupLabel?: string;
  id: number;
  ident: string;
  label: string;
  value: boolean;
}

export interface ILightSwitchProps extends ILightSwitch {
  store?: IAppState;
  storeKey: string;
}

class LightSwitch extends React.Component<ILightSwitchProps, {}> {
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
          onChange={() => this.props.store!.appStore.setValue(storeKey, ident, id, !value)}
        />
        <label className="switch" htmlFor={switchId}>
          {label}
        </label>
      </div>
    );
  }
}

export default inject('store')(observer(LightSwitch));
