'use strict';

var PIXI = require('pixi'),
    Vector = require('./physics/Vector.js'),
    assets = require('./assets.js'),
    Hero;

Hero = function Hero() {
    var textures = [
        PIXI.Texture.fromImage(assets.hash['hero.png']),
        PIXI.Texture.fromImage(assets.hash['hero_attack.png'])
    ];

    PIXI.MovieClip.call(this, textures);

    this.acceleration = new Vector();
};

Hero.prototype = Object.create(PIXI.MovieClip.prototype, {
    constructor: Hero
});

Hero.prototype.move  = function (game) {
    this.position.x += this.acceleration.x;

    if (game.IS_JUMPING) {
        this.position.y += this.acceleration.y;
    }
};

Hero.prototype.attack = function () {
    this.gotoAndStop(1);
};

Hero.prototype.update = function (game) {
    this.move(game);
    this.acceleration.x = 0;
};

module.exports = Hero;
