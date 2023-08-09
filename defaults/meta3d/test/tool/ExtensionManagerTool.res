let hasExtension = (state: Meta3dType.Index.state, protocolName) => {
  state.extensionServiceMap->Meta3dCommonlib.ImmutableHashMap.has(protocolName)
}

let hasContribute = (state: Meta3dType.Index.state, protocolName) => {
  state.contributeExceptActionMap->Meta3dCommonlib.ImmutableHashMap.has(protocolName)
}
