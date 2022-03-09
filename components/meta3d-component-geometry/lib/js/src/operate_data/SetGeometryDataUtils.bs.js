'use strict';

var Log$Meta3dCommonlib = require("meta3d-commonlib/lib/js/src/log/Log.bs.js");
var Exception$Meta3dCommonlib = require("meta3d-commonlib/lib/js/src/structure/Exception.bs.js");
var IndicesUtils$Meta3dComponentGeometry = require("./IndicesUtils.bs.js");
var NormalsUtils$Meta3dComponentGeometry = require("./NormalsUtils.bs.js");
var Index$Meta3dComponentGeometryProtocol = require("meta3d-component-geometry-protocol/lib/js/src/Index.bs.js");
var TangentsUtils$Meta3dComponentGeometry = require("./TangentsUtils.bs.js");
var VerticesUtils$Meta3dComponentGeometry = require("./VerticesUtils.bs.js");
var TexCoordsUtils$Meta3dComponentGeometry = require("./TexCoordsUtils.bs.js");

function setData(state, geometry, dataName, dataValue) {
  if (dataName === Index$Meta3dComponentGeometryProtocol.dataName.vertices) {
    return VerticesUtils$Meta3dComponentGeometry.setVertices(state, geometry, dataValue);
  } else if (dataName === Index$Meta3dComponentGeometryProtocol.dataName.normals) {
    return NormalsUtils$Meta3dComponentGeometry.setNormals(state, geometry, dataValue);
  } else if (dataName === Index$Meta3dComponentGeometryProtocol.dataName.texCoords) {
    return TexCoordsUtils$Meta3dComponentGeometry.setTexCoords(state, geometry, dataValue);
  } else if (dataName === Index$Meta3dComponentGeometryProtocol.dataName.tangents) {
    return TangentsUtils$Meta3dComponentGeometry.setTangents(state, geometry, dataValue);
  } else if (dataName === Index$Meta3dComponentGeometryProtocol.dataName.indices) {
    return IndicesUtils$Meta3dComponentGeometry.setIndices(state, geometry, dataValue);
  } else {
    return Exception$Meta3dCommonlib.throwErr(Log$Meta3dCommonlib.buildFatalMessage("setData", "unknown dataName:" + dataName, "", "", ""));
  }
}

exports.setData = setData;
/* No side effect */
