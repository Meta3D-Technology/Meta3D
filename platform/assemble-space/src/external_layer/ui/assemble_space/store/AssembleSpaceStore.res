open FrontendUtils.AssembleSpaceStoreType

let reducer = (state, action) => {
  switch action {
  | Reset => {
      ...state,
      apAssembleState: ApAssembleStore.reducer(
        state.apAssembleState,
        FrontendUtils.ApAssembleStoreType.Reset,
      ),
      elementAssembleState: ElementAssembleStore.reducer(
        state.elementAssembleState,
        FrontendUtils.ElementAssembleStoreType.Reset,
      ),
      packageAssembleState: PackageAssembleStore.reducer(
        state.packageAssembleState,
        FrontendUtils.PackageAssembleStoreType.Reset,
      ),
    }
  | ApAssembleAction(action) => {
      ...state,
      apAssembleState: ApAssembleStore.reducer(state.apAssembleState, action),
    }
  | ElementAssembleAction(action) => {
      ...state,
      elementAssembleState: ElementAssembleStore.reducer(state.elementAssembleState, action),
    }
  | PackageAssembleAction(action) => {
      ...state,
      packageAssembleState: PackageAssembleStore.reducer(state.packageAssembleState, action),
    }
  }
}

let initialState = {
  apAssembleState: ApAssembleStore.initialState,
  elementAssembleState: ElementAssembleStore.initialState,
  packageAssembleState: PackageAssembleStore.initialState,
}
