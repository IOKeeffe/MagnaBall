
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

    this.allObjects().forEach((object) => {
      object.draw(ctx)
    });
  }

  step(delta) {
    //MOVE PUCK
    // this.moveObjects(delta);
    //CHECK PUCK WALL
    // CHECK PUCK GOAL
  }

}

Game.DIM_X = 1000;
Game.DIM_Y = 600;
