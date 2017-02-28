import Game from './game';
import Engine from './engine';
import {DIM_X, DIM_Y} from './constants';

document.addEventListener("DOMContentLoaded", () => {
  const canvasEl = document.getElementById("canvas");
  canvasEl.width = Game.DIM_X;
  canvasEl.height = Game.DIM_Y;

  const ctx = canvasEl.getContext("2d");
  const g = new Game
  new Engine(g, ctx).start();
})
