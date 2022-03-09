open Meta3dComponentGeometryProtocol.Index

let setData = (.
  state,
  geometry,
  dataName: Meta3dComponentGeometryProtocol.Index.dataNameType,
  dataValue: Meta3dEngineCoreProtocol.ComponentContributeType.dataValue,
): Meta3dComponentGeometryProtocol.Index.state => {
  switch dataName {
  | dataName if dataName == Meta3dComponentGeometryProtocol.Index.dataName.vertices =>
    VerticesUtils.setVertices(state, geometry, dataValue->Obj.magic)
  | dataName if dataName == Meta3dComponentGeometryProtocol.Index.dataName.normals =>
    NormalsUtils.setNormals(state, geometry, dataValue->Obj.magic)
  | dataName if dataName == Meta3dComponentGeometryProtocol.Index.dataName.texCoords =>
    TexCoordsUtils.setTexCoords(state, geometry, dataValue->Obj.magic)
  | dataName if dataName == Meta3dComponentGeometryProtocol.Index.dataName.tangents =>
    TangentsUtils.setTangents(state, geometry, dataValue->Obj.magic)
  | dataName if dataName == Meta3dComponentGeometryProtocol.Index.dataName.indices =>
    IndicesUtils.setIndices(state, geometry, dataValue->Obj.magic)
  | _ =>
    Meta3dCommonlib.Exception.throwErr(
      Meta3dCommonlib.Log.buildFatalMessage(
        ~title="setData",
        ~description=j`unknown dataName:${dataName->Obj.magic}`,
        ~reason="",
        ~solution=j``,
        ~params=j``,
      ),
    )
  }
}
