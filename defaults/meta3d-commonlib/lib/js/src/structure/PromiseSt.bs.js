'use strict';

var Curry = require("rescript/lib/js/curry.js");

function bind(p, func) {
  return p.then(Curry.__1(func));
}

function map(p, func) {
  return p.then(function (v) {
              return Promise.resolve(Curry._1(func, v));
            });
}

exports.bind = bind;
exports.map = map;
/* No side effect */
