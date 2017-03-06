import constants from './constants';
import Magnet from './magnet';
import Puck from './puck';
import Goal from './goal'
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
    this.titleScreen = titleScreen;
    this.goalHandled=false;

    this.player1Scoreboard = document.getElementById("player-1-score");
    this.player2Scoreboard = document.getElementById("player-2-score");
    this.player1Scoreboard.innerText = '0';
    this.player2Scoreboard.innerText = '0';

    window.puck = this.puck;
    window.magnets = this.magnets;
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
    this.magnets = [];

    constants.P1_MAGNET_POSITIONS.forEach((pos) => {
      this.magnets.push(new Magnet(pos, "p1", this.stage));
    });

    constants.P2_MAGNET_POSITIONS.forEach((pos) => {
      this.magnets.push(new Magnet(pos, "p2", this.stage));
    });
    if(this.numberOfPlayers === 2) {
      this.setupTwoPlayerMagnets();
    }
    else {
      this.setupOnePlayerMagnets();
    }

  }

  setupOnePlayerMagnets() {
    this.buttons = {};
    this.buttons["a"] = constants.GOALIES.map((index) => {
      return this.magnets[index];
    });
    this.buttons["s"] = constants.DEFENDERS.map((index) => {
      return this.magnets[index];
    });
    this.buttons["d"] = constants.MIDFIELDMEN.map((index) => {
      return this.magnets[index];
    });
    this.buttons["f"] = constants.STRIKERS.map((index) => {
      return this.magnets[index];
    });

    this.aiMagnets = this.magnets.slice(constants.AI_MAGNETS_START);

    for (var i = 0; i < this.aiMagnets.length; i++) {
      this.aiMagnets[i].column = this.aiMagnets.filter((magnet, j) => {
        if(magnet.pos[0] === this.aiMagnets[i].pos[0]) {
          return magnet;
        }
      })
    }
  }

  setupTwoPlayerMagnets() {
    this.buttons = {};
    this.buttons["a"] = constants.GOALIES.map((index) => {
      return this.magnets[index];
    });
    this.buttons[";"] = constants.GOALIES.map((index) => {
      return this.magnets[index+13];
    });
    this.buttons["s"] = constants.DEFENDERS.map((index) => {
      return this.magnets[index];
    });
    this.buttons["l"] = constants.DEFENDERS.map((index) => {
      return this.magnets[index+13];
    });
    this.buttons["d"] = constants.MIDFIELDMEN.map((index) => {
      return this.magnets[index];
    });
    this.buttons["k"] = constants.MIDFIELDMEN.map((index) => {
      return this.magnets[index+13];
    });
    this.buttons["f"] = constants.STRIKERS.map((index) => {
      return this.magnets[index];
    });
    this.buttons["j"] = constants.STRIKERS.map((index) => {
      return this.magnets[index+13];
    });
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

  handleGoal(scoringPlayer) {
    let score = '';
    if(scoringPlayer === "p1") {
      score = parseInt(this.player1Scoreboard.innerText) + 1;
      this.player1Scoreboard.innerText = `${score}`;
    }
    else {
      score = parseInt(this.player2Scoreboard.innerText) + 1;
      this.player1Scoreboard.innerText = `${score}`;
    }
    this.running = false;
    this.goalHandled = true;
    if(score === constants.WINNING_SCORE) {
      this.handleWin(scoringPlayer);
    }
  }

}
