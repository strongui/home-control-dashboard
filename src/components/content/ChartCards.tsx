import * as React from 'react';
import ChartCard, { IChartCardProps } from './ChartCard';

export interface IChartCardsProps {
  cards: IChartCardProps[];
}

export default class ChartCards extends React.Component<IChartCardsProps, {}> {
  render() {
    const cards = this.props.cards.map(chartCard => (
      <div className="col-xl-6 col-sm-6 mb-3" key={chartCard.id}>
        <ChartCard {...chartCard} />
      </div>
    ));
    return <div className="row">{cards}</div>;
  }
}
