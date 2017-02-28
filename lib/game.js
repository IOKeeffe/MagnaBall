import { P1_MAGNET_POSITIONS, P2_MAGNET_POSITIONS, DIM_X, DIM_Y, BG_COLOR } from './constants';

import Magnet from './magnet';
export default class Game {


  constructor() {
    this.magnets = [];
    this.puck = [];
    this.goals = [];

  }

  draw(ctx) {
    ctx.clearRect(0, 0, Game.DIM_X, Game.DIM_Y);
    ctx.fillStyle = Game.BG_COLOR;
    ctx.fillRect(0, 0, Game.DIM_X, Game.DIM_Y);
    P1_MAGNET_POSITIONS.forEach((pos) => {
      this.magnets.push(new Magnet(pos, "p1"));
    });
    P2_MAGNET_POSITIONS.forEach((pos) => {
      this.magnets.push(new Magnet(pos, "p2"));
    });

    this.magnets.forEach((magnet) => {
      magnet.draw(ctx)
    })

    // this.allObjects().forEach((object) => {
    //   object.draw(ctx)
    // });
  }

  step(delta) {
    //MOVE PUCK ON DELTA
    //MOVE MAGNETIC FIELD
    // this.moveObjects(delta);
    //CHECK PUCK WALL
    // CHECK PUCK GOAL
  }

}
