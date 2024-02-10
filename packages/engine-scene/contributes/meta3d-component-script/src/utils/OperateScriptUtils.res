open StateType

let getName = (state, script) => state.names->Meta3dCommonlib.ImmutableSparseMap.getNullable(script)

let setName = (state, script, name) => {
  let {names} = state

  {
    ...state,
    names: names->Meta3dCommonlib.ImmutableSparseMap.set(script, name),
  }
}

let getAttribute = (state, script) =>
  state.attributeMap->Meta3dCommonlib.ImmutableSparseMap.get(script)

let setAttribute = (state, script, attribute) => {
  let {attributeMap} = state

  {
    ...state,
    attributeMap: attributeMap->Meta3dCommonlib.ImmutableSparseMap.set(script, attribute),
  }
}

let getAllAssetData = (state, script) =>
  state.allAssetDataMap->Meta3dCommonlib.ImmutableSparseMap.get(script)

let setAllAssetData = (state, script, allAssetData) => {
  let {allAssetDataMap} = state

  {
    ...state,
    allAssetDataMap: allAssetDataMap->Meta3dCommonlib.ImmutableSparseMap.set(script, allAssetData),
  }
}
