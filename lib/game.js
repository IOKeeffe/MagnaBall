import { P1_MAGNET_POSITIONS, P2_MAGNET_POSITIONS, DIM_X, DIM_Y, BG_COLOR,
         GOALIES, DEFENDERS, MIDFIELDMEN, STRIKERS} from './constants';
import Magnet from './magnet';
import Puck from './puck';
import Goal from './goal'
import createjs from 'createjs-collection';
export default class Game {

  constructor(stage) {

    this.stage = stage;
    let field = new createjs.Shape();
    field.graphics.beginFill(BG_COLOR).drawRect(10, 10, DIM_X, DIM_Y);
    stage.addChild(field);

    this.puck = new Puck(stage);

    this.buildGoals();
    this.buildMagnets();
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

    // this.allObjects().forEach((object) => {
    //   object.draw(ctx)
    // });
  }

  step(delta) {
    this.moveObjects(delta)
    // MOVE PUCK ON DELTA
    // MOVE MAGNETIC FIELD
    // this.moveObjects(delta);
    // CHECK PUCK WALL
    // CHECK PUCK GOAL
  }

}
