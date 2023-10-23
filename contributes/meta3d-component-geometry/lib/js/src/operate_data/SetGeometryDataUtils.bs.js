'use strict';

var Caml_obj = require("rescript/lib/js/caml_obj.js");
var Log$Meta3dCommonlib = require("meta3d-commonlib/lib/js/src/log/Log.bs.js");
var Exception$Meta3dCommonlib = require("meta3d-commonlib/lib/js/src/structure/Exception.bs.js");
var ImmutableSparseMap$Meta3dCommonlib = require("meta3d-commonlib/lib/js/src/structure/sparse_map/ImmutableSparseMap.bs.js");
var IndicesUtils$Meta3dComponentGeometry = require("./IndicesUtils.bs.js");
var NormalsUtils$Meta3dComponentGeometry = require("./NormalsUtils.bs.js");
var Index$Meta3dComponentGeometryProtocol = require("meta3d-component-geometry-protocol/lib/js/src/Index.bs.js");
var TangentsUtils$Meta3dComponentGeometry = require("./TangentsUtils.bs.js");
var VerticesUtils$Meta3dComponentGeometry = require("./VerticesUtils.bs.js");
var TexCoordsUtils$Meta3dComponentGeometry = require("./TexCoordsUtils.bs.js");

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

exports.setName = setName;
exports.setData = setData;
/* No side effect */
