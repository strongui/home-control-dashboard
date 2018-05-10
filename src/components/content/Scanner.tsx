import * as React from 'react';

export interface IScannerProps {
  className?: string;
}

export default class Scanner extends React.PureComponent<IScannerProps, {}> {
  render() {
    return (
      <div className={`scanner ${this.props.className}`}>
        <div className="one" />
        <div className="two" />
        <div className="three" />
        <div className="four" />
        <div className="five" />
      </div>
    );
  }
}
