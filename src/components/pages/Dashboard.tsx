import { IAppState } from '../../store';
import { inject, observer } from 'mobx-react';
import * as React from 'react';
import Callout from '../content/Callout';
import Controls from '../content/Controls';
import Loading from '../Loading';
import Status from '../content/Status';

export interface IDashboardProps {
  store?: IAppState;
}

class Dashboard extends React.Component<IDashboardProps, {}> {
  render() {
    const { store } = this.props;
    const { controlsInitialized, status } = store!.appStore;
    return (
      <div className="container-fluid">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <a href="#">Dashboard</a>
          </li>
          <li className="breadcrumb-item active">System Status</li>
        </ol>

        <Callout
          type="info"
          title="System Status"
          description="Overal system status and main system controls."
          titleExtra={<Status className="ml-2" status={status} />}
        />

        {controlsInitialized ? <Controls /> : <Loading />}
        <hr />
      </div>
    );
  }
}

export default inject('store')(observer(Dashboard));
