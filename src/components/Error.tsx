import * as React from 'react';

export default function Error({ title }: { title: string }) {
  return (
    <div className="card text-white bg-danger o-hidden h-100">
      <div className="card-body">
        <div className="card-body-icon">
          <i className="fas fa-exclamation-triangle" />
        </div>
        <h4>Well, this is embarrassing</h4>
        <div className="mr-5">{title}</div>
      </div>
    </div>
  );
}
