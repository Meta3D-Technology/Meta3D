// let _buildExtension = (data): ApAssembleStoreType.extension => {
//   id: "",
//   version: "",
//   protocolIconBase64: "",
//   protocolConfigStr: None,
//   // newName: name->Some,
//   isStart: false,
//   data,
// }

// let _loadAndBuildVisualExtension = (service: AssembleSpaceType.service, file) => {
//   service.meta3d.loadExtension(. file)->_buildExtension
// }

// let _getNewestImplement = (
//   dataArr,
//   service: AssembleSpaceType.service,
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
//           ({file}: BackendCloudbaseType.implement) => {
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
//       a: BackendCloudbaseType.implement,
//       b: BackendCloudbaseType.implement,
//     ) => {
//       Meta3d.Semver.gt(a.version, b.version) ? -1 : 1
//     },
//     _,
//   )
//   ->ignore

//   dataArr[0]
// }

// let getAndSetNewestVisualExtension = (
//   service: AssembleSpaceType.service,
//   dispatch,
//   buildAction,
//   (visualExtensionProtocolName, visualExtensionName),
//   isDebug,
// ) => {
//   // TODO support >1000
//   service.backend.getAllPublishNewestExtensions(.
//     MarketUtils.getLimitCount(),
//     0,
//     visualExtensionProtocolName,
//   )
//   ->Meta3dBsMostDefault.Most.map(_getNewestImplement(_, service, visualExtensionName, isDebug), _)
//   ->Meta3dBsMostDefault.Most.map((data: BackendCloudbaseType.implement) => {
//     _loadAndBuildVisualExtension(service, data.file)
//   }, _)
//   ->Meta3dBsMostDefault.Most.observe(extension => {
//     dispatch(buildAction(extension))
//   }, _)
//   ->Js.Promise.catch(e => {
//     service.console.errorWithExn(. e->Error.promiseErrorToExn, None)->Obj.magic
//   }, _)
// }

let _removeElementContribute = selectedContributes => {
  selectedContributes->Meta3dCommonlib.ArraySt.filter(({data}: ApAssembleStoreType.contribute) => {
    data.contributePackageData.protocol.name !==
      ElementContributeUtils.getElementContributeProtocolName()
  })
}

let generateApp = (
  service,
  ((selectPackages, allPackagesStoredInApp), selectedExtensions, selectedContributes),
  selectedElements,
  // customData,
  elementContribute,
) => {
  AppUtils.generateApp(
    service,
    (selectPackages, allPackagesStoredInApp),
    // selectedExtensions->Meta3dCommonlib.ArraySt.push(runVisualExtension),
    // selectedExtensions,
    selectedContributes->_removeElementContribute->Meta3dCommonlib.ArraySt.push(elementContribute),
    selectedElements,
    // customData,
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
//     ElementUtils.getElementContributeProtocolVersion(),
//     ElementContributeUtils.getElementContributeName(),
//     ElementUtils. getElementContributeVersion(),
//     account,
//     ElementContributeUtils.getElementContributeName(),
//     ElementContributeUtils.getElementContributeRepoLink(),
//     ElementContributeUtils.getElementContributeDescription(),
//     fileStr,
//   )
// }

// let ElementUtils. getElementContributeVersion = () => VersionConfig.getPlatformVersion()

// let buildContribute = (
//   ~id="",
//   ~version,
//   ~data,
//   (),
// ): ApAssembleStoreType.contribute => {
//   id,
//   version,
//   protocolIconBase64: "",
//   protocolConfigStr: None,
//   data,
// }

let generateElementContribute = (service: AssembleSpaceType.service, account, fileStr) => {
  service.meta3d.generateContribute(.
    (
      {
        name: ElementContributeUtils.getElementContributeName(),
        version: ElementUtils.getElementContributeVersion(),
        account,
        protocol: {
          name: ElementContributeUtils.getElementContributeProtocolName(),
          version: ElementUtils.getElementContributeProtocolVersion(),
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
  ->ElementUtils.buildContribute(~version=ElementUtils.getElementContributeVersion(), ~data=_, ())
}

let cancelAppLoop = (service: AssembleSpaceType.service, loopFrameID: React.ref<option<int>>) => {
  switch loopFrameID.current {
  | Some(id) => service.other.cancelAnimationFrame(id)
  | None => ()
  }
}

// let buildDefaultInputNameForCustomInput = (random, uiControlProtocolName) => {
//   uiControlProtocolName
//   ->Js.String.replace("-protocol", "", _)
//   ->Js.String.replace(
//     "-ui-control-",
//     {j`-input-custom-${IdUtils.generateId(random)}-`},
//     _,
//   )
//   ->Js.String.replaceByRe(%re("/-/g"), "_", _)
// }

let isCustomInput = inputProtocolName => {
  inputProtocolName->Js.String.includes(ElementUtils.buildCustomInputProtocolNamePrefix(), _)
}

let buildEmptyAddGeneratedContributeFunc = () => {
  (allContributeDataArr, _) => allContributeDataArr
}

// let buildDefaultActionNameForCustomAction = (random, uiControlProtocolName, eventName) => {
//   uiControlProtocolName
//   ->Js.String.replace("-protocol", "", _)
//   ->Js.String.replace(
//     "-ui-control-",
//     {j`-action-custom-${eventName}-${IdUtils.generateId(random)}-`},
//     _,
//   )
//   ->Js.String.replaceByRe(%re("/-/g"), "_", _)
// }

// let isCustomAction = (actionProtocolName, eventName) => {
//   actionProtocolName->Js.String.includes(
//     {j`${ElementUtils.buildCustomInputProtocolNamePrefix()}${eventName}-`},
//     _,
//   )
// }
let isCustomAction = actionProtocolName => {
  actionProtocolName->Js.String.includes(
    {j`${ElementUtils.buildCustomActionProtocolNamePrefix()}`},
    _,
  )
}

let addGeneratedCustoms = (
  service: AssembleSpaceType.service,
  selectedContributes,
  account,
  customInputs,
  customActions,
) => {
  selectedContributes
  ->ElementUtils.addGeneratedInputContributesForElementAssemble(
    (service.meta3d.generateContribute, service.meta3d.loadContribute),
    _,
    account,
    customInputs,
  )
  ->ElementUtils.addGeneratedActionContributesForElementAssemble(
    (service.meta3d.generateContribute, service.meta3d.loadContribute),
    _,
    account,
    customActions,
  )
}
