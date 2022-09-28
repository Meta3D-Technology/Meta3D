open FrontendUtils.AssembleSpaceStoreType

let reducer = (state, action) => {
  switch action {
  | ApViewAction(action) => {
      ...state,
      apViewState: ApViewStore.reducer(state.apViewState, action),
    }
  | UIViewAction(action) => {
      ...state,
      uiViewState: UIViewStore.reducer(state.uiViewState, action),
    }
  }
}

let initialState = {
  apViewState: ApViewStore.initialState,
  uiViewState: UIViewStore.initialState,
}
