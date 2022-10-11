open FrontendUtils.AssembleSpaceStoreType

let reducer = (state, action) => {
  switch action {
  | Reset => {
      ...state,
      apAssembleState: ApAssembleStore.reducer(state.apAssembleState, FrontendUtils.ApAssembleStoreType.Reset),
      elementAssembleState: ElementAssembleStore.reducer(state.elementAssembleState, FrontendUtils.ElementAssembleStoreType.Reset),
    }
  | ApAssembleAction(action) => {
      ...state,
      apAssembleState: ApAssembleStore.reducer(state.apAssembleState, action),
    }
  | ElementAssembleAction(action) => {
      ...state,
      elementAssembleState: ElementAssembleStore.reducer(state.elementAssembleState, action),
    }
  }
}

let initialState = {
  isDebug: true,
  apAssembleState: ApAssembleStore.initialState,
  elementAssembleState: ElementAssembleStore.initialState,
}
