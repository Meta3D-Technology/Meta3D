open AssembleSpaceStoreType

let reducer = (state, action) => {
  switch action {
  | ResetWhenEnter => {
      ...state,
      apAssembleState: ApAssembleStore.reducer(
        state.apAssembleState,
        ApAssembleStoreType.ResetWhenEnter,
      ),
      elementAssembleState: ElementAssembleStore.reducer(
        state.elementAssembleState,
        ElementAssembleStoreType.ResetWhenEnter,
      ),
      packageAssembleState: PackageAssembleStore.reducer(
        state.packageAssembleState,
        PackageAssembleStoreType.ResetWhenEnter,
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
  | OpenDocDrawer(docDrawerData) => {
      ...state,
      docDrawerData: docDrawerData->Some,
    }
  | CloseDocDrawer => {
      ...state,
      docDrawerData: None,
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
  docDrawerData: None,
}
