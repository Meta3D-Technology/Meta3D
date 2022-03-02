'use strict';

var CreateGameObjectUtils$Meta3dGameobjectDataoriented = require("./CreateGameObjectUtils.bs.js");
var GetAllGameObjectUtils$Meta3dGameobjectDataoriented = require("./GetAllGameObjectUtils.bs.js");

function getGameObjectContribute(param) {
  return {
          createStateFunc: (function (param) {
              return {
                      maxUID: 0
                    };
            }),
          createGameObjectFunc: CreateGameObjectUtils$Meta3dGameobjectDataoriented.create,
          getAllGameObjectsFunc: GetAllGameObjectUtils$Meta3dGameobjectDataoriented.getAll
        };
}

exports.getGameObjectContribute = getGameObjectContribute;
/* No side effect */
