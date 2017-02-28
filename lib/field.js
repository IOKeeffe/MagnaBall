export default class Field {
  constructor() {
    this.width = 1280;
    this.height = 720;
    let canvas = document.getElementById('canvas');
    let context = canvas.getContext("2d");
    context.rect(0, 0, 1280, 720);
    context.fillStyle="#E3E3E7";
    context.fill();
  }
}
