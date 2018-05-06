import * as React from 'react';

export interface IIconCardProps {
  error?: string;
  icon: string;
  on: boolean;
  title: string;
  type: string;
}

export interface IIconCardState {
  isOn: boolean;
}

export default class IconCard extends React.Component<IIconCardProps, IIconCardState> {
  constructor(props: IIconCardProps) {
    super(props);
    this.state = {
      isOn: false,
    };
    this.toggle = this.toggle.bind(this);
  }

  componentDidMount() {
    this.setState({ isOn: this.props.on });
  }

  toggle() {
    this.setState({ isOn: !this.state.isOn });
  }

  render() {
    const { isOn } = this.state;
    const { error, icon, title, type } = this.props;
    const cls = isOn
      ? `bg-${error ? 'danger' : type} text-white`
      : `bg-${error ? 'danger text-white' : 'default'}`;

    const errorLabel = <span className="badge badge-warning">{error}</span>;
    const toggleLabel = (
      <label className="switch-light switch-material">
        <input type="checkbox" checked={isOn} onChange={this.toggle} />
        <span>
          <span>Off</span>
          <span>On</span>
          <a />
        </span>
      </label>
    );

    return (
      <div className={`card ${cls} o-hidden h-100`}>
        <div className="card-body">
          <div className="card-body-icon">
            <i className={`fab fa-${icon}`} />
          </div>
          <h5 className="mr-5 mb-0">{title}</h5>
        </div>
        <div className={`card-footer${isOn ? ' text-white' : ''} clearfix small z-1 pt-2 pb-2`}>
          <span className="float-left mt-1">Current status</span>
          <span className="float-right">{error ? errorLabel : toggleLabel}</span>
        </div>
      </div>
    );
  }
}
