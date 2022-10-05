open FrontendUtils.ApViewStoreType

let _createState = () => {
  {
    selectedExtensions: list{},
    selectedContributes: list{},
    inspectorCurrentExtensionId: None,
    inspectorCurrentContributeId: None,
    canvasData: {
      width: 0,
      height: 0,
    },
  }
}

let reducer = (state, action) => {
  switch action {
  | Reset => _createState()
  | SelectExtension(protocolIconBase64, extension) => {
      ...state,
      selectedExtensions: state.selectedExtensions->Meta3dCommonlib.ListSt.push({
        id: IdUtils.generateId(Js.Math.random),
        protocolIconBase64: protocolIconBase64,
        newName: None,
        isStart: false,
        data: extension.data,
      }),
    }
  | SetInspectorCurrentExtensionId(id) => {
      ...state,
      inspectorCurrentExtensionId: id->Some,
      inspectorCurrentContributeId: None,
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
  | SelectContribute(protocolIconBase64, contribute) => {
      ...state,
      selectedContributes: state.selectedContributes->Meta3dCommonlib.ListSt.push({
        id: IdUtils.generateId(Js.Math.random),
        protocolIconBase64: protocolIconBase64,
        newName: None,
        data: contribute.data,
      }),
    }
  | SetInspectorCurrentContributeId(id) => {
      ...state,
      inspectorCurrentExtensionId: None,
      inspectorCurrentContributeId: id->Some,
    }
  | SetContributeNewName(id, newName) => {
      ...state,
      selectedContributes: state.selectedContributes->Meta3dCommonlib.ListSt.map(contribute => {
        contribute.id === id
          ? {
              ...contribute,
              newName: newName->Some,
            }
          : contribute
      }),
    }
  | SetCanvasData(canvasData) => {
      ...state,
      canvasData: canvasData,
    }
  }
}

let initialState = _createState()
