'use strict';

var PIXI = require('pixi'),
    Camera;

Camera = function Camera() {
    PIXI.Point.call(this);
};

Camera.prototype = Object.create(PIXI.Point, {
    constructor: Camera
});

module.exports = Camera;
