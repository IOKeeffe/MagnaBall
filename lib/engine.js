export default class Engine {
  constructor(game, ctx) {
    this.ctx = ctx;
    this.game = game;
    this.puck = this.puck.addPuck();
  }

  start() {
    this.lastTime = 0;
    requestAnimationFrame(this.animateFrame.bind(this));
  }

  animateFrame(time) {
    const timeDelta = time - this.lastTime;

    this.game.step(timeDelta);
    this.game.draw(this.ctx);
    this.lastTime = time;
    requestAnimationFrame(this.animateFrame.bind(this));
  }

}
