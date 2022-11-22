open FrontendUtils.ApAssembleStoreType

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
    isShowApInspector: false,
    apInspectorData: {
      isDebug: true,
      clearColor: (1., 1., 1., 1.),
      skinName: None,
    },
  }
}

let _setApIControlInspectorData = (state, setFunc) => {
  {
    ...state,
    apInspectorData: setFunc(state.apInspectorData),
  }
}

let reducer = (state, action) => {
  switch action {
  | Reset => _createState()
  | SelectExtension(protocolIconBase64, protocolConfigStr, extension) => {
      ...state,
      selectedExtensions: state.selectedExtensions->Meta3dCommonlib.ListSt.push({
        id: IdUtils.generateId(Js.Math.random),
        protocolIconBase64: protocolIconBase64,
        protocolConfigStr: protocolConfigStr,
        newName: None,
        isStart: false,
        version: extension.version,
        data: extension.data,
      }),
      isShowApInspector: false,
    }
  | SetInspectorCurrentExtensionId(id) => {
      ...state,
      inspectorCurrentExtensionId: id->Some,
      inspectorCurrentContributeId: None,
      isShowApInspector: false,
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
  | SelectContribute(protocolIconBase64, protocolConfigStr, contribute) => {
      ...state,
      selectedContributes: state.selectedContributes->Meta3dCommonlib.ListSt.push({
        id: IdUtils.generateId(Js.Math.random),
        protocolIconBase64: protocolIconBase64,
        protocolConfigStr: protocolConfigStr,
        newName: None,
        version: contribute.version,
        data: contribute.data,
      }),
      isShowApInspector: false,
    }
  | SetInspectorCurrentContributeId(id) => {
      ...state,
      inspectorCurrentExtensionId: None,
      inspectorCurrentContributeId: id->Some,
      isShowApInspector: false,
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
  | ShowApInspector => {
      ...state,
      isShowApInspector: true,
    }
  | SetIsDebug(isDebug) =>
    _setApIControlInspectorData(state, apInspectorData => {
      ...apInspectorData,
      isDebug: isDebug,
    })
  | SetClearColor(clearColor) =>
    _setApIControlInspectorData(state, apInspectorData => {
      ...apInspectorData,
      clearColor: clearColor,
    })
  | SetSkinName(skinName) =>
    _setApIControlInspectorData(state, apInspectorData => {
      ...apInspectorData,
      skinName: skinName,
    })
  }
}

let initialState = _createState()
