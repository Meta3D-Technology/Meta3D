

import * as Log$Meta3dCommonlib from "./../../../../../../../node_modules/meta3d-commonlib/lib/es6_global/src/log/Log.bs.js";
import * as Exception$Meta3dCommonlib from "./../../../../../../../node_modules/meta3d-commonlib/lib/es6_global/src/structure/Exception.bs.js";
import * as ConfigUtils$Meta3dComponentGeometry from "../config/ConfigUtils.bs.js";
import * as Index$Meta3dComponentGeometryProtocol from "./../../../../../../../node_modules/meta3d-component-geometry-protocol/lib/es6_global/src/Index.bs.js";
import * as IndicesUtils$Meta3dComponentWorkerUtils from "./../../../../../../../node_modules/meta3d-component-worker-utils/lib/es6_global/src/geometry/IndicesUtils.bs.js";
import * as NormalsUtils$Meta3dComponentWorkerUtils from "./../../../../../../../node_modules/meta3d-component-worker-utils/lib/es6_global/src/geometry/NormalsUtils.bs.js";
import * as TangentsUtils$Meta3dComponentWorkerUtils from "./../../../../../../../node_modules/meta3d-component-worker-utils/lib/es6_global/src/geometry/TangentsUtils.bs.js";
import * as VerticesUtils$Meta3dComponentWorkerUtils from "./../../../../../../../node_modules/meta3d-component-worker-utils/lib/es6_global/src/geometry/VerticesUtils.bs.js";
import * as TexCoordsUtils$Meta3dComponentWorkerUtils from "./../../../../../../../node_modules/meta3d-component-worker-utils/lib/es6_global/src/geometry/TexCoordsUtils.bs.js";

function getData(state, param, param$1) {
  var vertices = state.vertices;
  var texCoords = state.texCoords;
  var normals = state.normals;
  var tangents = state.tangents;
  var indices = state.indices;
  var verticesInfos = state.verticesInfos;
  var texCoordsInfos = state.texCoordsInfos;
  var normalsInfos = state.normalsInfos;
  var tangentsInfos = state.tangentsInfos;
  var indicesInfos = state.indicesInfos;
  var gameObjectsMap = state.gameObjectsMap;
  var isDebug = ConfigUtils$Meta3dComponentGeometry.getIsDebug(state);
  if (param$1 === Index$Meta3dComponentGeometryProtocol.dataName.vertices) {
    return VerticesUtils$Meta3dComponentWorkerUtils.getVertices(vertices, verticesInfos, isDebug, param);
  } else if (param$1 === Index$Meta3dComponentGeometryProtocol.dataName.normals) {
    return NormalsUtils$Meta3dComponentWorkerUtils.getNormals(normals, normalsInfos, isDebug, param);
  } else if (param$1 === Index$Meta3dComponentGeometryProtocol.dataName.texCoords) {
    return TexCoordsUtils$Meta3dComponentWorkerUtils.getTexCoords(texCoords, texCoordsInfos, isDebug, param);
  } else if (param$1 === Index$Meta3dComponentGeometryProtocol.dataName.tangents) {
    return TangentsUtils$Meta3dComponentWorkerUtils.getTangents(tangents, tangentsInfos, isDebug, param);
  } else if (param$1 === Index$Meta3dComponentGeometryProtocol.dataName.indices) {
    return IndicesUtils$Meta3dComponentWorkerUtils.getIndices(indices, indicesInfos, isDebug, param);
  } else if (param$1 === Index$Meta3dComponentGeometryProtocol.dataName.vertices) {
    return VerticesUtils$Meta3dComponentWorkerUtils.getVertices(vertices, verticesInfos, isDebug, param);
  } else if (param$1 === Index$Meta3dComponentGeometryProtocol.dataName.indicesCount) {
    return IndicesUtils$Meta3dComponentWorkerUtils.getIndicesCount(indicesInfos, isDebug, param);
  } else if (param$1 === Index$Meta3dComponentGeometryProtocol.dataName.gameObjectsMap) {
    return gameObjectsMap;
  } else {
    return Exception$Meta3dCommonlib.throwErr(Log$Meta3dCommonlib.buildFatalMessage("getData", "unknown dataName:" + param$1, "", "", ""));
  }
}

export {
  getData ,
  
}
/* No side effect */
