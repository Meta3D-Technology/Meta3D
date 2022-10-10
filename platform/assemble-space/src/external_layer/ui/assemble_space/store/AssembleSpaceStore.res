open FrontendUtils.AssembleSpaceStoreType

let reducer = (state, action) => {
  switch action {
  | Reset => {
      ...state,
      apViewState: ApViewStore.reducer(state.apViewState, FrontendUtils.ApViewStoreType.Reset),
      uiViewState: UIViewStore.reducer(state.uiViewState, FrontendUtils.UIViewStoreType.Reset),
    }
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
  isDebug: true,
  apViewState: ApViewStore.initialState,
  uiViewState: UIViewStore.initialState,
}
