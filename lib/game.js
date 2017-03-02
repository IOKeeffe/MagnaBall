import { P1_MAGNET_POSITIONS, P2_MAGNET_POSITIONS, FIELD_DIM_X, FIELD_DIM_Y, BG_COLOR,
         GOALIES, DEFENDERS, MIDFIELDMEN, STRIKERS, FIELD_POS_OFFSET_X, FIELD_POS_OFFSET_Y} from './constants';
import Magnet from './magnet';
import Puck from './puck';
import Goal from './goal'
import createjs from 'createjs-collection';
export default class Game {

  constructor(stage) {

    this.stage = stage;
    let field = new createjs.Shape();
    field.graphics.beginFill(BG_COLOR).drawRect(FIELD_POS_OFFSET_X, FIELD_POS_OFFSET_Y, FIELD_DIM_X, FIELD_DIM_Y);
    stage.addChild(field);

    this.puck = new Puck(stage);

    this.buildGoals();
    this.buildMagnets();
    window.puck = this.puck;
    window.magnets = this.magnets;
    this.handleKey = this.handleKey.bind(this);
    addEventListener("keypress", (e) => {this.handleKey(e)});
    stage.update();
  }

  buildGoals() {
    this.goals = [];
    this.goals.push(new Goal("p1", this.stage));
    this.goals.push(new Goal("p2", this.stage));
  }

  buildMagnets() {
    this.magnets = [];

    P1_MAGNET_POSITIONS.forEach((pos) => {
      this.magnets.push(new Magnet(pos, "p1", this.stage));
    });

    P2_MAGNET_POSITIONS.forEach((pos) => {
      this.magnets.push(new Magnet(pos, "p2", this.stage));
    });
    this.assignMagnetRoles();

  }

  assignMagnetRoles() {
    this.buttons = {};
    this.buttons["a"] = GOALIES.map((index) => {
      return this.magnets[index];
    });
    this.buttons[";"] = GOALIES.map((index) => {
      return this.magnets[index+13];
    });
    this.buttons["s"] = DEFENDERS.map((index) => {
      return this.magnets[index];
    });
    this.buttons["l"] = DEFENDERS.map((index) => {
      return this.magnets[index+13];
    });
    this.buttons["d"] = MIDFIELDMEN.map((index) => {
      return this.magnets[index];
    });
    this.buttons["k"] = MIDFIELDMEN.map((index) => {
      return this.magnets[index+13];
    });
    this.buttons["f"] = STRIKERS.map((index) => {
      return this.magnets[index];
    });
    this.buttons["j"] = STRIKERS.map((index) => {
      return this.magnets[index+13];
    });
  }

  handleKey(e) {
    if(!this.buttons[e.key]) return;
    this.buttons[e.key].forEach((magnet) => {
      magnet.activate();
    });
  }

  moveObjects(delta) {
    this.puck.move(delta)
  }

  draw(stage) {
    this.puck.draw(stage);
    this.magnets.forEach((magnet) => {
      magnet.draw(stage);
    });
    stage.update();

  }

  step(delta) {
    // CHECK PUCK VS MAGNETS
    this.puck.magnetCheck(this.magnets);
    // MOVE PUCK ON DELTA
    this.puck.magnetCollisionCheck(this.magnets, delta);

    this.moveObjects(delta)
    // CHECK PUCK COLLISION
    this.puck.wallCheck();
    // CHECK PUCK GOAL
  }

}
