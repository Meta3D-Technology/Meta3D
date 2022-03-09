

import * as Log$Meta3dCommonlib from "./../../../../../../node_modules/meta3d-commonlib/lib/es6_global/src/log/Log.bs.js";
import * as Exception$Meta3dCommonlib from "./../../../../../../node_modules/meta3d-commonlib/lib/es6_global/src/structure/Exception.bs.js";
import * as IndicesUtils$Meta3dComponentGeometry from "./IndicesUtils.bs.js";
import * as NormalsUtils$Meta3dComponentGeometry from "./NormalsUtils.bs.js";
import * as Index$Meta3dComponentGeometryProtocol from "./../../../../../../node_modules/meta3d-component-geometry-protocol/lib/es6_global/src/Index.bs.js";
import * as TangentsUtils$Meta3dComponentGeometry from "./TangentsUtils.bs.js";
import * as VerticesUtils$Meta3dComponentGeometry from "./VerticesUtils.bs.js";
import * as TexCoordsUtils$Meta3dComponentGeometry from "./TexCoordsUtils.bs.js";

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

export {
  setData ,
  
}
/* No side effect */
