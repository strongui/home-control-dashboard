import * as React from 'react';
import entryJpg from '../../images/entry.jpg';
import houseJpg from '../../images/house.jpg';
import IconCard, { IIconCardOwnProps } from './IconCard';
import livingroomJpg from '../../images/livingroom.jpg';
import Power from './Power';
import VideoFeed from './VideoFeed';

export interface ILiveMonitorsProps {
  cards: IIconCardOwnProps[];
  storeKey: string;
}

export default function LiveMonitors({ cards, storeKey }: ILiveMonitorsProps) {
  const cardElms = cards.map((iconCard) => (
    <div className="col-sm-12 mb-3" key={iconCard.id}>
      <IconCard {...iconCard} storeKey={storeKey} />
    </div>
  ));
  const images = [
    {
      description:
        'Quisque nec elit lacinia, luctus tortor sit amet, dignissim lectus. Ut facilisis purus eu nisi dapibus, vitae iaculis turpis sagittis.',
      link: houseJpg,
      name: 'House',
    },
    {
      description:
        'Sed semper ligula gravida diam consequat lobortis. Nullam lobortis, ipsum sit amet laoreet gravida, arcu lacus mattis sapien, ac gravida urna sem non turpis.',
      link: livingroomJpg,
      name: 'Livingroom',
    },
    {
      description:
        'Etiam sed dapibus est, iaculis efficitur arcu. Nam quis blandit massa. Proin sagittis venenatis quam varius pretium. ',
      link: entryJpg,
      name: 'Entry',
    },
  ];

  return (
    <div className="row">
      <div className="col-xl-3 col-md-4 col-sm-12 mb-3">
        <div className="row">{cardElms}</div>
      </div>
      <div className="col-xl-5 col-md-5 col-sm-12 mb-3">
        <Power />
      </div>
      <div className="col-xl-4 col-md-3 col-sm-12 mb-3">
        <VideoFeed images={images} />
      </div>
    </div>
  );
}
