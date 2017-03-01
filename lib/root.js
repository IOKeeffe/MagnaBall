import Game from './game';
import Engine from './engine';
import {DIM_X, DIM_Y} from './constants';
import createjs from 'createjs-collection';

document.addEventListener("DOMContentLoaded", () => {
  const canvasEl = document.getElementById("canvas");
  const stage = new createjs.Stage(canvasEl);

  const g = new Game(stage)
  new Engine(g, stage).start();
});
