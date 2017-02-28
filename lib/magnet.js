import {MAGNET_RADIUS, MAGNET_STRENGTH, MAGNET_RANGE} from './constants'

export default class Magnet {
  constructor(pos, player) {
    this.pos = pos;

    this.radius = MAGNET_RADIUS;
    this.strength = MAGNET_STRENGTH;
    this.range = MAGNET_RANGE
    this.color = player === "p1" ? "#5A0202" : "#0D254B";
    // this.game = options.game;
    // drawMagnet()
  }

  draw(ctx) {
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.pos[0],this.pos[1],this.radius,0,2*Math.PI);
    ctx.stroke();
  }
}
