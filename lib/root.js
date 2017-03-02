import Game from './game';
import Engine from './engine';
import {FIELD_DIM_X, FIELD_DIM_Y} from './constants';
import createjs from 'createjs-collection';

document.addEventListener("DOMContentLoaded", () => {
  const canvasEl = document.getElementById("canvas");
  const stage = new createjs.Stage(canvasEl);

  const g = new Game(stage)
  new Engine(g, stage).start();
});
