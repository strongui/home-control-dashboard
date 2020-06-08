import { inject, observer } from 'mobx-react';
import { IRootStore, storeDefaultProps } from '../../store';
import { Link } from 'react-router-dom';
import * as React from 'react';
import Callout from '../content/Callout';
import Controls from '../content/Controls';
import Status from '../content/Status';

interface IDashboardOwnProps {}

export type IDashboardProps = IDashboardOwnProps & Partial<IRootStore>;

function Dashboard({ store = storeDefaultProps.store }: IDashboardProps) {
  const { appStore } = store;
  const { status } = appStore;
  return (
    <div className="container-fluid">
      <ol className="breadcrumb">
        <li className="breadcrumb-item">
          <Link to="/">Dashboard</Link>
        </li>
        <li className="breadcrumb-item active">System Status</li>
      </ol>

      <Callout
        type="info"
        title="System Status"
        description="Overal system status and main system controls."
        titleExtra={<Status className="ml-2" status={status} />}
      />

      <Controls />
    </div>
  );
}

export default inject('store')(observer(Dashboard));
