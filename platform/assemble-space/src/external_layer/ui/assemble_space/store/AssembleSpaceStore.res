open FrontendUtils.AssembleSpaceStoreType

let reducer = (state, action) => {
  switch action {
  | ApViewAction(action) => {
      ...state,
      apViewState: ApViewStore.reducer(state.apViewState, action),
    }
  }
}

let initialState = {
  apViewState: ApViewStore.initialState,
}
