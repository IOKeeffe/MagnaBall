const Util = {
  inherits (child, parent) {
    function Surrogate() {}

    Surrogate.prototype = parent.prototype;
    child.prototype = new Surrogate();
    child.prototype.constructor = child;
  },

  context() {
    const cnv = document.getElementById("canvas");
    return cnv.getContext("2d");
  }
};

module.exports = Util;
