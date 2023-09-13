

import * as Log$Meta3dCommonlib from "./../../../../../meta3d-commonlib/lib/es6_global/src/log/Log.bs.js";
import * as Exception$Meta3dCommonlib from "./../../../../../meta3d-commonlib/lib/es6_global/src/structure/Exception.bs.js";
import * as IndicesUtils$Meta3dComponentGeometry from "./IndicesUtils.bs.js";
import * as NormalsUtils$Meta3dComponentGeometry from "./NormalsUtils.bs.js";
import * as Index$Meta3dComponentGeometryProtocol from "./../../../../../meta3d-component-geometry-protocol/lib/es6_global/src/Index.bs.js";
import * as TangentsUtils$Meta3dComponentGeometry from "./TangentsUtils.bs.js";
import * as VerticesUtils$Meta3dComponentGeometry from "./VerticesUtils.bs.js";
import * as TexCoordsUtils$Meta3dComponentGeometry from "./TexCoordsUtils.bs.js";

function setData(state, geometry, dataName, dataValue) {
  if (dataName === Index$Meta3dComponentGeometryProtocol.dataName.vertices) {
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
    return Exception$Meta3dCommonlib.throwErr(Log$Meta3dCommonlib.buildFatalMessage("setData", "unknown dataName:" + dataName + "", "", "", ""));
  }
}

export {
  setData ,
}
/* No side effect */
