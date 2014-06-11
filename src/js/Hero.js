'use strict';

var PIXI = require('pixi.js'),
    Vector = require('./physics/Vector.js'),
    Weapon = require('./Weapon.js'),
    assets = require('./assets.js'),
    Hero;

Hero = function Hero() {
    var textures = [
        PIXI.Texture.fromImage(assets.hash['hero.png']),
        PIXI.Texture.fromImage(assets.hash['hero_attack.png'])
    ];

    PIXI.MovieClip.call(this, textures);

    this.forceStep = 5;
    this.weapon = new Weapon();
    this.force = new Vector();
    this.acceleration = new Vector();
    this.blurFilter = new PIXI.BlurFilter();
    this.filters = [this.blurFilter];
};

Hero.prototype = Object.create(PIXI.MovieClip.prototype, {
    constructor: Hero
});

Hero.prototype.move  = function (game) {
    var dt = game.dt,
        speed = game.speed;

    this.blurFilter.blurX = this.acceleration.x * speed;
    this.blurFilter.blurY = this.acceleration.y * 30 * speed;

    if (!this.ownSpeedLimitReached && game.IS_MOVING_LEFT) {
        this.force.x = -this.forceStep;
    }

    if (!this.ownSpeedLimitReached && game.IS_MOVING_RIGHT) {
        this.force.x = this.forceStep;
    }

    this.acceleration.x += this.force.x;
    this.acceleration.y += this.force.y;

    this.position.x += this.acceleration.x;

    var offset = this.width * this.anchor.x;

    if (this.position.x - offset < 0) {
        this.position.x = offset;
    } else if (this.position.x > game.ground.width - offset) {
        this.position.x = game.ground.width - offset;
    }

    if (game.IN_THE_AIR) {
        this.position.y += this.acceleration.y;
    }

};

Hero.prototype.jump = function () {
    this.force.y = -this.forceStep;
};

Hero.prototype.attack = function () {
    this.gotoAndStop(1);
};

Hero.prototype.update = function (game) {
    var dt = game.dt;

    if (game.IS_ATTACKING === false) {
        this.gotoAndStop(0);
    }

    this.ownSpeedLimitReached = Math.abs(game.hero.acceleration.x) >= 5;
    this.acceleration.x *= game.physics.friction * game.speed;

    if (this.position.y - (this.height >> 1) >= game.ground.hitArea.y) {
        this.acceleration.y = 0;
        this.position.y = game.ground.hitArea.y + (this.height >> 1);

        if (game.UP_KEY) {
            this.jump(speed);
        }
    }

    this.move(game);

    game.camera.notify();
    this.clearForce();
};

Hero.prototype.clearForce = function (speed) {
    this.force.x = this.force.y = 0;
};

module.exports = Hero;
