import * as React from 'react';
import ChartCard, { IChartCardOwnProps } from './ChartCard';

export interface IChartCardsControlledProps {
  cards: IChartCardOwnProps[];
  storeKey: string;
}

export default function ChartCardsControlled({ cards, storeKey }: IChartCardsControlledProps) {
  const cardElms = cards.map((chartCard) => (
    <div className="col-xl-4 col-sm-6 mb-3" key={chartCard.id}>
      <ChartCard {...chartCard} storeKey={storeKey} />
    </div>
  ));
  return <div className="row">{cardElms}</div>;
}
