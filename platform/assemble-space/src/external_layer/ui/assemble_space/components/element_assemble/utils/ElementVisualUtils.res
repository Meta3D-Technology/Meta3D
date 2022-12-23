let _buildExtension = (name, data): FrontendUtils.ApAssembleStoreType.extension => {
  id: "",
  version: "",
  protocolIconBase64: "",
  protocolConfigStr: None,
  newName: name->Some,
  isStart: false,
  data,
}

let _loadAndBuildVisualExtension = (
  service: FrontendUtils.AssembleSpaceType.service,
  file,
  visualExtensionName,
) => {
  service.meta3d.loadExtension(. file)->_buildExtension(visualExtensionName, _)
}

let _getNewestImplement = (
  dataArr,
  service: FrontendUtils.AssembleSpaceType.service,
  visualExtensionName,
  isDebug,
) => {
  Meta3dCommonlib.Contract.requireCheck(() => {
    open Meta3dCommonlib.Contract
    open Operators
    test(Meta3dCommonlib.Log.buildAssertMessage(~expect=j`has data`, ~actual=j`not`), () => {
      dataArr->Meta3dCommonlib.ArraySt.length > 0
    })
    test(
      Meta3dCommonlib.Log.buildAssertMessage(
        ~expect=j`only has one implement with different versions`,
        ~actual=j`not`,
      ),
      () => {
        dataArr
        ->Meta3dCommonlib.ArraySt.filter(
          ({file}: FrontendUtils.BackendCloudbaseType.implement) => {
            let {extensionPackageData} = service.meta3d.loadExtension(. file)

            extensionPackageData.name !== visualExtensionName
          },
        )
        ->Meta3dCommonlib.ArraySt.length == 0
      },
    )
  }, isDebug)

  dataArr
  ->Js.Array.sortInPlaceWith(
    (
      a: FrontendUtils.BackendCloudbaseType.implement,
      b: FrontendUtils.BackendCloudbaseType.implement,
    ) => {
      Meta3d.Semver.gt(a.version, b.version) ? -1 : 1
    },
    _,
  )
  ->ignore

  dataArr[0]
}

let getAndSetNewestVisualExtension = (
  service: FrontendUtils.AssembleSpaceType.service,
  dispatch,
  buildAction,
  (visualExtensionProtocolName, visualExtensionName),
  isDebug,
) => {
  service.backend.getAllPublishNewestExtensions(. visualExtensionProtocolName)
  ->Meta3dBsMost.Most.map(_getNewestImplement(_, service, visualExtensionName, isDebug), _)
  ->Meta3dBsMost.Most.map((data: FrontendUtils.BackendCloudbaseType.implement) => {
    _loadAndBuildVisualExtension(service, data.file, visualExtensionName)
  }, _)
  ->Meta3dBsMost.Most.observe(extension => {
    dispatch(buildAction(extension))
  }, _)
  ->Js.Promise.catch(e => {
    service.console.errorWithExn(. e->FrontendUtils.Error.promiseErrorToExn, None)->Obj.magic
  }, _)
}

let generateApp = (
  service,
  (selectedPackages, selectedExtensions, selectedContributes),
  (runVisualExtension, elementContribute),
) => {
  AppUtils.generateApp(
    service,
    selectedPackages,
    selectedExtensions->Meta3dCommonlib.ArraySt.push(runVisualExtension),
    selectedContributes->Meta3dCommonlib.ArraySt.push(elementContribute),
    Js.Nullable.null,
  )
}

// let getRunElementVisualAppName = () => {
//   "meta3d_run_element_visual"
// }

// let getUIExtensionName = () => "meta3d-ui"

let getUIExtensionProtocolName = () => "meta3d-ui-protocol"

let _getUIProtocolVersion = () => "^0.8.0"

let _getEventProtocolVersion = () => "^0.8.0"

let generateElementContributeBinaryFile = (
  service: FrontendUtils.AssembleSpaceType.service,
  name,
  protocolName,
  protocolVersion,
  fileStr,
) => {
  service.meta3d.generateContribute(.
    (
      {
        name,
        protocol: {
          name: protocolName,
          version: protocolVersion,
        },
        dependentExtensionNameMap: Meta3dCommonlib.ImmutableHashMap.createEmpty()
        ->Meta3dCommonlib.ImmutableHashMap.set(
          "meta3dUIExtensionName",
          (
            {
              protocolName: getUIExtensionProtocolName(),
              protocolVersion: _getUIProtocolVersion(),
            }: Meta3d.ExtensionFileType.dependentData
          ),
        )
        ->Meta3dCommonlib.ImmutableHashMap.set(
          "meta3dEventExtensionName",
          (
            {
              protocolName: "meta3d-event-protocol",
              protocolVersion: _getEventProtocolVersion(),
            }: Meta3d.ExtensionFileType.dependentData
          ),
        ),
        dependentContributeNameMap: Meta3dCommonlib.ImmutableHashMap.createEmpty(),
      }: Meta3d.ExtensionFileType.contributePackageData
    ),
    fileStr,
  )
}
