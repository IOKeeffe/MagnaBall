import createjs from 'createjs-collection';
import constants from './constants';
import Game from './game';
import Engine from './engine';
export default class TitleScreen {
  constructor() {
    this.canvasEl = document.getElementById("canvas-container");
    this.titleScreenHTML = this.canvasEl.innerHTML;
    this.setup();

    // this.stage = stage;
  }

  startGame(numberOfPlayers) {
    return (e) => {
      e.preventDefault();
      this.canvasEl.innerHTML = `<canvas id="canvas" width="${constants.FIELD_DIM_X + 20}" height="${constants.FIELD_DIM_Y + 20}" ></canvas>`;
      const canvasEl = document.getElementById("canvas");
      const stage = new createjs.Stage(canvasEl);
      const game = new Game(stage, numberOfPlayers, this);
      new Engine(game, stage).start();
      this.runCountDown(3, game);
    }
  }

  runCountDown(secondsLeft, game) {
    if(secondsLeft === 0) {
      let messageField = document.getElementById('message-field');
      messageField.innerHTML = ``
        game.startGame();
    }
    else {
      let messageField = document.getElementById('message-field');
      messageField.innerHTML = `<p>${secondsLeft}</p>`
      setTimeout(() => {this.runCountDown(secondsLeft - 1, game);}, 1000);
    }
  }

  setIntroMessage(winner = null) {
    if(winner === "p1") {
      document.getElementById("message-field").innerText = `Player 1 wins! Play again?`;
    }
    else if(winner === "p2") {
      document.getElementById("message-field").innerText = `Player 2 wins! Play again?`;
    }
    else {
      document.getElementById("message-field").innerText = `Welcome to MagnaBall`
    }
  }

  setup(winner = null) {
    this.canvasEl.innerHTML = this.titleScreenHTML;
    this.onePlayerButton = document.getElementById("one-player-button")
    this.twoPlayerButton = document.getElementById("two-player-button")
    this.onePlayerButton.addEventListener("click", this.startGame(1));
    this.twoPlayerButton.addEventListener("click", this.startGame(2));
    this.runCountDown = this.runCountDown.bind(this);
    if(winner) {
      this.setIntroMessage(winner);
    }
  }
}
