open Meta3dEngineCoreProtocol.StateType

let getIsDebug = state => {
  state.pluginData.isDebug
}

let setIsDebug = ({pluginData} as state, isDebug) => {
  {
    ...state,
    pluginData: {
      ...pluginData,
      isDebug: isDebug,
    },
  }
}
