'use strict';

var BufferGeometryUtils$Meta3dComponentWorkerUtils = require("./BufferGeometryUtils.bs.js");

function createTypeArrays(buffer, geometryPointCount, geometryCount) {
  return [
          new Float32Array(buffer, BufferGeometryUtils$Meta3dComponentWorkerUtils.getVerticesOffset(geometryPointCount), BufferGeometryUtils$Meta3dComponentWorkerUtils.getVertexLength(geometryPointCount)),
          new Float32Array(buffer, BufferGeometryUtils$Meta3dComponentWorkerUtils.getTexCoordsOffset(geometryPointCount), BufferGeometryUtils$Meta3dComponentWorkerUtils.getTexCoordsLength(geometryPointCount)),
          new Float32Array(buffer, BufferGeometryUtils$Meta3dComponentWorkerUtils.getNormalsOffset(geometryPointCount), BufferGeometryUtils$Meta3dComponentWorkerUtils.getVertexLength(geometryPointCount)),
          new Float32Array(buffer, BufferGeometryUtils$Meta3dComponentWorkerUtils.getTangentsOffset(geometryPointCount), BufferGeometryUtils$Meta3dComponentWorkerUtils.getVertexLength(geometryPointCount)),
          new Uint32Array(buffer, BufferGeometryUtils$Meta3dComponentWorkerUtils.getIndicesOffset(geometryPointCount), BufferGeometryUtils$Meta3dComponentWorkerUtils.getIndicesLength(geometryPointCount)),
          new Uint32Array(buffer, BufferGeometryUtils$Meta3dComponentWorkerUtils.getVerticesInfosOffset(geometryPointCount), BufferGeometryUtils$Meta3dComponentWorkerUtils.getVerticesInfosLength(geometryCount)),
          new Uint32Array(buffer, BufferGeometryUtils$Meta3dComponentWorkerUtils.getTexCoordsInfosOffset(geometryPointCount, geometryCount), BufferGeometryUtils$Meta3dComponentWorkerUtils.getTexCoordsInfosLength(geometryCount)),
          new Uint32Array(buffer, BufferGeometryUtils$Meta3dComponentWorkerUtils.getNormalsInfosOffset(geometryPointCount, geometryCount), BufferGeometryUtils$Meta3dComponentWorkerUtils.getNormalsInfosLength(geometryCount)),
          new Uint32Array(buffer, BufferGeometryUtils$Meta3dComponentWorkerUtils.getTangentsInfosOffset(geometryPointCount, geometryCount), BufferGeometryUtils$Meta3dComponentWorkerUtils.getTangentsInfosLength(geometryCount)),
          new Uint32Array(buffer, BufferGeometryUtils$Meta3dComponentWorkerUtils.getIndicesInfosOffset(geometryPointCount, geometryCount), BufferGeometryUtils$Meta3dComponentWorkerUtils.getIndicesInfosLength(geometryCount))
        ];
}

exports.createTypeArrays = createTypeArrays;
/* No side effect */
