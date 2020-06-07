import * as React from 'react';

export interface ICalloutProps {
  description?: string;
  title: string;
  titleExtra?: JSX.Element;
  type?: string;
}

export default function Callout(props: ICalloutProps) {
  const { description, title, titleExtra, type = 'default' } = props;

  return (
    <div className={`bd-callout bd-callout-${type}`}>
      <h4>
        {title}
        {titleExtra && titleExtra}
      </h4>
      {description && <p>{description}</p>}
    </div>
  );
}
