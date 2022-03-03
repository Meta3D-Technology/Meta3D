

import * as Curry from "./../../../../../rescript/lib/es6/curry.js";

function bind(p, func) {
  return p.then(Curry.__1(func));
}

function map(p, func) {
  return p.then(function (v) {
              return Promise.resolve(Curry._1(func, v));
            });
}

export {
  bind ,
  map ,
  
}
/* No side effect */
