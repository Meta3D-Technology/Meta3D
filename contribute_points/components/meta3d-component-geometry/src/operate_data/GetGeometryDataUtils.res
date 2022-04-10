open StateType

let getData = (.
  {
    vertices,
    texCoords,
    normals,
    tangents,
    indices,
    verticesInfos,
    texCoordsInfos,
    normalsInfos,
    tangentsInfos,
    indicesInfos,
    gameObjectsMap
  } as state,
  geometry,
  dataName: Meta3dEngineCoreProtocol.ComponentContributeType.dataName,
): Js.Nullable.t<'a> => {
  let isDebug = ConfigUtils.getIsDebug(state)

  switch dataName {
  | dataName if dataName == Meta3dComponentGeometryProtocol.Index.dataName.vertices =>
    Meta3dComponentWorkerUtils.VerticesUtils.getVertices(
      vertices,
      verticesInfos,
      isDebug,
      geometry,
    )
    ->Obj.magic
    ->Js.Nullable.return
  | dataName if dataName == Meta3dComponentGeometryProtocol.Index.dataName.normals =>
    Meta3dComponentWorkerUtils.NormalsUtils.getNormals(normals, normalsInfos, isDebug, geometry)
    ->Obj.magic
    ->Js.Nullable.return
  | dataName if dataName == Meta3dComponentGeometryProtocol.Index.dataName.texCoords =>
    Meta3dComponentWorkerUtils.TexCoordsUtils.getTexCoords(
      texCoords,
      texCoordsInfos,
      isDebug,
      geometry,
    )
    ->Obj.magic
    ->Js.Nullable.return
  | dataName if dataName == Meta3dComponentGeometryProtocol.Index.dataName.tangents =>
    Meta3dComponentWorkerUtils.TangentsUtils.getTangents(
      tangents,
      tangentsInfos,
      isDebug,
      geometry,
    )
    ->Obj.magic
    ->Js.Nullable.return
  | dataName if dataName == Meta3dComponentGeometryProtocol.Index.dataName.indices =>
    Meta3dComponentWorkerUtils.IndicesUtils.getIndices(indices, indicesInfos, isDebug, geometry)
    ->Obj.magic
    ->Js.Nullable.return
  | dataName if dataName == Meta3dComponentGeometryProtocol.Index.dataName.vertices =>
    Meta3dComponentWorkerUtils.VerticesUtils.getVertices(
      vertices,
      verticesInfos,
      isDebug,
      geometry,
    )
    ->Obj.magic
    ->Js.Nullable.return
  | dataName if dataName == Meta3dComponentGeometryProtocol.Index.dataName.indicesCount =>
    Meta3dComponentWorkerUtils.IndicesUtils.getIndicesCount(indicesInfos, isDebug, geometry)
    ->Obj.magic
    ->Js.Nullable.return
  | dataName if dataName == Meta3dComponentGeometryProtocol.Index.dataName.gameObjectsMap =>
gameObjectsMap
    ->Obj.magic
    ->Js.Nullable.return
  | _ =>
    Meta3dCommonlib.Exception.throwErr(
      Meta3dCommonlib.Log.buildFatalMessage(
        ~title="getData",
        ~description=j`unknown dataName:${dataName->Obj.magic}`,
        ~reason="",
        ~solution=j``,
        ~params=j``,
      ),
    )
  }
}
