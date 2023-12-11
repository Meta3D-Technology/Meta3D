open AssembleSpaceStoreType

let reducer = (state, action) => {
  switch action {
  | Reset => {
      ...state,
      apAssembleState: ApAssembleStore.reducer(
        state.apAssembleState,
        ApAssembleStoreType.Reset,
      ),
      elementAssembleState: ElementAssembleStore.reducer(
        state.elementAssembleState,
        ElementAssembleStoreType.Reset,
      ),
      packageAssembleState: PackageAssembleStore.reducer(
        state.packageAssembleState,
        PackageAssembleStoreType.Reset,
      ),
    }
  | ResetWhenSwitch => {
      ...state,
      apAssembleState: ApAssembleStore.reducer(
        state.apAssembleState,
        ApAssembleStoreType.ResetWhenSwitch,
      ),
      elementAssembleState: ElementAssembleStore.reducer(
        state.elementAssembleState,
        ElementAssembleStoreType.ResetWhenSwitch,
      ),
      packageAssembleState: PackageAssembleStore.reducer(
        state.packageAssembleState,
        PackageAssembleStoreType.ResetWhenSwitch,
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
