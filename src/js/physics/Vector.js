'use strict';

var Vector;

Vector = function Vector(x, y) {
    this.x = +x || 0;
    this.y = +y || 0;
};

Vector.prototype.add = function add(vector) {
    this.x += vector.x;
    this.y += vector.y;
};

module.exports = Vector;
