let getElementContributeProtocolName = () => "meta3d-element-assemble-element-protocol"

let getElementContributeProtocolVersion = () => {
  j`^${FrontendUtils.VersionConfig.getPlatformVersion()}`
}

let getElementContributeRepoLink = () => ""

let getElementContributeDescription = () => "element contribute"

let buildElementContributeFileStr = (
  service,
  elementContributeName,
  selectedUIControls,
  selectedUIControlInspectorData,
  // elementStateFields,
) => {
  ElementMRUtils.buildElementMR(
    service,
    elementContributeName,
    selectedUIControls->Meta3dCommonlib.ListSt.toArray,
    selectedUIControlInspectorData->Meta3dCommonlib.ListSt.toArray,
    // elementStateFields,
  )->ElementMRUtils.generateElementContributeFileStr(service, _)
}
