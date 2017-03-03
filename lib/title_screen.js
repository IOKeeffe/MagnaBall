import createjs from 'createjs-collection';
import Game from './game';
import Engine from './engine';
export default class TitleScreen {
  constructor() {
    this.onePlayerButton = document.getElementById("one-player-button")
    this.twoPlayerButton = document.getElementById("two-player-button")
    this.onePlayerButton.addEventListener("click", this.startGame(1));
    this.twoPlayerButton.addEventListener("click", this.startGame(2));
    // this.stage = stage;
    this.startCountDown = this.startCountDown.bind(this);
  }

  startOnePlayerGame(e) {
    e.preventDefault();
    createGame()
  }

  startTwoPlayerGame(e) {
    e.preventDefault();
  }

  startGame(numberOfPlayers) {
    return (e) => {
      e.preventDefault();
      document.getElementById("canvas-bergman").innerHTML = '<canvas id="canvas" width="1300" height="720" ></canvas>'
      const canvasEl = document.getElementById("canvas");
      const stage = new createjs.Stage(canvasEl);
      const game = new Game(stage, numberOfPlayers);
      new Engine(game, stage).start();
      this.startCountDown(3, game);
    }
  }
  startCountDown(secondsLeft, game) {
    if(secondsLeft === 0) {
      let messageField = document.getElementsByClassName('message-field')[0];
      messageField.innerHTML = ``
        game.startGame();
    }
    else {
      let messageField = document.getElementsByClassName('message-field')[0];
      messageField.innerHTML = `<p>${secondsLeft}</p>`
      setTimeout(() => {this.startCountDown(secondsLeft - 1, game);}, 1000);
    }
  }

  setup() {

  }
}
