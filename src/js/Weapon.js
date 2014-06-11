'use strict';

var PIXI = require('pixi.js'),
    assets = require('./assets.js'),
    Weapon;

Weapon = function () {
    var textures = [
        PIXI.Texture.fromImage(assets.hash['weapon.png'])
    ];

    PIXI.MovieClip.call(this,  textures);
};

Weapon.prototype = Object.create(PIXI.MovieClip.prototype, {
    constructor: Weapon
});

module.exports = Weapon;
