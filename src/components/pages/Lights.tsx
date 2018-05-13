import * as React from 'react';
import { Link } from 'react-router-dom';

export default class Lights extends React.Component<{}, {}> {
  render() {
    return (
      <div className="container-fluid">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/lights">Lights</Link>
          </li>
          <li className="breadcrumb-item active">Control house lighting</li>
        </ol>
        <article>
          <div className="card">
            <div className="card-body" />
          </div>
        </article>
      </div>
    );
  }
}
