'use strict';

var PIXI = require('pixi'),
    assets = require('./assets'),
    Camera = require('./Camera'),
    Hero = require('./Hero'),
    Ground = require('./Ground'),
    Vector = require('./physics/Vector'),
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
        hero,
        ground,
        gravity;

    console.log('loaded');
    stage = new PIXI.Stage(0xAAFF);
    renderer = PIXI.autoDetectRenderer(width, height);

    document.body.appendChild(renderer.view);

    requestAnimationFrame(animate);

    hero = new Hero(game);
    hero.width = 100;
    hero.height = 100;

    hero.anchor.x = 0.5;
    hero.anchor.y = 0.5;

    hero.position.x = width >> 1;
    hero.position.y = height >> 1;

    ground = new Ground();
    ground.width = width;
    ground.position.x = 0;
    ground.position.y = height - ground.height;

    camera = new Camera();
    stage.addChild(ground);
    stage.addChild(hero);

    gravity = new Vector(0, 0.05);

    game = {
        stage: stage,
        hero: hero,
        ground: ground,
        physics: {
            forces: [gravity],
            forcesSubscribers: [hero]
        },
        toUpdate: [hero],
        IS_JUMPING: true
    };

    input(game);
}

function animate() {
    var a1, a2, i, j, k, l;

    // apply each force to each force subscriber
    for (i = 0, a1 = game.physics.forces, l = a1.length; i < l; ++i) {
        for (j = 0, a2 = game.physics.forcesSubscribers, k = a2.length; j < k; ++j) {
            a2[j].acceleration.add(a1[i]);
        }
    }

    for (i = 0, a1 = game.toUpdate, l = a1.length; i < l; ++i) {
        a1[i].update(game);
    }

    game.IS_JUMPING = ((game.hero.position.y - game.hero.height * 0.5) < game.ground.hitArea.y);

    requestAnimationFrame(animate);
    renderer.render(stage);
}
