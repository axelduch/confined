'use strict';

var PIXI = require('pixi'),
    assets = require('./assets.js'),
    Hero;

Hero = function Hero() {
    var textures = [
        PIXI.Texture.fromImage(assets.hash['hero.png']),
        PIXI.Texture.fromImage(assets.hash['hero_attack.png'])
    ];
    PIXI.MovieClip.call(this, textures);
    this.speed = 10;
};

Hero.prototype = Object.create(PIXI.MovieClip.prototype, {
    constructor: Hero
});

Hero.prototype.walkRight = function () {
    this.position.x += this.speed;
};

Hero.prototype.walkLeft = function () {
    this.position.x -= this.speed;
};

Hero.prototype.walkUp = function () {
    this.position.y -= this.speed;
};

Hero.prototype.walkDown = function () {
    this.position.y += this.speed;
};

Hero.prototype.attack = function () {
    this.gotoAndStop(1);
};


module.exports = Hero;
