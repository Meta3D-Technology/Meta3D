'use strict';

var Caml_obj = require("rescript/lib/js/caml_obj.js");
var ArraySt$Meta3dCommonlib = require("meta3d-commonlib/lib/js/src/structure/ArraySt.bs.js");
var ImmutableSparseMap$Meta3dCommonlib = require("meta3d-commonlib/lib/js/src/structure/sparse_map/ImmutableSparseMap.bs.js");

var _getMaterials = ImmutableSparseMap$Meta3dCommonlib.getExn;

function isGroupTexture(materials, texture) {
  return ArraySt$Meta3dCommonlib.length(ImmutableSparseMap$Meta3dCommonlib.getExn(materials, texture)) > 1;
}

function addMaterial(materials, texture, material) {
  return ImmutableSparseMap$Meta3dCommonlib.set(materials, texture, ArraySt$Meta3dCommonlib.push(ImmutableSparseMap$Meta3dCommonlib.getExn(materials, texture), material));
}

function removeMaterial(materials, texture, material) {
  return ImmutableSparseMap$Meta3dCommonlib.set(materials, texture, ArraySt$Meta3dCommonlib.filter(ImmutableSparseMap$Meta3dCommonlib.getExn(materials, texture), (function (material_) {
                    return Caml_obj.notequal(material_, material);
                  })));
}

exports._getMaterials = _getMaterials;
exports.isGroupTexture = isGroupTexture;
exports.addMaterial = addMaterial;
exports.removeMaterial = removeMaterial;
/* No side effect */
