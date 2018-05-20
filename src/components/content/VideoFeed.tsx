import * as React from 'react';

export interface IImageOjb {
  description: string;
  link: string;
  name: string;
}

export interface IVideoFeedProps {
  images: IImageOjb[];
}
export interface IVideoFeedState {
  activeIndex: number;
}

export default class VideoFeed extends React.PureComponent<IVideoFeedProps, IVideoFeedState> {
  private interval: any;

  constructor(params: IVideoFeedProps) {
    super(params);
    this.state = {
      activeIndex: 0,
    };
    this.nextCam = this.nextCam.bind(this);
  }

  componentDidMount() {
    this.interval = setInterval(this.nextCam, 5000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  nextCam() {
    this.setState((prevState, props) => {
      const totalImgs = props.images.length;
      const newIndex = prevState.activeIndex + 1 > totalImgs - 1 ? 0 : prevState.activeIndex + 1;
      return {
        activeIndex: newIndex,
      };
    });
  }

  render() {
    const { activeIndex } = this.state;
    const { images } = this.props;
    const randomImage = images[activeIndex];
    const { description, link, name } = randomImage;

    return (
      <div className="card video-feed o-hidden">
        <div className="card-body bg-warning">
          <div className="card-body-icon text-white">
            <span className="fas fa-video" aria-hidden="true" />
          </div>
          <h4 className="text-white card-title">Video feed</h4>
          <h6 className="card-subtitle text-white m-b-0 op-5">Uptime: 38 days</h6>
        </div>
        <div className="rec">
          <div className="dot" /> REC{' '}
        </div>
        <img className="card-img-top" src={link} alt={name} />
        <div className="card-body">
          <p className="card-text">{description}</p>
        </div>
      </div>
    );
  }
}
