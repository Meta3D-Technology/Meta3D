'use strict';

var Log$Meta3dCommonlib = require("meta3d-commonlib/lib/js/src/log/Log.bs.js");
var Exception$Meta3dCommonlib = require("meta3d-commonlib/lib/js/src/structure/Exception.bs.js");
var IndicesUtils$Meta3dComponentWorkerUtils = require("meta3d-component-worker-utils/lib/js/src/geometry/IndicesUtils.bs.js");
var NormalsUtils$Meta3dComponentWorkerUtils = require("meta3d-component-worker-utils/lib/js/src/geometry/NormalsUtils.bs.js");
var TangentsUtils$Meta3dComponentWorkerUtils = require("meta3d-component-worker-utils/lib/js/src/geometry/TangentsUtils.bs.js");
var VerticesUtils$Meta3dComponentWorkerUtils = require("meta3d-component-worker-utils/lib/js/src/geometry/VerticesUtils.bs.js");
var ConfigUtils$Meta3dComponentGeometryWorker = require("../config/ConfigUtils.bs.js");
var TexCoordsUtils$Meta3dComponentWorkerUtils = require("meta3d-component-worker-utils/lib/js/src/geometry/TexCoordsUtils.bs.js");
var Index$Meta3dComponentGeometryWorkerProtocol = require("meta3d-component-geometry-worker-protocol/lib/js/src/Index.bs.js");

function getData(state, geometry, dataName) {
  var indicesInfos = state.indicesInfos;
  var verticesInfos = state.verticesInfos;
  var vertices = state.vertices;
  var isDebug = ConfigUtils$Meta3dComponentGeometryWorker.getIsDebug(state);
  if (dataName === Index$Meta3dComponentGeometryWorkerProtocol.dataName.vertices) {
    return VerticesUtils$Meta3dComponentWorkerUtils.getVertices(vertices, verticesInfos, isDebug, geometry);
  } else if (dataName === Index$Meta3dComponentGeometryWorkerProtocol.dataName.normals) {
    return NormalsUtils$Meta3dComponentWorkerUtils.getNormals(state.normals, state.normalsInfos, isDebug, geometry);
  } else if (dataName === Index$Meta3dComponentGeometryWorkerProtocol.dataName.texCoords) {
    return TexCoordsUtils$Meta3dComponentWorkerUtils.getTexCoords(state.texCoords, state.texCoordsInfos, isDebug, geometry);
  } else if (dataName === Index$Meta3dComponentGeometryWorkerProtocol.dataName.tangents) {
    return TangentsUtils$Meta3dComponentWorkerUtils.getTangents(state.tangents, state.tangentsInfos, isDebug, geometry);
  } else if (dataName === Index$Meta3dComponentGeometryWorkerProtocol.dataName.indices) {
    return IndicesUtils$Meta3dComponentWorkerUtils.getIndices(state.indices, indicesInfos, isDebug, geometry);
  } else if (dataName === Index$Meta3dComponentGeometryWorkerProtocol.dataName.vertices) {
    return VerticesUtils$Meta3dComponentWorkerUtils.getVertices(vertices, verticesInfos, isDebug, geometry);
  } else if (dataName === Index$Meta3dComponentGeometryWorkerProtocol.dataName.indicesCount) {
    return IndicesUtils$Meta3dComponentWorkerUtils.getIndicesCount(indicesInfos, isDebug, geometry);
  } else {
    return Exception$Meta3dCommonlib.throwErr(Log$Meta3dCommonlib.buildFatalMessage("getData", "unknown dataName:" + dataName, "", "", ""));
  }
}

exports.getData = getData;
/* No side effect */
