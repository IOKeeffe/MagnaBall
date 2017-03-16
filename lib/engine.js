
export default class Engine {
  constructor() {
  }

  start(game, stage) {
    this.stage = stage;
    this.game = game;
    this.playing = true;
    this.lastTime = 0;
    requestAnimationFrame(this.animate.bind(this));
  }

  animate(time) {
    const timeDelta = time - this.lastTime;
    this.lastTime = time;
    if(this.game.running){
      this.game.step(timeDelta);
      this.game.draw(this.stage);
    }

    requestAnimationFrame(this.animate.bind(this));
  }

}
