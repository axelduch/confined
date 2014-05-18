'use strict';

var KeyboardJS = require('keyboardjs');

module.exports = function (game) {
    var speed = 15;

    game.stage.mousedown = function () {
        game.hero.attack();
    };
    game.stage.mouseup = function () {
        game.hero.gotoAndStop(0);
    };
    KeyboardJS.on('d', function () {
        game.hero.walkRight();
    });
    KeyboardJS.on('q', function () {
        game.hero.walkLeft();
    });
    KeyboardJS.on('z', function () {
        game.hero.walkUp();
    });
    KeyboardJS.on('s', function () {
        game.hero.walkDown();
    });
};
