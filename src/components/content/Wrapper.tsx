import * as React from 'react';
import AreaChartProps from './AreaChartProps';
import DataTables from './DataTables';
import IronCards from './IronCards';

export interface WrapperProps {}

export default class Wrapper extends React.Component<WrapperProps, any> {
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
        <AreaChartProps />
        <DataTables />
      </div>
    );
  }
}
