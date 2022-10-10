let _buildExtension = (name, data): FrontendUtils.ApViewStoreType.extension => {
  id: "",
  protocolIconBase64: "",
  newName: name->Some,
  isStart: false,
  data: data,
}

let _loadAndBuildVisualExtension = (
  service: FrontendUtils.AssembleSpaceType.service,
  file,
  visualExtensionName,
) => {
  service.meta3d.loadExtension(. file)->_buildExtension(visualExtensionName, _)
}

let _getNewestImplement = dataArr => {
  // TODO add contract
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
) => {
  service.backend.getAllPublishNewestExtensions(. visualExtensionProtocolName)
  ->Meta3dBsMost.Most.map(_getNewestImplement, _)
  ->Meta3dBsMost.Most.map((data: FrontendUtils.BackendCloudbaseType.implement) => {
    _loadAndBuildVisualExtension(service, data.file, visualExtensionName)
  }, _)
  ->Meta3dBsMost.Most.observe(extension => {
    dispatch(buildAction(extension))
  }, _)
  ->Js.Promise.catch(e => {
    service.console.error(. e->Obj.magic, None)->Obj.magic
  }, _)
}

let generateApp = (
  service,
  (selectedExtensions, selectedContributes),
  (visualExtension, elementContribute),
) => {
  AppUtils.generateApp(
    service,
    selectedExtensions->Meta3dCommonlib.ArraySt.push(visualExtension),
    selectedContributes->Meta3dCommonlib.ArraySt.push(elementContribute),
  )
}

// let getRunUIVisualAppName = () => {
//   "meta3d_run_ui_visual"
// }
