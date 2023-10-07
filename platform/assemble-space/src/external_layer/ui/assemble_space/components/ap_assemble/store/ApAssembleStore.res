open FrontendUtils.ApAssembleStoreType

let _createState = () => {
  {
    selectedPackages: list{},
    selectedExtensions: list{},
    selectedContributes: list{},
    inspectorCurrentExtensionId: None,
    inspectorCurrentContributeId: None,
    inspectorCurrentPackageId: None,
    isShowApInspector: false,
    apInspectorData: {
      isDebug: true,
      clearColor: (1., 1., 1., 1.),
      skinName: None,
    },
    isPassDependencyGraphCheck: false,
    storedPackageIdsInApp: list{},
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
  inspectorCurrentPackageId: None,
  isShowApInspector: false,
}

let _unstartAllSelectedExtensions = selectedExtensions => {
  selectedExtensions->Meta3dCommonlib.ListSt.map(extension => {
    {
      ...extension,
      isStart: false,
    }
  })
}

let reducer = (state, action) => {
  switch action {
  | Reset => _createState()
  | ResetWhenSwitch => state->_resetInspector
  | SelectPackage(package) => {
      ...state,
      selectedPackages: state.selectedPackages->Meta3dCommonlib.ListSt.push(
        //   {
        //   ...package,
        //   id: FrontendUtils.IdUtils.generateId(Js.Math.random),
        // }
        package,
      ),
    }
  | SelectExtension(protocolIconBase64, protocolConfigStr, extension) => {
      ...state,
      selectedExtensions: state.selectedExtensions->Meta3dCommonlib.ListSt.push({
        id: FrontendUtils.IdUtils.generateId(Js.Math.random),
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
    }
  | StartExtension(id) => {
      ...state,
      selectedExtensions: state.selectedExtensions
      ->_unstartAllSelectedExtensions
      ->Meta3dCommonlib.ListSt.map(extension => {
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
      selectedExtensions: state.selectedExtensions->_unstartAllSelectedExtensions,
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
        id: FrontendUtils.IdUtils.generateId(Js.Math.random),
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
      inspectorCurrentContributeId: id->Some,
    }
  | SetInspectorCurrentPackageId(id) =>
    let state = state->_resetInspector

    {
      ...state,
      inspectorCurrentPackageId: id->Some,
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
  | UpdateSelectedExtension(id, extensionFuncData) => {
      ...state,
      selectedExtensions: state.selectedExtensions->Meta3dCommonlib.ListSt.map(extension => {
        extension.id === id
          ? {
              ...extension,
              data: {
                ...extension.data,
                extensionFuncData,
              },
            }
          : extension
      }),
    }
  | UpdateSelectedContribute(id, contributeFuncData) => {
      ...state,
      selectedContributes: state.selectedContributes->Meta3dCommonlib.ListSt.map(contribute => {
        contribute.id === id
          ? {
              ...contribute,
              data: {
                ...contribute.data,
                contributeFuncData,
              },
            }
          : contribute
      }),
    }
  | UpdateSelectedPackage(id, packageBinaryFile) => {
      ...state,
      selectedPackages: state.selectedPackages->Meta3dCommonlib.ListSt.map(package => {
        package.id === id
          ? {
              ...package,
              binaryFile: packageBinaryFile,
            }
          : package
      }),
    }
  | MarkIsPassDependencyGraphCheck(isPass) => {
      ...state,
      isPassDependencyGraphCheck: isPass,
    }
  | StorePackageInApp(id) => {
      ...state,
      storedPackageIdsInApp: state.storedPackageIdsInApp->Meta3dCommonlib.ListSt.push(id),
    }
  | UnStorePackageInApp(id) => {
      ...state,
      storedPackageIdsInApp: state.storedPackageIdsInApp->Meta3dCommonlib.ListSt.remove(id),
    }
  | BatchStorePackagesInApp(ids) => {
      ...state,
      storedPackageIdsInApp: state.storedPackageIdsInApp->Meta3dCommonlib.ListSt.concat(ids),
    }
  | UpdateSelectedPackagesAndExtensionsAndContributes(
      selectedPackages,
      selectedExtensions,
      selectedContributes,
    ) => {
      ...state,
      selectedPackages,
      selectedExtensions,
      selectedContributes,
    }
  }
}

let initialState = _createState()
