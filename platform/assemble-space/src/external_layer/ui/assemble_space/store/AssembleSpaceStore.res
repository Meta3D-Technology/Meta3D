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
  | SetInspectorCurrentExtensionId(id) => {
      ...state,
      inspectorCurrentExtensionId: id->Some,
    }
  | StartExtension(id) => {
      ...state,
      selectedExtensions: state.selectedExtensions->Meta3dCommonlib.ListSt.map(extension => {
        extension.id === id
          ? {
              ...extension,
              isStart: true,
            }
          : extension
      }),
    }
  | UnStartExtension(id) => {
      ...state,
      selectedExtensions: state.selectedExtensions->Meta3dCommonlib.ListSt.map(extension => {
        extension.id === id
          ? {
              ...extension,
              isStart: false,
            }
          : extension
      }),
    }
  | SetExtensionNewName(id, newName) => {
      ...state,
      selectedExtensions: state.selectedExtensions->Meta3dCommonlib.ListSt.map(extension => {
        extension.id === id
          ? {
              ...extension,
              newName: newName->Some,
            }
          : extension
      }),
    }
  }
}

let initialState = {
  selectedExtensions: list{},
  inspectorCurrentExtensionId: None,
}
