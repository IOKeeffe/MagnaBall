import createjs from 'createjs-collection';
import { PUCK_COLOR, DIM_X, PUCK_RADIUS, PUCK_INITIAL_VELOCITY_FACTOR, NORMAL_FRAME_TIME_DELTA } from './constants';
import { randomPositiveOrNegativeNumber } from './utils';

export default class Puck {
  constructor(stage) {
    this.puck = new createjs.Shape();
    this.pos = [(DIM_X / 2)+10, 40];
    this.draw = this.draw.bind(this);

    this.vel = [randomPositiveOrNegativeNumber() * PUCK_INITIAL_VELOCITY_FACTOR, Math.random() * PUCK_INITIAL_VELOCITY_FACTOR];
    this.draw(stage);
  }

  draw(stage) {
    stage.removeChild(this.puck);
    this.puck = new createjs.Shape();
    this.puck.graphics.beginFill(PUCK_COLOR).drawCircle(this.pos[0], this.pos[1], PUCK_RADIUS);
    stage.addChild(this.puck);
  }

  move(timeDelta) {
    const velocityScale = timeDelta / NORMAL_FRAME_TIME_DELTA;
    const offsetX = this.vel[0] * velocityScale;
    const offsetY = this.vel[1] * velocityScale;
    this.pos = [this.pos[0] + offsetX, this.pos[1] + offsetY];
  }

}
