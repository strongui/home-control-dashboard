import * as React from 'react';
import IconCard, { IIconCardOwnProps } from './IconCard';

export interface IConCardsProps {
  cards: IIconCardOwnProps[];
  storeKey: string;
}

export default function IconCards({ cards, storeKey }: IConCardsProps) {
  const cardElms = cards.map((iconCard) => (
    <div className="col-xl-3 col-sm-6 mb-3" key={iconCard.id}>
      <IconCard {...iconCard} storeKey={storeKey} />
    </div>
  ));

  return <div className="row">{cardElms}</div>;
}
