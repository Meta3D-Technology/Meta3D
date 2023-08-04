open FrontendUtils.PackageAssembleStoreType

let _createState = () => {
  {
    selectedPackages: list{},
    selectedExtensions: list{},
    selectedContributes: list{},
    inspectorCurrentExtensionId: None,
    inspectorCurrentContributeId: None,
    // canvasData: {
    //   width: 0,
    //   height: 0,
    // },
    // isShowApInspector: false,
    // apInspectorData: {
    //   isDebug: true,
    //   clearColor: (1., 1., 1., 1.),
    //   skinName: None,
    // },
  }
}

// let _setApIControlInspectorData = (state, setFunc) => {
//   {
//     ...state,
//     apInspectorData: setFunc(state.apInspectorData),
//   }
// }

let _resetInspector = state => {
  ...state,
  inspectorCurrentExtensionId: None,
  inspectorCurrentContributeId: None,
}

let reducer = (state, action) => {
  switch action {
  | Reset => _createState()
  | ResetWhenSwitch => state->_resetInspector
  // | SelectPackage(package) => {
  //     ...state,
  //     selectedPackages: state.selectedPackages->Meta3dCommonlib.ListSt.push({
  //       id: IdUtils.generateId(Js.Math.random),
  //       protocol: {
  //         name: package.protocol.name,
  //         version: package.protocol.version,
  //       },
  //       entryExtensionName: package.entryExtensionName,
  //       binaryFile: package.binaryFile,
  //     }),
  //   }
  | SelectPackage(package) => {
      ...state,
      selectedPackages: state.selectedPackages->Meta3dCommonlib.ListSt.push({
        ...package,
        id: IdUtils.generateId(Js.Math.random),
      }),
    }
  | SelectExtension(
      protocolIconBase64,
      protocolDisplayName,
      protocolRepoLink,
      protocolDescription,
      protocolConfigStr,
      extension,
    ) => {
      ...state,
      selectedExtensions: state.selectedExtensions->Meta3dCommonlib.ListSt.push({
        id: IdUtils.generateId(Js.Math.random),
        protocolName: extension.protocolName,
        protocolVersion: extension.protocolVersion,
        protocolIconBase64,
        protocolDisplayName,
        protocolRepoLink,
        protocolDescription,
        protocolConfigStr,
        // newName: None,
        isEntry: false,
        version: extension.version,
        data: extension.data,
      }),
      // isShowApInspector: false,
    }
  | SetInspectorCurrentExtensionId(id) => {
      ...state,
      inspectorCurrentExtensionId: id->Some,
      inspectorCurrentContributeId: None,
      // isShowApInspector: false,
    }
  | MarkEntryExtension(id) => {
      ...state,
      selectedExtensions: state.selectedExtensions->Meta3dCommonlib.ListSt.map(extension => {
        extension.id === id
          ? {
              ...extension,
              isEntry: true,
            }
          : extension
      }),
    }
  | UnMarkEntryExtension(id) => {
      ...state,
      selectedExtensions: state.selectedExtensions->Meta3dCommonlib.ListSt.map(extension => {
        extension.id === id
          ? {
              ...extension,
              isEntry: false,
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
      // isShowApInspector: false,
    }
  | SetInspectorCurrentContributeId(id) => {
      ...state,
      inspectorCurrentExtensionId: None,
      inspectorCurrentContributeId: id->Some,
      // isShowApInspector: false,
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
  }
}

let initialState = _createState()
