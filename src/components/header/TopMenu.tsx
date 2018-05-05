import * as React from 'react';
import Notification from './Notification';

const messages = require('./data/messages.json');

export default class TopMenu extends React.Component<{}, any> {
  render() {
    return (
      <ul className="navbar-nav ml-auto">
        <Notification
          title="Messages"
          notificationCount={messages.length}
          icon="envelope"
          notifications={messages}
        />

        <li className="nav-item dropdown">
          <a
            className="nav-link dropdown-toggle mr-lg-2"
            id="alertsDropdown"
            href="#"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            <i className="fa fa-fw fa-bell" aria-hidden="true" />
            <span className="d-lg-none">
              Alerts
              <span className="badge badge-pill badge-warning">6 New</span>
            </span>
            <span className="indicator text-warning d-none d-lg-block">
              <i className="fa fa-fw fa-circle" aria-hidden="true" />
            </span>
          </a>
          <div className="dropdown-menu" aria-labelledby="alertsDropdown">
            <h6 className="dropdown-header">New Alerts:</h6>
            <div className="dropdown-divider" />
            <a className="dropdown-item" href="#">
              <span className="text-success">
                <strong>
                  <i className="fa fa-long-arrow-up fa-fw" aria-hidden="true" />Status Update
                </strong>
              </span>
              <span className="small float-right text-muted">11:21 AM</span>
              <div className="dropdown-message small">
                This is an automated server response message. All systems are online.
              </div>
            </a>
            <div className="dropdown-divider" />
            <a className="dropdown-item" href="#">
              <span className="text-danger">
                <strong>
                  <i className="fa fa-long-arrow-down fa-fw" aria-hidden="true" />Status Update
                </strong>
              </span>
              <span className="small float-right text-muted">11:21 AM</span>
              <div className="dropdown-message small">
                This is an automated server response message. All systems are online.
              </div>
            </a>
            <div className="dropdown-divider" />
            <a className="dropdown-item" href="#">
              <span className="text-success">
                <strong>
                  <i className="fa fa-long-arrow-up fa-fw" aria-hidden="true" />Status Update
                </strong>
              </span>
              <span className="small float-right text-muted">11:21 AM</span>
              <div className="dropdown-message small">
                This is an automated server response message. All systems are online.
              </div>
            </a>
            <div className="dropdown-divider" />
            <a className="dropdown-item small" href="#">
              View all alerts
            </a>
          </div>
        </li>
        <li className="nav-item">
          <form className="form-inline my-2 my-lg-0 mr-lg-2">
            <div className="input-group">
              <input className="form-control" type="text" placeholder="Search for..." />
              <span className="input-group-append">
                <button className="btn btn-primary" type="button">
                  <i className="fa fa-search" aria-hidden="true" />
                </button>
              </span>
            </div>
          </form>
        </li>
        <li className="nav-item">
          <a className="nav-link" data-toggle="modal" data-target="#exampleModal">
            <i className="fa fa-fw fa-sign-out" aria-hidden="true" />Logout
          </a>
        </li>
      </ul>
    );
  }
}
