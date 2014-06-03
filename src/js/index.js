'use strict';

var PIXI = require('pixi.js'),
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
    time,
    dt = 0,
    speed = 0.08,
    game;

loader.onComplete = onAssetsLoaded;
loader.load();

function onAssetsLoaded() {
    var camera,
        hero,
        ground,
        scene,
        gravity;

    console.log('loaded');
    stage = new PIXI.Stage(0xAAFF);
    renderer = PIXI.autoDetectRenderer(width, height);

    document.body.appendChild(renderer.view);

    requestAnimationFrame(animate);

    hero = new Hero(game);
    hero.width = 75;
    hero.height = 75;

    hero.anchor.x = 0.5;
    hero.anchor.y = 0.5;

    hero.position.x = width >> 1;
    hero.position.y = height >> 1;

    ground = new Ground();
    ground.width = width;
    ground.position.x = 0;
    ground.position.y = height - ground.height;

    scene = new PIXI.DisplayObjectContainer();
    scene.addChild(ground);
    scene.addChild(hero);
    stage.addChild(scene);

    gravity = new Vector(0, 0.09);

    game = {
        stage: stage,
        width: width,
        height: height,
        scene: scene,
        states: {
            IN_THE_AIR: true,
            IS_ATTACKING: false,
            IS_MOVING_LEFT: false,
            IS_MOVING_RIGHT: false
        },
        hero: hero,
        ground: ground,
        physics: {
            friction: 0.87,
            forces: [gravity],
            forcesSubscribers: [hero]
        },
        dt: 0,
        speed: speed,
        toUpdate: [hero]
    };

    camera = new Camera(game);
    game.camera = camera;
    input(game);
}

function animate() {
    var a1, i, l, now;
    console.clear();

    applyPhysics();

    for (i = 0, a1 = game.toUpdate, l = a1.length; i < l; ++i) {
        a1[i].update(game);
    }

    game.IN_THE_AIR = ((game.hero.position.y - game.hero.height * 0.5) < game.ground.hitArea.y);

    requestAnimationFrame(animate);

    now = +new Date();
    dt = now - (time || now);

    time = now;

    game.dt = dt;
    renderer.render(stage);
}

function applyPhysics() {
    var a1, a2, i, j, k, l;
    // apply each force to each force subscriber
    for (i = 0, a1 = game.physics.forces, l = a1.length; i < l; ++i) {
        for (j = 0, a2 = game.physics.forcesSubscribers, k = a2.length; j < k; ++j) {
            a2[j].acceleration.add(a1[i]);
        }
    }
}
