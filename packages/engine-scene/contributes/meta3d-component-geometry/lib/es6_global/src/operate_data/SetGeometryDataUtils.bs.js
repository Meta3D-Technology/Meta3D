

import * as Caml_obj from "../../../../../../../../node_modules/rescript/lib/es6/caml_obj.js";
import * as Log$Meta3dCommonlib from "../../../../../../../../node_modules/meta3d-commonlib/lib/es6_global/src/log/Log.bs.js";
import * as Exception$Meta3dCommonlib from "../../../../../../../../node_modules/meta3d-commonlib/lib/es6_global/src/structure/Exception.bs.js";
import * as ImmutableSparseMap$Meta3dCommonlib from "../../../../../../../../node_modules/meta3d-commonlib/lib/es6_global/src/structure/sparse_map/ImmutableSparseMap.bs.js";
import * as IndicesUtils$Meta3dComponentGeometry from "./IndicesUtils.bs.js";
import * as NormalsUtils$Meta3dComponentGeometry from "./NormalsUtils.bs.js";
import * as Index$Meta3dComponentGeometryProtocol from "../../../../../../../../node_modules/meta3d-component-geometry-protocol/lib/es6_global/src/Index.bs.js";
import * as TangentsUtils$Meta3dComponentGeometry from "./TangentsUtils.bs.js";
import * as VerticesUtils$Meta3dComponentGeometry from "./VerticesUtils.bs.js";
import * as TexCoordsUtils$Meta3dComponentGeometry from "./TexCoordsUtils.bs.js";

function setName(state, geometry, name) {
  var newrecord = Caml_obj.obj_dup(state);
  newrecord.names = ImmutableSparseMap$Meta3dCommonlib.set(state.names, geometry, name);
  return newrecord;
}

function setData(state, geometry, dataName, dataValue) {
  if (dataName === Index$Meta3dComponentGeometryProtocol.dataName.name) {
    return setName(state, geometry, dataValue);
  } else if (dataName === Index$Meta3dComponentGeometryProtocol.dataName.vertices) {
    VerticesUtils$Meta3dComponentGeometry.setVertices(state, geometry, dataValue);
    return state;
  } else if (dataName === Index$Meta3dComponentGeometryProtocol.dataName.normals) {
    NormalsUtils$Meta3dComponentGeometry.setNormals(state, geometry, dataValue);
    return state;
  } else if (dataName === Index$Meta3dComponentGeometryProtocol.dataName.texCoords) {
    TexCoordsUtils$Meta3dComponentGeometry.setTexCoords(state, geometry, dataValue);
    return state;
  } else if (dataName === Index$Meta3dComponentGeometryProtocol.dataName.tangents) {
    TangentsUtils$Meta3dComponentGeometry.setTangents(state, geometry, dataValue);
    return state;
  } else if (dataName === Index$Meta3dComponentGeometryProtocol.dataName.indices) {
    IndicesUtils$Meta3dComponentGeometry.setIndices(state, geometry, dataValue);
    return state;
  } else {
    return Exception$Meta3dCommonlib.throwErr(Exception$Meta3dCommonlib.buildErr(Log$Meta3dCommonlib.buildFatalMessage("setData", "unknown dataName:" + dataName + "", "", "", "")));
  }
}

export {
  setName ,
  setData ,
}
/* No side effect */
