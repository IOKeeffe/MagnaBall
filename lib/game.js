import constants from './constants';
import Magnet from './magnet';
import Puck from './puck';
import Goal from './goal';
import { generateMagnetPositions } from './utils';
import createjs from 'createjs-collection';
export default class Game {

  constructor(stage, numberOfPlayers, titleScreen) {

    this.stage = stage;
    let field = new createjs.Shape();
    field.graphics.beginFill(constants.BG_COLOR).drawRect(constants.FIELD_POS_OFFSET_X, constants.FIELD_POS_OFFSET_Y, constants.FIELD_DIM_X, constants.FIELD_DIM_Y);
    stage.addChild(field);
    this.running = false;
    this.puck = new Puck(stage);
    this.buildGoals();
    this.numberOfPlayers = numberOfPlayers;
    this.buildMagnets();
    this.messageField = document.getElementById('message-field');
    this.titleScreen = titleScreen;
    this.goalHandled=false;

    this.player1Scoreboard = document.getElementById("player-1-score");
    this.player2Scoreboard = document.getElementById("player-2-score");
    this.player1Scoreboard.innerText = '0';
    this.player2Scoreboard.innerText = '0';

    window.puck = this.puck;
    window.magnets = this.magnets;
    window.constants = this.constants;
    this.handleKey = this.handleKey.bind(this);
    stage.update();
  }

  startGame() {
    addEventListener("keypress", (e) => {this.handleKey(e)});
    this.running = true;
  }

  buildGoals() {
    this.goals = [];
    this.goals.push(new Goal("p1", this.stage));
    this.goals.push(new Goal("p2", this.stage));
  }

  buildMagnets() {
    generateMagnetPositions();
    this.magnets = [];
    this.buttons = {};
    if(this.numberOfPlayers === 1) {
      this.aiMagnets = [];
    }
    for (var i = 0; i < 8; i++) {
      this.buttons[constants.KEYS[i]] = [];
      let player;
      if((i !== 1 && i < 4) || i === 6) {player = "p1";}
      else {player = "p2"}
      for (var j = 0; j < constants.COLUMNS[i].length; j++) {
        let newMagnet = new Magnet(constants.COLUMNS[i][j], player, this.stage);
        this.magnets.push(newMagnet);
        if(player === "p1" || this.numberOfPlayers === 2) {
          console.log(constants.KEYS[i]);

          this.buttons[constants.KEYS[i]].push(newMagnet);
        }
        else {
          this.aiMagnets.push(newMagnet)
        }
      }
    }
    if(this.numberOfPlayers === 1) {this.setUpAiColumns()}
  }

  setUpAiColumns() {
    for (var i = 0; i < this.aiMagnets.length; i++) {
      this.aiMagnets[i].column = this.aiMagnets.filter((magnet, j) => {
        if(magnet.pos[0] === this.aiMagnets[i].pos[0]) {
          return magnet;
        }
      })
    }
  }


  handleKey(e) {
    if(!this.running) {
      this.startNewRound();
      this.goalHandled=false;
      return;
    }
    if(!this.buttons[e.key]) return;
    this.buttons[e.key].forEach((magnet) => {
      magnet.activate();
    });
  }

  startNewRound() {
    this.running = true;
    this.puck.reset();
    this.magnets.forEach((magnet) => {
      magnet.state = "+";
    })
  }

  moveObjects(delta) {
    this.puck.move(delta)
  }

  draw(stage) {
    this.puck.draw(stage);
    this.magnets.forEach((magnet) => {
      magnet.draw(stage);
    });
    this.goals.forEach((goal) => {
      goal.draw(stage);
    });
    stage.update();

  }

  step(delta) {
    // CHECK PUCK VS MAGNETS
    this.puck.magnetCheck(this.magnets);
    if(constants.MAGNET_COLLISION_ENABLED) {
      this.puck.magnetCollisionCheck(this.magnets, delta);
    }
    //AI
    if(this.numberOfPlayers === 1) {
      this.aiMagnets.forEach((magnet) => {
        if(magnet.puckCheck(this.puck) && !magnet.activating) {
          let time = constants.AI_OFFSET * Math.random()
          magnet.column.forEach((magmate) => {
            setTimeout(magmate.activate, time);
            magmate.activating = true;
          })
        };
      })
    }
    // MOVE PUCK ON DELTA
    this.moveObjects(delta)

    // CHECK PUCK VS WALL
    this.puck.wallCheck();

    // CHECK PUCK VS GOAL
    this.puck.goalCheck();
    if (this.puck.scored && !this.goalHandled) {
      this.handleGoal(this.puck.scored);
    }
  }

  handleWin(winningPlayer) {
    this.titleScreen.setup(winningPlayer);
  }

  setScoringMessage(scoringPlayer) {
    let player;
    if(scoringPlayer = "p1") {
      player = "Red"
    }
    else {
      player = "Blue"
    }
    this.messageField.innerText = `${player} scored!`
    this.resetMessageField();
  }

  resetMessageField() {
    setTimeout(() => {
      this.messageField.innerText = '';
    }, 3000);
  }

  handleGoal(scoringPlayer) {
    let score;
    this.setScoringMessage(scoringPlayer);
    if(scoringPlayer === "p1") {
      score = parseInt(this.player1Scoreboard.innerText) + 1;
      this.player1Scoreboard.innerText = `${score}`;
    }
    else {
      score = parseInt(this.player2Scoreboard.innerText) + 1;
      this.player2Scoreboard.innerText = `${score}`;
    }
    this.running = false;
    this.goalHandled = true;
    if(score === constants.WINNING_SCORE) {
      this.handleWin(scoringPlayer);
    }
  }

}
