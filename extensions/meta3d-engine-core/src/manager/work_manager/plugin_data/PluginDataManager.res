let getIsDebug = () => {
  StateContainer.unsafeGetState().pluginData.isDebug
}

let setIsDebug = isDebug => {
  let {pluginData} as state = StateContainer.unsafeGetState()

  {
    ...state,
    pluginData: {
      ...pluginData,
      isDebug: isDebug,
    },
  }->StateContainer.setState
}
