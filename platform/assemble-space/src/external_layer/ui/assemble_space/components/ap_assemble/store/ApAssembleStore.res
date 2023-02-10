open FrontendUtils.ApAssembleStoreType

let _createState = () => {
  {
    selectedPackages: list{},
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

let _resetInspector = state => {
  ...state,
  inspectorCurrentExtensionId: None,
  inspectorCurrentContributeId: None,
  isShowApInspector: false,
}

let reducer = (state, action) => {
  switch action {
  | Reset => _createState()
  | SelectPackage(package) => {
      ...state,
      selectedPackages: state.selectedPackages->Meta3dCommonlib.ListSt.push({
        ...package,
        id: IdUtils.generateId(Js.Math.random),
      }),
    }
  | SelectExtension(protocolIconBase64, protocolConfigStr, extension) => {
      ...state,
      selectedExtensions: state.selectedExtensions->Meta3dCommonlib.ListSt.push({
        id: IdUtils.generateId(Js.Math.random),
        protocolIconBase64,
        protocolConfigStr,
        // newName: None,
        isStart: false,
        version: extension.version,
        data: extension.data,
      }),
      isShowApInspector: false,
    }
  | SetInspectorCurrentExtensionId(id) =>
    let state = state->_resetInspector

    {
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
  // | SetExtensionNewName(id, newName) => {
  //     ...state,
  //     selectedExtensions: state.selectedExtensions->Meta3dCommonlib.ListSt.map(extension => {
  //       extension.id === id
  //         ? {
  //             ...extension,
  //             newName: newName->Some,
  //           }
  //         : extension
  //     }),
  //   }
  | SelectContribute(protocolIconBase64, protocolConfigStr, contribute) => {
      ...state,
      selectedContributes: state.selectedContributes->Meta3dCommonlib.ListSt.push({
        id: IdUtils.generateId(Js.Math.random),
        protocolIconBase64,
        protocolConfigStr,
        // newName: None,
        version: contribute.version,
        data: contribute.data,
      }),
      isShowApInspector: false,
    }
  | SetInspectorCurrentContributeId(id) =>
    let state = state->_resetInspector

    {
      ...state,
      inspectorCurrentExtensionId: None,
      inspectorCurrentContributeId: id->Some,
    }
  // | SetContributeNewName(id, newName) => {
  //     ...state,
  //     selectedContributes: state.selectedContributes->Meta3dCommonlib.ListSt.map(contribute => {
  //       contribute.id === id
  //         ? {
  //             ...contribute,
  //             newName: newName->Some,
  //           }
  //         : contribute
  //     }),
  //   }
  | SetCanvasData(canvasData) => {
      ...state,
      canvasData,
    }
  | ShowApInspector =>
    let state = state->_resetInspector

    {
      ...state,
      isShowApInspector: true,
    }
  | SetIsDebug(isDebug) =>
    _setApIControlInspectorData(state, apInspectorData => {
      ...apInspectorData,
      isDebug,
    })
  | SetClearColor(clearColor) =>
    _setApIControlInspectorData(state, apInspectorData => {
      ...apInspectorData,
      clearColor,
    })
  | SetSkinName(skinName) =>
    _setApIControlInspectorData(state, apInspectorData => {
      ...apInspectorData,
      skinName,
    })
  }
}

let initialState = _createState()
