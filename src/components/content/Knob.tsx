import * as React from 'react';

export interface IKnobProps {
  value: number;
  onChange: (newValue: number) => any;
  onChangeEnd: (newValue: number) => void;
  min: number;
  max: number;
  step: number;
  log: boolean;
  width: number;
  height: number;
  thickness: number;
  lineCap?: 'butt' | 'round';
  bgColor: string;
  fgColor?: string;
  inputColor?: string;
  font?: string;
  fontWeight?: string;
  clockwise?: boolean;
  cursor?: number | boolean;
  stopper?: boolean;
  readOnly?: boolean;
  disableTextInput?: boolean;
  displayInput?: boolean;
  displayCustom?: () => any;
  angleArc: number;
  angleOffset: number;
  disableMouseWheel?: boolean;
  title?: string;
  className?: string | undefined;
  canvasClassName?: string | undefined;
}

class Knob extends React.Component<IKnobProps, {}> {
  static defaultProps: Partial<IKnobProps> = {
    angleArc: 360,
    angleOffset: 0,
    bgColor: '#EEE',
    canvasClassName: undefined,
    className: undefined,
    clockwise: true,
    cursor: false,
    disableMouseWheel: false,
    disableTextInput: false,
    displayInput: true,
    fgColor: '#EA2',
    font: 'Arial',
    fontWeight: 'bold',
    height: 200,
    inputColor: '',
    lineCap: 'butt',
    log: false,
    max: 100,
    min: 0,
    onChangeEnd: (newValue: number) => undefined,
    readOnly: false,
    step: 1,
    stopper: true,
    thickness: 0.35,
    width: 200,
  };

  private angleArc: number;
  private angleOffset: number;
  private canvasRef: any;
  private cursorExt: number;
  private digits: number;
  private endAngle: number;
  private h: number;
  private lineWidth: number = 1;
  private radius: number = 50;
  private startAngle: number;
  private touchIndex: number = -1;
  private w: number;
  private xy: number = 0;

  constructor(props: IKnobProps) {
    super(props);
    this.w = this.props.width || 200;
    this.h = this.props.height || this.w;
    this.cursorExt =
      this.props.cursor === true
        ? 0.3
        : typeof this.props.cursor === 'number'
        ? this.props.cursor / 100
        : 0.3;
    this.angleArc = (this.props.angleArc * Math.PI) / 180;
    this.angleOffset = (this.props.angleOffset * Math.PI) / 180;
    this.startAngle = 1.5 * Math.PI + this.angleOffset;
    this.endAngle = 1.5 * Math.PI + this.angleOffset + this.angleArc;
    this.digits =
      Math.max(
        String(Math.abs(this.props.min)).length,
        String(Math.abs(this.props.max)).length,
        2
      ) + 2;
  }

  componentDidMount() {
    this.drawCanvas();
    if (!this.props.readOnly) {
      this.canvasRef.addEventListener('touchstart', this.handleTouchStart, { passive: false });
    }
  }

  componentDidUpdate(prevProps: IKnobProps) {
    if (this.props.width && this.w !== this.props.width) {
      this.w = this.props.width;
    }
    if (this.props.height && this.h !== this.props.height) {
      this.h = this.props.height;
    }
    this.drawCanvas();
  }

  componentWillUnmount() {
    this.canvasRef.removeEventListener('touchstart', this.handleTouchStart);
  }

  getArcToValue = (v: number) => {
    let startAngle;
    let endAngle;
    const angle = !this.props.log
      ? ((v - this.props.min) * this.angleArc) / (this.props.max - this.props.min)
      : Math.log(Math.pow(v / this.props.min, this.angleArc)) /
        Math.log(this.props.max / this.props.min);
    if (!this.props.clockwise) {
      startAngle = this.endAngle + 0.00001;
      endAngle = startAngle - angle - 0.00001;
    } else {
      startAngle = this.startAngle - 0.00001;
      endAngle = startAngle + angle + 0.00001;
    }
    if (this.props.cursor) {
      startAngle = endAngle - this.cursorExt;
      endAngle += this.cursorExt;
    }
    return {
      acw: !this.props.clockwise && !this.props.cursor,
      endAngle,
      startAngle,
    };
  };

  // Calculate ratio to scale canvas to avoid blurriness on HiDPI devices
  getCanvasScale = (ctx: any) => {
    const devicePixelRatio = window.devicePixelRatio || 1;
    const backingStoreRatio = ctx.webkitBackingStorePixelRatio || 1;
    return devicePixelRatio / backingStoreRatio;
  };

  coerceToStep = (v: number) => {
    let val = !this.props.log
      ? // tslint:disable-next-line no-bitwise
        ~~((v < 0 ? -0.5 : 0.5) + v / this.props.step) * this.props.step
      : Math.pow(
          this.props.step,
          // tslint:disable-next-line no-bitwise
          ~~((Math.abs(v) < 1 ? -0.5 : 0.5) + Math.log(v) / Math.log(this.props.step))
        );
    val = Math.max(Math.min(val, this.props.max), this.props.min);
    if (isNaN(val)) {
      val = 0;
    }
    return Math.round(val * 1000) / 1000;
  };

  eventToValue = (e: any) => {
    const bounds = this.canvasRef.getBoundingClientRect();
    const x = e.clientX - bounds.left;
    const y = e.clientY - bounds.top;
    let a = Math.atan2(x - this.w / 2, this.w / 2 - y) - this.angleOffset;
    if (!this.props.clockwise) {
      a = this.angleArc - a - 2 * Math.PI;
    }
    if (this.angleArc !== Math.PI * 2 && a < 0 && a > -0.5) {
      a = 0;
    } else if (a < 0) {
      a += Math.PI * 2;
    }
    const val = !this.props.log
      ? (a * (this.props.max - this.props.min)) / this.angleArc + this.props.min
      : Math.pow(this.props.max / this.props.min, a / this.angleArc) * this.props.min;
    return this.coerceToStep(val);
  };

  handleMouseDown = (e: any) => {
    this.props.onChange(this.eventToValue(e));
    document.addEventListener('mousemove', this.handleMouseMove);
    document.addEventListener('mouseup', this.handleMouseUp);
    document.addEventListener('keyup', this.handleEsc);
  };

  handleMouseMove = (e: any) => {
    e.preventDefault();
    this.props.onChange(this.eventToValue(e));
  };

  handleMouseUp = (e: any) => {
    this.props.onChangeEnd(this.eventToValue(e));
    document.removeEventListener('mousemove', this.handleMouseMove);
    document.removeEventListener('mouseup', this.handleMouseUp);
    document.removeEventListener('keyup', this.handleEsc);
  };

  handleTouchStart = (e: any) => {
    e.preventDefault();
    this.touchIndex = e.targetTouches.length - 1;
    this.props.onChange(this.eventToValue(e.targetTouches[this.touchIndex]));
    document.addEventListener('touchmove', this.handleTouchMove, { passive: false });
    document.addEventListener('touchend', this.handleTouchEnd);
    document.addEventListener('touchcancel', this.handleTouchEnd);
  };

  handleTouchMove = (e: any) => {
    e.preventDefault();
    this.props.onChange(this.eventToValue(e.targetTouches[this.touchIndex]));
  };

  handleTouchEnd = (e: any) => {
    this.props.onChangeEnd(this.eventToValue(e));
    document.removeEventListener('touchmove', this.handleTouchMove);
    document.removeEventListener('touchend', this.handleTouchEnd);
    document.removeEventListener('touchcancel', this.handleTouchEnd);
  };

  handleEsc = (e: any) => {
    if (e.keyCode === 27) {
      e.preventDefault();
      this.handleMouseUp(e);
    }
  };

  handleTextInput = (
    e: React.KeyboardEvent<HTMLInputElement> | React.ChangeEvent<HTMLInputElement>
  ) => {
    const val =
      Math.max(Math.min(+e.currentTarget.value, this.props.max), this.props.min) || this.props.min;
    this.props.onChange(val);
  };

  handleWheel = (e: any) => {
    e.preventDefault();
    if (e.deltaX > 0 || e.deltaY > 0) {
      this.props.onChange(
        this.coerceToStep(
          !this.props.log ? this.props.value + this.props.step : this.props.value * this.props.step
        )
      );
    } else if (e.deltaX < 0 || e.deltaY < 0) {
      this.props.onChange(
        this.coerceToStep(
          !this.props.log ? this.props.value - this.props.step : this.props.value / this.props.step
        )
      );
    }
  };

  handleArrowKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.keyCode === 37 || e.keyCode === 40) {
      e.preventDefault();
      this.props.onChange(
        this.coerceToStep(
          !this.props.log ? this.props.value - this.props.step : this.props.value / this.props.step
        )
      );
    } else if (e.keyCode === 38 || e.keyCode === 39) {
      e.preventDefault();
      this.props.onChange(
        this.coerceToStep(
          !this.props.log ? this.props.value + this.props.step : this.props.value * this.props.step
        )
      );
    }
  };

  inputStyle = () => ({
    MozAppearance: 'none',
    WebkitAppearance: 'none',
    appearance: 'none',
    background: 'none',
    border: 0,
    color: this.props.inputColor || this.props.fgColor,
    // tslint:disable-next-line no-bitwise
    font: `${this.props.fontWeight} ${(this.w / this.digits) >> 0}px ${this.props.font}`,
    // tslint:disable-next-line no-bitwise
    height: `${(this.w / 3) >> 0}px`,
    // tslint:disable-next-line no-bitwise
    marginLeft: `-${((this.w * 3) / 4 + 2) >> 0}px`,
    // tslint:disable-next-line no-bitwise
    marginTop: `${(this.w / 3) >> 0}px`,
    padding: '0px',
    position: 'absolute',
    textAlign: 'center',
    verticalAlign: 'middle',
    // tslint:disable-next-line no-bitwise
    width: `${(this.w / 2 + 4) >> 0}px`,
  });

  drawCanvas() {
    const ctx = this.canvasRef.getContext('2d');
    const scale = this.getCanvasScale(ctx);
    this.canvasRef.width = this.w * scale; // clears the canvas
    this.canvasRef.height = this.h * scale;
    ctx.scale(scale, scale);
    this.xy = this.w / 2; // coordinates of canvas center
    this.lineWidth = this.xy * this.props.thickness;
    this.radius = this.xy - this.lineWidth / 2;
    ctx.lineWidth = this.lineWidth;
    ctx.lineCap = this.props.lineCap;
    // background arc
    ctx.beginPath();
    ctx.strokeStyle = this.props.bgColor;
    ctx.arc(
      this.xy,
      this.xy,
      this.radius,
      this.endAngle - 0.00001,
      this.startAngle + 0.00001,
      true
    );
    ctx.stroke();
    // foreground arc
    const a = this.getArcToValue(this.props.value);
    ctx.beginPath();
    ctx.strokeStyle = this.props.fgColor;
    ctx.arc(this.xy, this.xy, this.radius, a.startAngle, a.endAngle, a.acw);
    ctx.stroke();
  }

  renderCenter = () => {
    const { displayCustom, displayInput, disableTextInput, readOnly, value } = this.props;

    if (displayInput) {
      return (
        // @ts-ignore tslint:disable-next-line
        <input
          onChange={this.handleTextInput}
          onKeyDown={this.handleArrowKey}
          readOnly={readOnly || disableTextInput}
          style={this.inputStyle() as any}
          type="text"
          value={value}
        />
      );
    }
    if (displayCustom && typeof displayCustom === 'function') {
      return displayCustom();
    }
    return null;
  };

  render() {
    const { canvasClassName, className, disableMouseWheel, readOnly, title, value } = this.props;

    return (
      <div
        className={className}
        style={{ width: this.w, height: this.h, display: 'inline-block' }}
        onWheel={readOnly || disableMouseWheel ? () => undefined : this.handleWheel}
      >
        <canvas
          ref={(ref) => {
            this.canvasRef = ref;
          }}
          className={canvasClassName}
          style={{ width: '100%', height: '100%' }}
          onMouseDown={readOnly ? () => undefined : this.handleMouseDown}
          title={title ? `${title}: ${value}` : value.toString()}
        />
        {this.renderCenter()}
      </div>
    );
  }
}

export default Knob;
