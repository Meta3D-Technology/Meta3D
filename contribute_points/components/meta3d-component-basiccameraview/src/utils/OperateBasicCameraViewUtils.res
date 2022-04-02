open StateType

let _setAllNotActive = state => {
  let {isActiveMap} = state

  {
    ...state,
    isActiveMap: isActiveMap->Meta3dCommonlib.ImmutableSparseMap.map((. value) => false),
  }
}

let getIsActive = (state, cameraView) =>
  state.isActiveMap
  ->Meta3dCommonlib.ImmutableSparseMap.get(cameraView)
  ->Meta3dCommonlib.OptionSt.getWithDefault(false)

let setIsActive = (state, cameraView, isActive) => {
  let state =
    isActive == true
      ? {
          state->_setAllNotActive
        }
      : state

  let {isActiveMap} = state

  {
    ...state,
    isActiveMap: isActiveMap->Meta3dCommonlib.ImmutableSparseMap.set(cameraView, isActive),
  }
}
