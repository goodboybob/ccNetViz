export default class Shape {
  constructor(config, instance) {
    this.config = config;

    this.canvas = document.createElement('canvas');
    this.canvas.width = 0;
    this.canvas.height = 0;
    //this.canvas.style.display = 'none';
    this.default = {};

    this._preConf();
    this._setCanvas();
    this._setGradient();
    this._preDraw();
    this._draw();
  }

  // Before the drawing; when the config is existed override the default config.
  _preConf() {
    // Default config
    this.default = {
      stroke: {
        color: "#ffffff",
        size: 0.00000001,
        round: false
      },
      textureColor: "#dddddd",
      thickness: 20,
      height: 24,
      minSize: 6,
      maxSize: 12,
      aspect: 1
    };

    if (typeof this.config !== "undefined") {

      // Stroke configuration
      if (typeof this.config.stroke !== "undefined") {
        this.config.stroke.size = this.config.stroke.size || this.default.stroke.size;
        this.config.stroke.color = this.config.stroke.color || this.default.stroke.color;
        this.config.stroke.round = this.config.stroke.round || this.default.stroke.round;
      } else {
        this.config.stroke = this.default.stroke;
      }

      this.config.thickness = this.config.thickness || this.default.thickness;
      this.config.height = this.config.height || this.default.height;
      this.config.aspect = this.config.aspect || this.default.aspect;
      this.config.minSize = this.config.minSize || this.default.maxSize;
      this.config.maxSize = this.config.maxSize || this.default.maxSize;
      this.config.textureColor = this.config.textureColor || this.default.textureColor;

    } else {
      this.config = this.default;
    }
    this.canvas.width = 0;
    this.canvas.height = 0;
  }

  // Setting up the canvas width, height. Also, creating canvas context and colors.
  _setCanvas() {
    this.offset = {
      x: this.config.thickness < this.config.height ? (this.config.height - this.config.thickness) / 2 : 0,
      y: this.config.height < this.config.thickness ? (this.config.thickness - this.config.height) / 2 : 0
    }

    let cursor = {
      x0: this.canvas.width,
      y0: this.canvas.height,
      x1: this.canvas.width + ((this.config.stroke.size * 2) + this.config.thickness),
      y1: this.canvas.height + ((this.config.stroke.size * 2) + this.config.height)
    };
    this.canvas.width = cursor.x1 < cursor.y1 ? cursor.y1 : cursor.x1;
    this.canvas.height = cursor.y1;
    this.context = this.canvas.getContext('2d');
    this.context.fillStyle = this.config.textureColor;
    this.context.strokeStyle = this.config.stroke.color;
    this.context.lineWidth = this.config.stroke.size;
    this.config.stroke.round ? this.context.lineJoin = "round" : false;
  }

  _setGradient() {
    if (typeof this.config.textureGradient !== "undefined") {
      let gradient = this.context.createLinearGradient(0, 0,
        typeof this.config.textureGradient[0].x !== "undefined" ? this.canvas.width : 0,
        typeof this.config.textureGradient[0].y !== "undefined" ? this.canvas.height : 0);
      this.config.textureGradient.map(item => {
        gradient.addColorStop(item.x || item.y || 0, item.color || this.config.textureColor);
      });
      this.context.fillStyle = gradient;
    }
  }

  _preDraw() { }

  _draw() { }

  // Canvas transform into the 0-1 range
  x(size) {
    return this.offset.x + (this.config.stroke.size) + (this.config.thickness * size);
  }

  // Canvas transform into the 0-1 range
  y(size) {
    return this.offset.y + (this.config.stroke.size) + (this.config.height * size);
  }

  toConfig() {
    return new Promise((resolve, reject) => {
      this.canvas.toBlob(blob => {
        resolve(
          Object.assign({ texture: URL.createObjectURL(blob) }, this.config) ,
        );
      }, 'image/png');
    });;
  }
}