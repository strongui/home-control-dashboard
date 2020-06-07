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

export type ILightSwitchProps = ILightSwitchOwnProps & Partial<IRootStore>;

function LightSwitch({
  group,
  groupLabel,
  id,
  ident,
  label,
  store = storeDefaultProps.store,
  storeKey = '',
  value,
}: ILightSwitchProps) {
  const { appStore } = store;
  const { setValue } = appStore;
  const switchId = `lightswitch-${storeKey}-${id}`;

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (storeKey) {
      setValue(storeKey, ident, id, !value);
    }
  };

  return (
    <div>
      <input
        checked={value}
        className="light-switch"
        id={switchId}
        name="switch"
        onChange={handleChange}
        type="checkbox"
      />
      <label className="switch" htmlFor={switchId}>
        <span className="text">{label}</span>
        <span className="indicator" />
      </label>
    </div>
  );
}

export default inject('store')(observer(LightSwitch));
