import * as React from 'react';
import ChartCard, { IChartCardOwnProps } from './ChartCard';

export interface IChartCardsControlledProps {
  cards: IChartCardOwnProps[];
  storeKey: string;
}

export default class ChartCardsControlled extends React.Component<IChartCardsControlledProps, {}> {
  render() {
    const cards = this.props.cards.map((chartCard) => (
      <div className="col-xl-4 col-sm-6 mb-3" key={chartCard.id}>
        <ChartCard storeKey={this.props.storeKey} {...chartCard} />
      </div>
    ));
    return <div className="row">{cards}</div>;
  }
}
