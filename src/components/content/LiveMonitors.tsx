import * as React from 'react';
import IconCard, { IIconCardProps } from './IconCard';

export interface ILiveMonitorsProps {
  cards: IIconCardProps[];
}

export default class LiveMonitors extends React.Component<ILiveMonitorsProps, {}> {
  render() {
    const cards = this.props.cards.map(iconCard => (
      <div className="col-sm-12 mb-3" key={iconCard.id}>
        <IconCard {...iconCard} />
      </div>
    ));

    return (
      <div className="row">
        <div className="col-xl-4 col-md-6 col-sm-12 mb-3">
          <div className="row">{cards}</div>
        </div>
        <div className="col-xl-8 col-md-6 col-sm-12 mb-3" />
      </div>
    );
  }
}
