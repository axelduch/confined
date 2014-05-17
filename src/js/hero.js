'use strict';

var PIXI = require('pixi'),
    assets = require('./assets.js'),
    Hero;

Hero = function Hero() {
    var textures = [
        PIXI.Texture.fromImage(assets.hash['hero.png'])
    ];
    PIXI.MovieClip.call(this, textures);
};

Hero.prototype = Object.create(PIXI.MovieClip.prototype, {
    constructor: Hero
});

module.exports = Hero;
