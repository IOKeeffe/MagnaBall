import createjs from 'createjs-collection';
import { PUCK_COLOR, FIELD_DIM_X, PUCK_RADIUS, PUCK_INITIAL_VELOCITY_FACTOR, MAGNET_RANGE, MAGNET_STRENGTH, MAGNET_RADIUS,
        NORMAL_FRAME_TIME_DELTA, FIELD_DIM_Y, MAX_PUCK_SPEED, FIELD_POS_OFFSET_X, FIELD_POS_OFFSET_Y, C_O_F} from './constants';
import { randomPositiveOrNegativeNumber, randomDir, dist, repulse, attract, consolidateVector } from './utils';

export default class Puck {
  constructor(stage) {
    this.isMagnetized = false;
    this.puck = new createjs.Shape();
    this.draw = this.draw.bind(this);
    this.reset();
    this.collidedWith = null;
    this.draw(stage);
  }

  reset() {
    // let initSpeed = 100000;
    // this.pos = [50,50];
    // let initSpeed = 0;

    // REINSTATE:
    this.pos = [(FIELD_DIM_X / 2) + FIELD_POS_OFFSET_X, 40];
    let initSpeed = (Math.random() + 3) * PUCK_INITIAL_VELOCITY_FACTOR;
    this.vector = {magnitude: initSpeed, direction: randomDir()};
  }

  draw(stage) {
    stage.removeChild(this.puck);
    this.puck = new createjs.Shape();
    this.puck.graphics.beginFill(PUCK_COLOR).drawCircle(this.pos[0], this.pos[1], PUCK_RADIUS);
    stage.addChild(this.puck);
  }

  encounterFriction() {
    if (this.vector.magnitude > MAX_PUCK_SPEED) this.vector.magnitude = MAX_PUCK_SPEED;
    if (this.vector.magnitude > 0) this.vector.magnitude -= (this.vector.magnitude * C_O_F);
  }

  wallCheck() {
    let wallCollision = this.isTouchingWall();
    if(wallCollision[0]) {
      this.vector.direction[0] *= -1;
    }
    if (wallCollision[1]) {
      this.vector.direction[1] *= -1;
    }
  }

  inGoalArea() {
    // if this.pos[1] > GOAL_Y
  }

  isTouchingWall() {
    let touchingWall = [false, false]
    if(this.pos[0] <= FIELD_POS_OFFSET_X + PUCK_RADIUS && !this.inGoalArea()) {
      this.pos[0] = FIELD_POS_OFFSET_X + PUCK_RADIUS;
      touchingWall[0] = true;
    }
    else if( this.pos[0] >= FIELD_DIM_X - FIELD_POS_OFFSET_X && !this.inGoalArea()) {
      this.pos[0] = FIELD_DIM_X - FIELD_POS_OFFSET_X;
      touchingWall[0] = true;
    }
    if(this.pos[1] <= FIELD_POS_OFFSET_Y + PUCK_RADIUS) {
      this.pos[1] = FIELD_POS_OFFSET_Y + PUCK_RADIUS;
      touchingWall[1] = true;
    }
    else if(this.pos[1] >= FIELD_DIM_Y - FIELD_POS_OFFSET_Y * 2) {
      this.pos[1] = FIELD_DIM_Y - FIELD_POS_OFFSET_Y * 2;
      touchingWall[1] = true;

    }
    return touchingWall;
  }

  magnetCollisionCheck(magnets, delta) {
    const combinedRadii = MAGNET_RADIUS + PUCK_RADIUS;
    magnets.forEach((magnet) => {
      if(dist(this.pos, magnet.pos) > combinedRadii && this.collidedWith === magnet) {
        this.collidedWith = null;
        return;
      }
      if(dist(this.pos, magnet.pos) <= combinedRadii && this.collidedWith != magnet) {
        let temp = this.vector.direction[1]

        this.vector.direction[0] = -this.vector.direction[0];
        this.vector.direction[1] = -this.vector.direction[1];
        this.collidedWith=magnet;
      }
    })
  }

  magnetCheck(magnets) {
    magnets.forEach( (magnet) => {
      if ((dist(this.pos, magnet.pos) < MAGNET_RANGE) && magnet.field.active && !this.isMagnetized) {
        this.isMagnetized = true;
        if(magnet.state === "+") {
          repulse(puck, magnet, MAGNET_STRENGTH);
        }
        else {
          attract(puck, magnet, MAGNET_STRENGTH);
        }
      }
    });
    this.isMagnetized = false;
  }

  move(timeDelta) {
    this.encounterFriction();
    const velocityScale = timeDelta / NORMAL_FRAME_TIME_DELTA;
    const offsetX = (this.vector.direction[0] * this.vector.magnitude) * velocityScale;
    const offsetY = (this.vector.direction[1] * this.vector.magnitude) * velocityScale;
    this.pos = [this.pos[0] + offsetX, this.pos[1] + offsetY];
  }
}
