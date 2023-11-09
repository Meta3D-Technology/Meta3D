open Meta3dEngineCoreProtocol.StateType

let getIsDebug = state => {
  state.contributeData.isDebug
}

let setIsDebug = ({contributeData} as state, isDebug) => {
  {
    ...state,
    contributeData: {
      ...contributeData,
      isDebug: isDebug,
    },
  }
}
