open FrontendUtils.AssembleSpaceStoreType

let reducer = (state, action) => {
  switch action {
  | SelectExtension(protocolIconBase64, extension) => {
      ...state,
      selectedExtensions: state.selectedExtensions->Meta3dCommonlib.ListSt.push({
        id: extension.id,
        protocolIconBase64: protocolIconBase64,
        newName: None,
        isStart: false,
        data: extension.data,
      }),
    }
  }
}

let initialState = {
  selectedExtensions: list{},
}
