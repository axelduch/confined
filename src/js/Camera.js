'use strict';

var PIXI = require('pixi.js'),
    Camera;

Camera = function Camera(game) {
    PIXI.Point.call(this);

    var scale = 1,
        scene = game.scene,
        width = game.width,
        height = game.height;

    this.focus = 3;
    this.game = game;
    this.x = width * 0.5;
    this.y = height * 0.5;

    scene.width = width;
    scene.height = height;

    Object.defineProperty(this, 'scale', {
        get: function () {
            return scale;
        },
        set: function (value) {
            scale = value;
            scene.scale.x = scale;
            scene.scale.y = scale;
            scene.position.x = this.x - game.hero.position.x * scene.scale.x;
            scene.position.y = this.y - game.hero.position.y * scene.scale.y;
        }
    });
    this.scene = scene;
};

Camera.prototype = Object.create(PIXI.Point.prototype, {
    constructor: Camera
});

Camera.prototype.notify = function notify() {
    notify.cache = notify.cache || {
        zoomIteration: 0,
        scrollIteration: 0
    };
    var c = notify.cache,
        distScroll = 10000 - c.scrollIteration,
        distZoom = 10000 - c.zoomIteration;
    this.x = Math.cos((c.scrollIteration += (distScroll * 0.000009)) * 0.05) * this.game.hero.position.x * 0.2 + this.game.width * 0.5;
    this.scale = 0.2 * Math.abs(Math.sin((c.zoomIteration = (c.zoomIteration + distZoom * 0.000002)) * 0.5)) + this.focus;
};

module.exports = Camera;
