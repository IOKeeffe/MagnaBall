
export default class Engine {
  constructor(game, stage) {
    this.stage = stage;
    this.game = game;
    // this.puck = this.puck.addPuck();
  }

  start() {
    this.lastTime = 0;
    requestAnimationFrame(this.animate.bind(this));
  }

  animate(time) {
    const timeDelta = time - this.lastTime;

    this.game.step(timeDelta);
    this.game.draw(this.stage);
    this.lastTime = time;
    requestAnimationFrame(this.animate.bind(this));
  }

}
