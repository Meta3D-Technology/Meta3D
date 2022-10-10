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

let getAndSetVisualExtension = (
  service: FrontendUtils.AssembleSpaceType.service,
  dispatch,
  buildAction,
  (
    visualExtensionProtocolName,
    visualExtensionProtocolVersion,
    visualExtensionName,
    visualExtensionVersion,
  ),
) => {
  service.backend.getAllPublishExtensions(.
    visualExtensionProtocolName,
    visualExtensionProtocolVersion,
  )
  ->Meta3dBsMost.Most.map(dataArr => {
    (
      dataArr->Meta3dCommonlib.ArraySt.filter((
        {version}: FrontendUtils.BackendCloudbaseType.implement,
      ) => {
        version == visualExtensionVersion
      })
    )[0]
  }, _)
  ->Meta3dBsMost.Most.map((data: FrontendUtils.BackendCloudbaseType.implement) => {
    _loadAndBuildVisualExtension(service, data.file, visualExtensionName)
  }, _)
  ->Meta3dBsMost.Most.observe(extension => {
    dispatch(buildAction(extension))
  }, _)
  ->Js.Promise.catch(e => {
    service.console.error(.
      e->Obj.magic->Js.Exn.message->Meta3dCommonlib.OptionSt.getExn->Obj.magic,
      None,
    )->Obj.magic
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
