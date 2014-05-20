'use strict';

var PIXI = require('pixi'),
    assets = require('./assets'),
    Ground;

Ground = function Ground() {
    var textures = [
        PIXI.Texture.fromImage(assets.hash['ground.png'])
    ];

    PIXI.MovieClip.call(this, textures);
    this.hitArea = new PIXI.Rectangle(0, this.height * 0.75, this.width, this.height * 0.5);
};

Ground.prototype = Object.create(PIXI.MovieClip.prototype, {
    constructor: Ground
});

Ground.prototype.update = function () {
};

module.exports = Ground;
