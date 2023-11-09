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
  elementContribute,
) => {
  AppUtils.generateApp(
    service,
    (selectPackages, allPackagesStoredInApp),
    // selectedExtensions->Meta3dCommonlib.ArraySt.push(runVisualExtension),
    selectedExtensions,
    selectedContributes->_removeElementContribute->Meta3dCommonlib.ArraySt.push(elementContribute),
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

let generateElementContributeBinaryFile = (
  service: FrontendUtils.AssembleSpaceType.service,
  name,
  version,
  account,
  protocolName,
  protocolVersion,
  displayName,
  repoLink,
  description,
  fileStr,
) => {
  service.meta3d.generateContribute(.
    (
      {
        name,
        version,
        account,
        protocol: {
          name: protocolName,
          version: protocolVersion,
        },
        displayName,
        repoLink,
        description,
        dependentPackageStoredInAppProtocolNameMap: Meta3dCommonlib.ImmutableHashMap.createEmpty(),
        dependentBlockProtocolNameMap: Meta3dCommonlib.ImmutableHashMap.createEmpty(),
        // ->Meta3dCommonlib.ImmutableHashMap.set(
        //   getUIExtensionProtocolName(),
        //   _getUIProtocolVersion(),
        // )
        // ->Meta3dCommonlib.ImmutableHashMap.set("meta3d-event-protocol", _getEventProtocolVersion()),
      }: Meta3d.ExtensionFileType.contributePackageData
    ),
    fileStr,
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
