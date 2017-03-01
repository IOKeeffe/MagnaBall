import createjs from 'createjs';
import { PUCK_COLOR } from './constants';
export default class Puck() {

  this.setDefaultState(pos, player);
  let shape = new createjs.Shape();

  stage.addChild(shape);

  this.draw(stage)

  draw() {
    shape.graphics.beginFill(PUCK_COLOR).drawCircle(this.pos[0], this.pos[1], this.radius);
  }
}
