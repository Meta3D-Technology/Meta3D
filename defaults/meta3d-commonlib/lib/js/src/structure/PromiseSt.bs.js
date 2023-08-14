'use strict';

var Curry = require("rescript/lib/js/curry.js");
var Js_promise = require("rescript/lib/js/js_promise.js");

function bind(p, func) {
  return Js_promise.then_(func, p);
}

function map(p, func) {
  return Js_promise.then_((function (v) {
                return Promise.resolve(Curry._1(func, v));
              }), p);
}

exports.bind = bind;
exports.map = map;
/* No side effect */
