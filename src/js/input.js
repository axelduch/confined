'use strict';

var KeyboardJS = require('keyboardjs');

module.exports = function (game) {
    var speed = 5;

    game.stage.mousedown = function () {
        game.hero.attack();
    };
    game.stage.mouseup = function () {
        game.hero.gotoAndStop(0);
    };
    KeyboardJS.on('d', function () {
        game.hero.acceleration.x = speed;
    });
    KeyboardJS.on('q', function () {
        game.hero.acceleration.x = -speed;
    });
};
