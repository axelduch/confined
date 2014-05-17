'use strict';

var PIXI = require('pixi'),
    stage,
    renderer,
    hero,
    texture,
    width = 400,
    height = 300,
    animate,
    requestAnimationFrame = window.requestAnimationFrame;

texture = PIXI.Texture.fromImage('../assets/hero.png');
hero = new PIXI.Sprite(texture);

stage = new PIXI.Stage(0xAAFFAA);
renderer = PIXI.autoDetectRenderer(width, height);

document.body.appendChild(renderer.view);

requestAnimationFrame(animate);

hero.width = 100;
hero.height = 100;

console.log(hero.width);

hero.anchor.x = 0.5;
hero.anchor.y = 0.5;


hero.position.x = width >> 1;
hero.position.y = height >> 1;

stage.addChild(hero);


function animate() {
    requestAnimationFrame(animate);
    renderer.render(stage);
};