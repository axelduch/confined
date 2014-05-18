'use strict';

var PIXI = require('pixi'),
    assets = require('./assets'),
    Camera = require('./Camera'),
    Hero = require('./Hero'),
    input = require('./input'),
    stage,
    renderer,
    hero,
    texture,
    width = 500,
    height = 500,
    animate,
    loader = new PIXI.AssetLoader(assets.array),
    requestAnimationFrame = window.requestAnimationFrame,
    game;

loader.onComplete = onAssetsLoaded;
loader.load();

function onAssetsLoaded() {
    var camera,
        hero;
    console.log('loaded');
    stage = new PIXI.Stage(0xAAFF);
    renderer = PIXI.autoDetectRenderer(width, height);

    document.body.appendChild(renderer.view);

    requestAnimationFrame(animate);

    hero = new Hero();
    hero.width = 100;
    hero.height = 100;

    hero.anchor.x = 0.5;
    hero.anchor.y = 0.5;

    hero.position.x = width >> 1;
    hero.position.y = height >> 1;

    camera = new Camera();
    stage.addChild(hero);

    game = {
        hero: hero,
        stage: stage
    };

    input(game);
}

function animate() {
    requestAnimationFrame(animate);
    renderer.render(stage);
};