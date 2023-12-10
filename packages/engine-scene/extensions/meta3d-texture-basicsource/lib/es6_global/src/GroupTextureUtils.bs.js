

import * as Caml_obj from "../../../../../../../node_modules/rescript/lib/es6/caml_obj.js";
import * as ArraySt$Meta3dCommonlib from "../../../../../../../node_modules/meta3d-commonlib/lib/es6_global/src/structure/ArraySt.bs.js";
import * as ImmutableSparseMap$Meta3dCommonlib from "../../../../../../../node_modules/meta3d-commonlib/lib/es6_global/src/structure/sparse_map/ImmutableSparseMap.bs.js";

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

export {
  _getMaterials ,
  isGroupTexture ,
  addMaterial ,
  removeMaterial ,
}
/* No side effect */
