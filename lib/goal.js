import createjs from 'createjs-collection';
import constants from './constants'

export default class Goal {

  constructor(player, stage) {
    this.goalGraphic = new createjs.Shape();
    // goalGraphic.graphics.
    if(player === "p1") {
      this.goalGraphic.graphics.beginFill(constants.GOAL_COLOR_1).drawRect(
        10 - constants.GOAL_OFFSET_X,
        constants.GOAL_Y,
        constants.GOAL_WIDTH,
        constants.GOAL_HEIGHT);
    }
    else {
      this.goalGraphic.graphics.beginFill(constants.GOAL_COLOR_2).drawRect(
        constants.FIELD_DIM_X + 10 - constants.GOAL_OFFSET_X,
        constants.GOAL_Y,
        constants.GOAL_WIDTH,
        constants.GOAL_HEIGHT);
    }
    stage.addChild(this.goalGraphic);
  }

  draw(stage) {
    stage.removeChild(this.goalGraphic);
    stage.addChild(this.goalGraphic);
  }

}
