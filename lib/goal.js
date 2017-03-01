import createjs from 'createjs-collection';
import {GOAL_HEIGHT, GOAL_WIDTH, GOAL_OFFSET_X, GOAL_Y, DIM_X} from './constants'

export default class Goal {

  constructor(player, stage) {
    let goalGraphic = new createjs.Shape();
    // goalGraphic.graphics.
    if(player === "p1") {
      goalGraphic.graphics.beginFill("#FFFFFF").drawRect(
        10 - GOAL_OFFSET_X,
        GOAL_Y,
        GOAL_WIDTH,
        GOAL_HEIGHT);
    }
    else {
      goalGraphic.graphics.beginFill("#FFFFFF").drawRect(
        DIM_X + 10 - GOAL_OFFSET_X,
        GOAL_Y,
        GOAL_WIDTH,
        GOAL_HEIGHT);
    }
    stage.addChild(goalGraphic);

  }

}
