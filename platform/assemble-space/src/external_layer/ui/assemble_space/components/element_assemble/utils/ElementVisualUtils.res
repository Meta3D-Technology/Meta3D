// let _buildExtension = (data): FrontendUtils.ApAssembleStoreType.extension => {
//   id: "",
//   version: "",
//   protocolIconBase64: "",
//   protocolConfigStr: None,
//   // newName: name->Some,
//   isStart: false,
//   data,
// }

// let _loadAndBuildVisualExtension = (service: FrontendUtils.AssembleSpaceType.service, file) => {
//   service.meta3d.loadExtension(. file)->_buildExtension
// }

// let _getNewestImplement = (
//   dataArr,
//   service: FrontendUtils.AssembleSpaceType.service,
//   visualExtensionName,
//   isDebug,
// ) => {
//   Meta3dCommonlib.Contract.requireCheck(() => {
//     open Meta3dCommonlib.Contract
//     open Operators
//     test(Meta3dCommonlib.Log.buildAssertMessage(~expect=j`has data`, ~actual=j`not`), () => {
//       dataArr->Meta3dCommonlib.ArraySt.length > 0
//     })
//     test(
//       Meta3dCommonlib.Log.buildAssertMessage(
//         ~expect=j`only has one implement with different versions`,
//         ~actual=j`not`,
//       ),
//       () => {
//         dataArr
//         ->Meta3dCommonlib.ArraySt.filter(
//           ({file}: FrontendUtils.BackendCloudbaseType.implement) => {
//             let {extensionPackageData} = service.meta3d.loadExtension(. file)

//             extensionPackageData.name !== visualExtensionName
//           },
//         )
//         ->Meta3dCommonlib.ArraySt.length == 0
//       },
//     )
//   }, isDebug)

//   dataArr
//   ->Js.Array.sortInPlaceWith(
//     (
//       a: FrontendUtils.BackendCloudbaseType.implement,
//       b: FrontendUtils.BackendCloudbaseType.implement,
//     ) => {
//       Meta3d.Semver.gt(a.version, b.version) ? -1 : 1
//     },
//     _,
//   )
//   ->ignore

//   dataArr[0]
// }

// let getAndSetNewestVisualExtension = (
//   service: FrontendUtils.AssembleSpaceType.service,
//   dispatch,
//   buildAction,
//   (visualExtensionProtocolName, visualExtensionName),
//   isDebug,
// ) => {
//   // TODO support >1000
//   service.backend.getAllPublishNewestExtensions(.
//     FrontendUtils.MarketUtils.getLimitCount(),
//     0,
//     visualExtensionProtocolName,
//   )
//   ->Meta3dBsMostDefault.Most.map(_getNewestImplement(_, service, visualExtensionName, isDebug), _)
//   ->Meta3dBsMostDefault.Most.map((data: FrontendUtils.BackendCloudbaseType.implement) => {
//     _loadAndBuildVisualExtension(service, data.file)
//   }, _)
//   ->Meta3dBsMostDefault.Most.observe(extension => {
//     dispatch(buildAction(extension))
//   }, _)
//   ->Js.Promise.catch(e => {
//     service.console.errorWithExn(. e->FrontendUtils.Error.promiseErrorToExn, None)->Obj.magic
//   }, _)
// }

let _removeElementContribute = selectedContributes => {
  selectedContributes->Meta3dCommonlib.ArraySt.filter((
    {data}: FrontendUtils.ApAssembleStoreType.contribute,
  ) => {
    data.contributePackageData.protocol.name !==
      ElementContributeUtils.getElementContributeProtocolName()
  })
}

let generateApp = (
  service,
  ((selectPackages, allPackagesStoredInApp), selectedExtensions, selectedContributes),
  selectedElements,
  elementContribute,
) => {
  AppUtils.generateApp(
    service,
    (selectPackages, allPackagesStoredInApp),
    // selectedExtensions->Meta3dCommonlib.ArraySt.push(runVisualExtension),
    // selectedExtensions,
    selectedContributes->_removeElementContribute->Meta3dCommonlib.ArraySt.push(elementContribute),
    selectedElements,
    Js.Nullable.null,
  )
}

// let getRunElementVisualAppName = () => {
//   "meta3d_run_element_visual"
// }

// let getUIExtensionName = () => "meta3d-ui"

let getEditorWholePackageProtocolName = () => "meta3d-editor-whole-protocol"

// let getUIExtensionProtocolName = () => "meta3d-ui-protocol"

// let _getUIProtocolVersion = () => ">=0.12.0"

// let _getEventProtocolVersion = () => ">=0.12.0"

// let generateElementContribute = (service, account, fileStr) => {
//   _generateElementContribute(
//     service,
//     ElementContributeUtils.getElementContributeProtocolName(),
//     FrontendUtils.ElementUtils.getElementContributeProtocolVersion(),
//     ElementContributeUtils.getElementContributeName(),
//     FrontendUtils.ElementUtils. getElementContributeVersion(),
//     account,
//     ElementContributeUtils.getElementContributeName(),
//     ElementContributeUtils.getElementContributeRepoLink(),
//     ElementContributeUtils.getElementContributeDescription(),
//     fileStr,
//   )
// }

// let FrontendUtils.ElementUtils. getElementContributeVersion = () => FrontendUtils.VersionConfig.getPlatformVersion()

// let buildContribute = (
//   ~id="",
//   ~version,
//   ~data,
//   (),
// ): FrontendUtils.ApAssembleStoreType.contribute => {
//   id,
//   version,
//   protocolIconBase64: "",
//   protocolConfigStr: None,
//   data,
// }

let generateElementContribute = (
  service: FrontendUtils.AssembleSpaceType.service,
  account,
  fileStr,
) => {
  service.meta3d.generateContribute(.
    (
      {
        name: ElementContributeUtils.getElementContributeName(),
        version: FrontendUtils.ElementUtils.getElementContributeVersion(),
        account,
        protocol: {
          name: ElementContributeUtils.getElementContributeProtocolName(),
          version: FrontendUtils.ElementUtils.getElementContributeProtocolVersion(),
        },
        displayName: ElementContributeUtils.getElementContributeName(),
        repoLink: ElementContributeUtils.getElementContributeRepoLink(),
        description: ElementContributeUtils.getElementContributeDescription(),
        dependentPackageStoredInAppProtocolNameMap: Meta3dCommonlib.ImmutableHashMap.createEmpty(),
        dependentBlockProtocolNameMap: Meta3dCommonlib.ImmutableHashMap.createEmpty(),
      }: Meta3d.ExtensionFileType.contributePackageData
    ),
    fileStr,
  )
  ->service.meta3d.loadContribute(. _)
  ->FrontendUtils.ElementUtils.buildContribute(
    ~version=FrontendUtils.ElementUtils.getElementContributeVersion(),
    ~data=_,
    (),
  )
}

let cancelAppLoop = (
  service: FrontendUtils.AssembleSpaceType.service,
  loopFrameID: React.ref<option<int>>,
) => {
  switch loopFrameID.current {
  | Some(id) => service.other.cancelAnimationFrame(id)
  | None => ()
  }
}

let buildDefaultInputNameForInputFileStr = uiControlProtocolName => {
  uiControlProtocolName
  ->Js.String.replace("-protocol", "", _)
  ->Js.String.replace("-ui-control-", "-input-", _)
  ->Js.String.replaceByRe(%re("/-/g"), "_", _)
}

let isForInputFileStr = (inputName, uiControlProtocolName) => {
  uiControlProtocolName->buildDefaultInputNameForInputFileStr == inputName
}

let buildEmptyAddGeneratedContributeFunc = () => {
  (allContributeDataArr, _) => allContributeDataArr
}

let buildDefaultActionNameForActionFileStr = (uiControlProtocolName, eventName) => {
  uiControlProtocolName
  ->Js.String.replace("-protocol", {j`-${eventName}`}, _)
  ->Js.String.replace("-ui-control-", "-action-", _)
  ->Js.String.replaceByRe(%re("/-/g"), "_", _)
}

let isForActionFileStr = (actionName, uiControlProtocolName, eventName) => {
  buildDefaultActionNameForActionFileStr(uiControlProtocolName, eventName) == actionName
}
