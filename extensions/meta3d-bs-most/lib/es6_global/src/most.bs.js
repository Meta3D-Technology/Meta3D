

import * as Most from "most";
import * as Curry from "../../../../../node_modules/rescript/lib/es6/curry.js";

function subscribe(arg1, obj) {
  return obj.subscribe(arg1);
}

function unfold(f) {
  return function (param) {
    return Most.unfold((function (x) {
                  var match = Curry._1(f, x);
                  if (match !== undefined) {
                    return {
                            value: match[0],
                            seed: match[1]
                          };
                  } else {
                    return {
                            done: true
                          };
                  }
                }), param);
  };
}

function fromList(list) {
  return unfold(function (curList) {
                if (curList) {
                  return [
                          curList.hd,
                          curList.tl
                        ];
                }
                
              })(list);
}

function concat(arg1, obj) {
  return obj.concat(arg1);
}

var Subject = {};

export {
  subscribe ,
  unfold ,
  fromList ,
  concat ,
  Subject ,
}
/* most Not a pure module */
