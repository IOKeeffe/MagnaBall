import {MAGNET_RADIUS, MAGNET_STRENGTH, MAGNET_RANGE} from './constants'
import createjs from 'createjs-collection';
export default class Magnet {

  constructor(pos, player, stage) {
    this.setDefaultState(pos, player);
    this.text = new createjs.Text(this.state, "35px Arial", "#FFFFFF");
    this.text.x = this.pos[0]-10.5;
    this.text.y = this.pos[1]+13;

    let shape = new createjs.Shape();
    shape.graphics.beginFill(this.color).drawCircle(this.pos[0], this.pos[1], this.radius);
    stage.addChild(shape);
    this.alternateState = this.alternateState(stage).bind(this);
    shape.addEventListener("click", this.alternateState);

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
  }

  draw(stage) {
    stage.removeChild(this.text);

    this.text = new createjs.Text(this.state, "35px Arial", "#FFFFFF");
    if(this.state === "+"){
      this.text.x = this.pos[0]-10.5;
      this.text.y = this.pos[1]-19;
    }
    else {
      this.text.x = this.pos[0]-6;
      this.text.y = this.pos[1]-23;
    }
    stage.addChild(this.text);
  }

  activate() {
    this.alternateState();
    // rest of logic!
  }

  alternateState() {
    return () => {
      if(this.state === "+") {
        this.state = "-";
      }
      else {
        this.state = "+";
      }
    }
  }
}
