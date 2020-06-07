import { inject, observer } from 'mobx-react';
import { IRootStore, storeDefaultProps } from '../../store';
import * as React from 'react';

export interface IIconCardOwnProps {
  error?: string;
  icon: string;
  id: number;
  ident: string;
  monitored?: boolean;
  storeKey?: string;
  title: string;
  type: string;
  value?: boolean;
}

export type IIconCardProps = IIconCardOwnProps & Partial<IRootStore>;

function IconCard({
  error,
  icon,
  id,
  ident,
  monitored,
  storeKey,
  title,
  store = storeDefaultProps.store,
  type,
  value,
}: IIconCardProps) {
  const { appStore } = store;
  const isOn = value;
  const cls =
    isOn || (monitored && !error)
      ? `bg-${error ? 'danger' : type} text-white`
      : `bg-${error ? 'danger text-white' : 'default inactive'}`;

  const errorLabel = <span className="badge badge-warning">{error}</span>;
  const toggleLabel = (
    <label className="switch-light switch-material">
      <input
        type="checkbox"
        checked={isOn}
        onChange={() => {
          if (storeKey) {
            appStore.setValue(storeKey, ident, id, !isOn);
          }
        }}
      />
      <span>
        <span>Off</span>
        <span>On</span>
        <div />
      </span>
    </label>
  );
  const monitorLabel = <span> No problems detected </span>;

  return (
    <div className={`card ${cls} o-hidden h-100`}>
      <div className="card-body">
        <div className="card-body-icon">
          <span className={icon} aria-hidden="true" />
        </div>
        <h5 className="mr-5 mb-0">{title}</h5>
      </div>
      <div
        className={`card-footer position-relative${
          isOn ? ' text-white' : ''
        } clearfix small z-1 pt-2 pb-2`}
      >
        {monitored && !error && (
          <div className="scanner-dot">
            <div className="dot" />
          </div>
        )}
        <span className={`float-left${monitored ? '' : ' mt-2'}`}>Current status</span>
        <span className="float-right">
          {error ? errorLabel : monitored ? monitorLabel : toggleLabel}
        </span>
      </div>
    </div>
  );
}

export default inject('store')(observer(IconCard));
