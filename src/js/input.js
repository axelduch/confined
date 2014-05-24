'use strict';

var KeyboardJS = require('keyboardjs');

module.exports = function (game) {
    game.stage.mousedown = function () {
        game.IS_ATTACKING = true;
        game.hero.attack();
    };
    game.stage.mouseup = function () {
        game.IS_ATTACKING = false;
    };
    KeyboardJS.on('d', function () {
        game.IS_MOVING_RIGHT = true;
        game.IS_MOVING_LEFT = false;
    }, function () {
        game.IS_MOVING_RIGHT = false;
    });
    KeyboardJS.on('q', function () {
        game.IS_MOVING_LEFT = true;
        game.IS_MOVING_RIGHT = false;
    }, function () {
        game.IS_MOVING_LEFT = false;
    });
    KeyboardJS.on('space', function () {
        game.UP_KEY = true;
    }, function () {
        game.UP_KEY = false;
    });
};
