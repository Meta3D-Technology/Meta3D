open StateType

let setName = (state, geometry, name) => {
  let {names} = state

  {
    ...state,
    names: names->Meta3dCommonlib.ImmutableSparseMap.set(geometry, name),
  }
}

let setData = (.
  state,
  geometry,
  dataName: Meta3dEngineCoreProtocol.ComponentContributeType.dataName,
  dataValue: Meta3dEngineCoreProtocol.ComponentContributeType.dataValue,
): StateType.state => {
  switch dataName {
  | dataName if dataName == Meta3dComponentGeometryProtocol.Index.dataName.name =>
    setName(state, geometry, dataValue->Obj.magic)
  | dataName if dataName == Meta3dComponentGeometryProtocol.Index.dataName.vertices =>
    VerticesUtils.setVertices(state, geometry, dataValue->Obj.magic)
    state
  | dataName if dataName == Meta3dComponentGeometryProtocol.Index.dataName.normals =>
    NormalsUtils.setNormals(state, geometry, dataValue->Obj.magic)
    state
  | dataName if dataName == Meta3dComponentGeometryProtocol.Index.dataName.texCoords =>
    TexCoordsUtils.setTexCoords(state, geometry, dataValue->Obj.magic)
    state
  | dataName if dataName == Meta3dComponentGeometryProtocol.Index.dataName.tangents =>
    TangentsUtils.setTangents(state, geometry, dataValue->Obj.magic)
    state
  | dataName if dataName == Meta3dComponentGeometryProtocol.Index.dataName.indices =>
    IndicesUtils.setIndices(state, geometry, dataValue->Obj.magic)
    state
  | _ =>
    Meta3dCommonlib.Exception.throwErr(
      Meta3dCommonlib.Exception.buildErr(
        Meta3dCommonlib.Log.buildFatalMessage(
          ~title="setData",
          ~description=j`unknown dataName:${dataName->Obj.magic}`,
          ~reason="",
          ~solution=j``,
          ~params=j``,
        ),
      ),
    )
  }
}
