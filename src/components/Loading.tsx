import * as React from 'react';

export default function Loading() {
  return (
    <div className="row">
      <div className="col-md-12">
        <div className="spinner">
          <div className="rect1" />
          <div className="rect2" />
          <div className="rect3" />
          <div className="rect4" />
          <div className="rect5" />
        </div>
      </div>
    </div>
  );
}
