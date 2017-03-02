import {MAGNET_RADIUS, MAGNET_STRENGTH, MAGNET_RANGE, MAGNET_RECHARGE_TIME} from './constants'
import createjs from 'createjs-collection';
import MagneticField from './magnetic_field';

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

    this.field = new MagneticField(this.pos)

    this.draw(stage)
  }

  setDefaultState(pos, player) {
    this.pos = pos;
    this.radius = MAGNET_RADIUS;
    this.strength = MAGNET_STRENGTH;
    this.range = MAGNET_RANGE
    this.color = player === "p1" ? "#5A0202" : "#0D254B";
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
    this.alternateState();
  }

  activate() {
    if(!this.charged) return;
    setTimeout(this.recharge, MAGNET_RECHARGE_TIME)
    this.charged = false;
    this.field.activate(this.state);
    // rest of logic!
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
