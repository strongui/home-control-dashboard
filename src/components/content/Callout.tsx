import * as React from 'react';

export interface ICalloutProps {
  description?: string;
  title: string;
  titleExtra?: JSX.Element;
  type?: string;
}

export default class Callout extends React.PureComponent<ICalloutProps, {}> {
  render() {
    const type = this.props.type ? this.props.type : 'default';
    return (
      <div className={`bd-callout bd-callout-${type}`}>
        <h4>
          {this.props.title}
          {this.props.titleExtra && this.props.titleExtra}
        </h4>
        {this.props.description && <p>{this.props.description}</p>}
      </div>
    );
  }
}
