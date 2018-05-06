import * as React from 'react';

export default class Footer extends React.Component<{}, any> {
  render() {
    const currentYear = new Date().getFullYear();
    return (
      <footer className="sticky-footer">
        <div className="container">
          <div className="text-center">
            <small>Copyright © Amir Karamuja {currentYear}</small>
          </div>
        </div>
      </footer>
    );
  }
}
