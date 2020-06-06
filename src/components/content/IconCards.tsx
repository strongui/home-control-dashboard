import * as React from 'react';
import IconCard, { IIconCardOwnProps } from './IconCard';

export interface IconCardsProps {
  cards: IIconCardOwnProps[];
  storeKey: string;
}

export default class IconCards extends React.Component<IconCardsProps, {}> {
  render() {
    const cards = this.props.cards.map((iconCard) => (
      <div className="col-xl-3 col-sm-6 mb-3" key={iconCard.id}>
        <IconCard storeKey={this.props.storeKey} {...iconCard} />
      </div>
    ));

    return <div className="row">{cards}</div>;
  }
}
