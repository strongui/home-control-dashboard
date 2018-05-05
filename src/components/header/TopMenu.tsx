import * as React from 'react';

export default class TopMenu extends React.Component<{}, any> {
  render() {
    return (
      <ul className="navbar-nav ml-auto">
        <li className="nav-item dropdown">
          <a
            className="nav-link dropdown-toggle mr-lg-2"
            id="messagesDropdown"
            href="#"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            <i className="fa fa-fw fa-envelope" aria-hidden="true" />
            <span className="d-lg-none">
              Messages
              <span className="badge badge-pill badge-primary">12 New</span>
            </span>
            <span className="indicator text-primary d-none d-lg-block">
              <i className="fa fa-fw fa-circle" aria-hidden="true" />
            </span>
          </a>
          <div className="dropdown-menu" aria-labelledby="messagesDropdown">
            <h6 className="dropdown-header">New Messages:</h6>
            <div className="dropdown-divider" />
            <a className="dropdown-item" href="#">
              <strong>David Miller</strong>
              <span className="small float-right text-muted">11:21 AM</span>
              <div className="dropdown-message small">
                Hey there! This new version of SB Admin is pretty awesome! These messages clip off
                when they reach the end of the box so they don't overflow over to the sides!
              </div>
            </a>
            <div className="dropdown-divider" />
            <a className="dropdown-item" href="#">
              <strong>Jane Smith</strong>
              <span className="small float-right text-muted">11:21 AM</span>
              <div className="dropdown-message small">
                I was wondering if you could meet for an appointment at 3:00 instead of 4:00.
                Thanks!
              </div>
            </a>
            <div className="dropdown-divider" />
            <a className="dropdown-item" href="#">
              <strong>John Doe</strong>
              <span className="small float-right text-muted">11:21 AM</span>
              <div className="dropdown-message small">
                I've sent the final files over to you for review. When you're able to sign off of
                them let me know and we can discuss distribution.
              </div>
            </a>
            <div className="dropdown-divider" />
            <a className="dropdown-item small" href="#">
              View all messages
            </a>
          </div>
        </li>
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
