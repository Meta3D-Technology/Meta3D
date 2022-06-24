let hasExtension = (state: Meta3dType.Index.state, name) => {
  state.extensionServiceMap->Meta3dCommonlib.ImmutableHashMap.has(name)
}

let hasContribute = (state: Meta3dType.Index.state, name) => {
  state.contributeMap->Meta3dCommonlib.ImmutableHashMap.has(name)
}
