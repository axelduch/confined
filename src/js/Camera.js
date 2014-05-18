'use strict';

var PIXI = require('pixi'),
    Camera;

Camera = function Camera() {
    PIXI.DisplayObjectContainer.call(this);
};

Camera.prototype = Object.create(PIXI.DisplayObjectContainer, {
    constructor: Camera
});

module.exports = Camera;