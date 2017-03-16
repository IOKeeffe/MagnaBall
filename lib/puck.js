import createjs from 'createjs-collection';
import constants from './constants';
import engine from './engine';
import { randomPositiveOrNegativeNumber, randomDir, dist, repulse, attract, consolidateVector } from './utils';

export default class Puck {
  constructor(stage) {
    this.isMagnetized = false;
    this.puck = new createjs.Shape();
    this.draw = this.draw.bind(this);
    this.reset();
    this.reset = this.reset.bind(this);
    this.deadCheck = this.deadCheck.bind(this);
    this.collidedWith = null;
    this.draw(stage);
  }

  reset() {
    this.deadBall = false;
    clearTimeout(this.resetTimer);
    this.scored = false;
    this.pos = [(constants.FIELD_DIM_X / 2), 40];
    let initSpeed = (Math.random() + 3) * constants.PUCK_INITIAL_VELOCITY_FACTOR;
    this.vector = {magnitude: initSpeed, direction: randomDir()};
  }

  draw(stage) {
    stage.removeChild(this.puck);
    this.puck = new createjs.Shape();
    this.puck.graphics.beginFill(constants.PUCK_COLOR).drawCircle(this.pos[0], this.pos[1], constants.PUCK_RADIUS);
    stage.addChild(this.puck);
  }

  encounterFriction() {
    if (this.vector.magnitude > constants.MAX_PUCK_SPEED) this.vector.magnitude = constants.MAX_PUCK_SPEED;
    if (this.vector.magnitude > 0) this.vector.magnitude -= (this.vector.magnitude * constants.C_O_F);
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

  goalCheck() {
    if (this.pos[0] < constants.GOAL_OFFSET_X ) {
      this.scored = "p2";
    }
    else if (this.pos[0] > constants.GOAL_OFFSET_X + constants.FIELD_DIM_X) {
      this.scored = "p1";
    }
  }

  inGoalArea() {
    if(this.pos[1] > constants.GOAL_PUCK_TOP_BOUNDARY && this.pos[1] < constants.GOAL_PUCK_BOTTOM_BOUNDARY ) {
      return true;
    }
    return false;
  }

  isTouchingWall() {
    let touchingWall = [false, false]
    if(this.pos[0] <= constants.FIELD_POS_OFFSET_X + constants.PUCK_RADIUS && !this.inGoalArea()) {
      this.pos[0] = constants.FIELD_POS_OFFSET_X + constants.PUCK_RADIUS;
      touchingWall[0] = true;
    }
    else if( this.pos[0] >= constants.FIELD_DIM_X - constants.FIELD_POS_OFFSET_X && !this.inGoalArea()) {
      this.pos[0] = constants.FIELD_DIM_X - constants.FIELD_POS_OFFSET_X;
      touchingWall[0] = true;
    }
    if(this.pos[1] <= constants.FIELD_POS_OFFSET_Y + constants.PUCK_RADIUS) {
      this.pos[1] = constants.FIELD_POS_OFFSET_Y + constants.PUCK_RADIUS;
      touchingWall[1] = true;
    }
    else if(this.pos[1] >= constants.FIELD_DIM_Y - constants.FIELD_POS_OFFSET_Y) {
      this.pos[1] = constants.FIELD_DIM_Y - constants.FIELD_POS_OFFSET_Y;
      touchingWall[1] = true;

    }
    return touchingWall;
  }

  magnetCollisionCheck(magnets, delta) {
    const combinedRadii = constants.MAGNET_RADIUS + constants.PUCK_RADIUS;
    magnets.forEach((magnet) => {
      if(dist(this.pos, magnet.pos) > combinedRadii && this.collidedWith === magnet) {
        this.collidedWith = null;
        return;
      }
      if(dist(this.pos, magnet.pos) <= combinedRadii && this.collidedWith != magnet) {
        let xVector = this.pos[0] - magnet.pos[0];
        let yVector = this.pos[1] - magnet.pos[1];

        xVector = xVector / (Math.abs(xVector) + Math.abs(yVector));
        yVector = yVector / (Math.abs(xVector) + Math.abs(yVector));

        this.vector.direction[0] = xVector;
        this.vector.direction[1] = yVector;
        this.collidedWith=magnet;
      }
    })
  }

  deadCheck() {
    if(this.vector.magnitude < .5 && !this.deadBall) {
      this.deadBall = true;
      this.resetTimer = setTimeout(this.reset, 2000);
    }
    else if(this.deadBall && this.vector.magnitude > .5) {
      this.deadBall = false;
      clearTimeout(this.resetTimer);
    }
  }

  magnetCheck(magnets) {
    magnets.forEach( (magnet) => {
      if ((dist(this.pos, magnet.pos) < constants.MAGNET_RANGE) && magnet.field.active && !this.isMagnetized) {
        this.isMagnetized = true;
        if(magnet.state === "+") {
          repulse(this, magnet, constants.MAGNET_STRENGTH);
        }
        else {
          attract(this, magnet, constants.MAGNET_STRENGTH);
        }
      }
    });
    this.isMagnetized = false;
  }

  move(timeDelta) {
    this.deadCheck();
    this.encounterFriction();
    const velocityScale = timeDelta / constants.NORMAL_FRAME_TIME_DELTA;
    const offsetX = (this.vector.direction[0] * this.vector.magnitude) * velocityScale;
    const offsetY = (this.vector.direction[1] * this.vector.magnitude) * velocityScale;
    this.pos = [this.pos[0] + offsetX, this.pos[1] + offsetY];
  }
}
