

import * as Curry from "../../../../../../node_modules/rescript/lib/es6/curry.js";
import * as Js_promise from "../../../../../../node_modules/rescript/lib/es6/js_promise.js";

function bind(p, func) {
  return Js_promise.then_(func, p);
}

function map(p, func) {
  return Js_promise.then_((function (v) {
                return Promise.resolve(Curry._1(func, v));
              }), p);
}

export {
  bind ,
  map ,
}
/* No side effect */
