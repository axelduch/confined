'use strict';

var assetsShortHandArray = [
        'hero.png'
    ],
    assetsArray = assetsShortHandArray.map(function (path) {
        return '../assets/' + path;
    }),
    assetsHash = {};

assetsArray.forEach(function (path, key) {
    assetsHash[assetsShortHandArray[key]] = path;
});

module.exports = {
    array: assetsArray,
    hash: assetsHash
}