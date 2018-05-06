import * as React from 'react';
import AreaChart from './AreaChart';
import DataTables from './DataTables';
import IconCards from './IconCards';

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
        <IconCards />
        <AreaChart />
        <DataTables />
      </div>
    );
  }
}
