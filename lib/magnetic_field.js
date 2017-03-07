import constants from './constants';
import createjs from 'createjs-collection';

export default class MagneticField {
  constructor(pos) {
    this.pos = pos;
    this.pulses = new Array(constants.MAGNETIC_FIELD_PULSES);

  }

  activate(polarity) {
    this.active = true;
    this.polarity = polarity === "+" ? constants.PULSE_SPEED : -constants.PULSE_SPEED;
    if(this.polarity === constants.PULSE_SPEED) {
      this.initRadius = constants.MAGNET_RADIUS;
    }
    else {
      this.initRadius = constants.PULSE_RANGE;
    }
    for (var i = 0; i < this.pulses.length; i++) {
      this.pulses[i] = new createjs.Shape();
      this.pulses[i].graphics.beginStroke("black").drawCircle(this.pos[0], this.pos[1], this.initRadius);
      this.pulses[i].active = false;
      this.pulses[i].radius = this.initRadius;
    }
    this.pulses[0].active = true;
  }

  step(pulse) {
    pulse.radius += this.polarity;
  }

  draw(stage) {
    if(this.active) {
      this.pulses.forEach((pulse, i) => {
        stage.removeChild(pulse.shape);
        if(this.pulses[i].active) {
          this.step(this.pulses[i]);

          if(this.pulses[i+1] && !this.pulses[i+1].active && Math.abs(this.pulses[i].radius - this.pulses[i+1].radius) > 5) this.pulses[i+1].active = true;

          this.pulses[i].shape = new createjs.Shape();
          this.pulses[i].shape.graphics.beginStroke("black").drawCircle(this.pos[0], this.pos[1], this.pulses[i].radius);
          if((this.polarity === constants.PULSE_SPEED && this.pulses[i].radius > constants.PULSE_RANGE) || (this.polarity === -constants.PULSE_SPEED && this.pulses[i].radius < constants.MAGNET_RADIUS)) {
            this.pulses[i].active = false;
            if(i === this.pulses.length-1) {
              this.active = false;
            }
          }
          else {
            stage.addChild(this.pulses[i].shape);
          }

        }
      });
    }
  }
}
