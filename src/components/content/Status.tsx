import * as React from 'react';

export interface IStatusProps {
  status: string;
  className?: string;
}

export default function Status({ status, className }: IStatusProps) {
  switch (status) {
    case 'online':
      return (
        <span className={`badge badge-success${className ? ` ${className}` : ''}`}>
          <span className="fas fa-check mr-1" aria-hidden="true" /> Online
        </span>
      );
    case 'offline':
      return (
        <span className={`badge badge-default${className ? ` ${className}` : ''}`}>
          <span className="fas fa-power-off mr-1" aria-hidden="true" /> Offline
        </span>
      );
    case 'error':
      return (
        <span className={`badge badge-danger${className ? ` ${className}` : ''}`}>
          <span className="fas fa-exclamation-circle mr-1" aria-hidden="true" /> Error
        </span>
      );
    case 'syncing':
      return (
        <span className={`badge badge-info${className ? ` ${className}` : ''}`}>
          <span className="fas fa-sync fa-spin mr-1" aria-hidden="true" /> Syncing...
        </span>
      );
    default:
      return null;
  }
}
