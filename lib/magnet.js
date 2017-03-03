import constants from './constants'
import createjs from 'createjs-collection';
import MagneticField from './magnetic_field';
import {dist} from './utils';

export default class Magnet {

  constructor(pos, player, stage) {
    this.setDefaultState(pos, player);
    this.text = new createjs.Text(this.state, "35px Arial", "#FFFFFF");
    this.text.x = this.pos[0]-10.5;
    this.text.y = this.pos[1]+13;

    this.shape = new createjs.Shape();
    this.shape.graphics.beginFill(this.color).drawCircle(this.pos[0], this.pos[1], this.radius);
    this.alternateState = this.alternateState.bind(this);
    this.recharge = this.recharge.bind(this);
    this.activate = this.activate.bind(this);
    this.field = new MagneticField(this.pos)

    this.draw(stage)
  }

  setDefaultState(pos, player) {
    this.pos = pos;
    this.radius = constants.MAGNET_RADIUS;
    this.strength = constants.MAGNET_STRENGTH;
    this.range = constants.MAGNET_RANGE
    this.color = player === "p1" ? constants.P1_COLOR : constants.P2_COLOR;
    this.state = "+";
    this.statusColor = "#FFFFFF"
    this.charged = true;
  }

  draw(stage) {
    stage.removeChild(this.text);
    stage.removeChild(this.shape);

    this.field.draw(stage);

    if(!this.charged) {
      this.shape = new createjs.Shape();
      this.shape.graphics.beginFill("#cccccc").drawCircle(this.pos[0], this.pos[1], this.radius);
    }
    else {
      this.shape = new createjs.Shape();
      this.shape.graphics.beginFill(this.color).drawCircle(this.pos[0], this.pos[1], this.radius);

    }

    this.text = new createjs.Text(this.state, "35px Arial", "#FFFFFF");
    if(this.state === "+"){
      this.text.x = this.pos[0]-10.5;
      this.text.y = this.pos[1]-19;
    }
    else {
      this.text.x = this.pos[0]-6;
      this.text.y = this.pos[1]-23;
    }
    stage.addChild(this.shape);
    stage.addChild(this.text);
  }

  recharge() {
    this.charged = true;
    this.activating = false;
    this.alternateState();
  }

  activate() {
    if(!this.charged) return;
    setTimeout(this.recharge, constants.MAGNET_RECHARGE_TIME)
    this.charged = false;
    this.field.activate(this.state);
    // rest of logic!
  }

  puckCheck(puck) {
    return (dist(this.pos, puck.pos) < constants.MAGNET_RANGE && this.charged);
  }

  alternateState() {
    if(this.state === "+") {
      this.state = "-";
    }
    else {
      this.state = "+";
    }
  }
}
