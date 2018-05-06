import * as React from 'react';

export interface IStatusProps {
  status: string;
  className?: string;
}

export default class Status extends React.PureComponent<IStatusProps, {}> {
  render() {
    switch (this.props.status) {
      case 'online':
        return (
          <span
            className={`badge badge-success${
              this.props.className ? ` ${this.props.className}` : ''
            }`}
          >
            <span className="fas fa-check mr-1" aria-hidden="true" /> Online
          </span>
        );
      case 'offline':
        return (
          <span
            className={`badge badge-default${
              this.props.className ? ` ${this.props.className}` : ''
            }`}
          >
            <span className="fas fa-power-off mr-1" aria-hidden="true" /> Offline
          </span>
        );
      case 'error':
        return (
          <span
            className={`badge badge-danger${
              this.props.className ? ` ${this.props.className}` : ''
            }`}
          >
            <span className="fas fa-exclamation-circle mr-1" aria-hidden="true" /> Error
          </span>
        );
      case 'syncing':
        return (
          <span
            className={`badge badge-info${this.props.className ? ` ${this.props.className}` : ''}`}
          >
            <span className="fas fa-sync fa-spin mr-1" aria-hidden="true" /> Syncing...
          </span>
        );
      default:
        return <span />;
    }
  }
}
