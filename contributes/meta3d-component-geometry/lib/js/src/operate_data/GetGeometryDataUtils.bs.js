'use strict';

var Log$Meta3dCommonlib = require("meta3d-commonlib/lib/js/src/log/Log.bs.js");
var Exception$Meta3dCommonlib = require("meta3d-commonlib/lib/js/src/structure/Exception.bs.js");
var ConfigUtils$Meta3dComponentGeometry = require("../config/ConfigUtils.bs.js");
var Index$Meta3dComponentGeometryProtocol = require("meta3d-component-geometry-protocol/lib/js/src/Index.bs.js");
var IndicesUtils$Meta3dComponentWorkerUtils = require("meta3d-component-worker-utils/lib/js/src/geometry/IndicesUtils.bs.js");
var NormalsUtils$Meta3dComponentWorkerUtils = require("meta3d-component-worker-utils/lib/js/src/geometry/NormalsUtils.bs.js");
var TangentsUtils$Meta3dComponentWorkerUtils = require("meta3d-component-worker-utils/lib/js/src/geometry/TangentsUtils.bs.js");
var VerticesUtils$Meta3dComponentWorkerUtils = require("meta3d-component-worker-utils/lib/js/src/geometry/VerticesUtils.bs.js");
var TexCoordsUtils$Meta3dComponentWorkerUtils = require("meta3d-component-worker-utils/lib/js/src/geometry/TexCoordsUtils.bs.js");

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
  } else {
    return Exception$Meta3dCommonlib.throwErr(Exception$Meta3dCommonlib.buildErr(Log$Meta3dCommonlib.buildFatalMessage("getData", "unknown dataName:" + param$1 + "", "", "", "")));
  }
}

exports.getData = getData;
/* No side effect */
