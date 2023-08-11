'use strict';

var Curry = require("rescript/lib/js/curry.js");
var Index$Meta3dComponentGeometryProtocol = require("meta3d-component-geometry-protocol/lib/js/src/Index.bs.js");

function create(usedComponentContribute, param, param$1) {
  var setComponentData = param.setComponentData;
  var match = Curry._1(param.createComponent, usedComponentContribute);
  var geometry = match[1];
  var usedComponentContribute$1 = Curry._4(setComponentData, Curry._4(setComponentData, Curry._4(setComponentData, Curry._4(setComponentData, Curry._4(setComponentData, match[0], geometry, Index$Meta3dComponentGeometryProtocol.dataName.vertices, param$1[0]), geometry, Index$Meta3dComponentGeometryProtocol.dataName.normals, param$1[2]), geometry, Index$Meta3dComponentGeometryProtocol.dataName.tangents, param$1[3]), geometry, Index$Meta3dComponentGeometryProtocol.dataName.texCoords, param$1[1]), geometry, Index$Meta3dComponentGeometryProtocol.dataName.indices, param$1[4]);
  return [
          usedComponentContribute$1,
          geometry
        ];
}

exports.create = create;
/* No side effect */
