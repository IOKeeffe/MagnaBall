import createjs from 'createjs-collection';
import Game from './game';
import Engine from './engine';
export default class TitleScreen {
  constructor() {
    this.canvasDiv = document.getElementById("canvas-bergman");
    this.titleScreenHTML = this.canvasDiv.innerHTML;
    this.setup();

    // this.stage = stage;
  }

  startGame(numberOfPlayers) {
    return (e) => {
      e.preventDefault();
      this.canvasEl.innerHTML = '<canvas id="canvas" width="1300" height="720" ></canvas>';
      const canvasEl = document.getElementById("canvas");
      const stage = new createjs.Stage(canvasEl);
      const game = new Game(stage, numberOfPlayers, titleScreen);
      new Engine(game, stage).start();
      this.runCountDown(3, game);
    }
  }

  runCountDown(secondsLeft, game) {
    if(secondsLeft === 0) {
      let messageField = document.getElementsByClassName('message-field')[0];
      messageField.innerHTML = ``
        game.startGame();
    }
    else {
      let messageField = document.getElementsByClassName('message-field')[0];
      messageField.innerHTML = `<p>${secondsLeft}</p>`
      setTimeout(() => {this.runCountDown(secondsLeft - 1, game);}, 1000);
    }
  }

  setIntroMessage() {
    if(winner === "p1") {
      document.getElementById("intro-message").innerText = `Player 1 wins! Play again?`;
    }
    else if(winner === "p2") {
      document.getElementById("intro-message").innerText = `Player 1 wins! Play again?`;
    }
    else {
      document.getElementById("intro-message").innerText = `Welcome to MagnaBall`
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
