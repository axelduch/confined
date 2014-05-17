'use strict';

var PIXI = require('pixi'),
    assets = require('./assets.js'),
    Hero = require('./hero.js'),
    stage,
    renderer,
    hero,
    texture,
    width = 800,
    height = 600,
    animate,
    loader = new PIXI.AssetLoader(assets.array),
    requestAnimationFrame = window.requestAnimationFrame;

loader.onComplete = onAssetsLoaded;
loader.load();

function onAssetsLoaded() {
    console.log('loaded');
    stage = new PIXI.Stage(0xAAFF);
    renderer = PIXI.autoDetectRenderer(width, height);

    document.body.appendChild(renderer.view);

    requestAnimationFrame(animate);

    var hero = new Hero();
    hero.width = 100;
    hero.height = 100;

    hero.anchor.x = 0.5;
    hero.anchor.y = 0.5;


    hero.position.x = width >> 1;
    hero.position.y = height >> 1;

    stage.addChild(hero);
}

function animate() {
    requestAnimationFrame(animate);
    renderer.render(stage);
};
