import * as React from 'react';

export default class Footer extends React.Component<{}, any> {
  render() {
    return (
      <footer className="sticky-footer">
        <div className="container">
          <div className="text-center">
            <small>Copyright © Your Website 2018</small>
          </div>
        </div>
      </footer>
    );
  }
}
