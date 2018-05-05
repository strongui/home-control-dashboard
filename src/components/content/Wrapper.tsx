import * as React from 'react';
import AreaChart from './AreaChart';
import DataTables from './DataTables';
import IronCards from './IronCards';

export default class Wrapper extends React.Component<{}, any> {
  render() {
    return (
      <div className="container-fluid">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <a href="#">Dashboard</a>
          </li>
          <li className="breadcrumb-item active">My Dashboard</li>
        </ol>
        <IronCards />
        <AreaChart />
        <DataTables />
      </div>
    );
  }
}
