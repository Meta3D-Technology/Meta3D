

import * as Log$Meta3dCommonlib from "./../../../../../../node_modules/meta3d-commonlib/lib/es6_global/src/log/Log.bs.js";
import * as Exception$Meta3dCommonlib from "./../../../../../../node_modules/meta3d-commonlib/lib/es6_global/src/structure/Exception.bs.js";
import * as IndicesUtils$Meta3dComponentWorkerUtils from "./../../../../../../node_modules/meta3d-component-worker-utils/lib/es6_global/src/geometry/IndicesUtils.bs.js";
import * as NormalsUtils$Meta3dComponentWorkerUtils from "./../../../../../../node_modules/meta3d-component-worker-utils/lib/es6_global/src/geometry/NormalsUtils.bs.js";
import * as TangentsUtils$Meta3dComponentWorkerUtils from "./../../../../../../node_modules/meta3d-component-worker-utils/lib/es6_global/src/geometry/TangentsUtils.bs.js";
import * as VerticesUtils$Meta3dComponentWorkerUtils from "./../../../../../../node_modules/meta3d-component-worker-utils/lib/es6_global/src/geometry/VerticesUtils.bs.js";
import * as ConfigUtils$Meta3dComponentGeometryWorker from "../config/ConfigUtils.bs.js";
import * as TexCoordsUtils$Meta3dComponentWorkerUtils from "./../../../../../../node_modules/meta3d-component-worker-utils/lib/es6_global/src/geometry/TexCoordsUtils.bs.js";
import * as Index$Meta3dComponentGeometryWorkerProtocol from "./../../../../../../node_modules/meta3d-component-geometry-worker-protocol/lib/es6_global/src/Index.bs.js";

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

export {
  getData ,
  
}
/* No side effect */
