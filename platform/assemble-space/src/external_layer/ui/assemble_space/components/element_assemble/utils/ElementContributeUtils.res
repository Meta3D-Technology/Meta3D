let getElementContributeName = () => "meta3d-element-assemble-element"

let getElementContributeProtocolName = FrontendUtils.ElementUtils.getElementContributeProtocolName

// let getElementContributeProtocolVersion = () => {
//   j`^${FrontendUtils.VersionConfig.getPlatformVersion()}`
// }

let getElementContributeRepoLink = () => ""

let getElementContributeDescription = () => "element contribute"

let buildElementContributeFileStr = (
  service,
  // elementContributeName,
  selectedUIControls,
  selectedUIControlInspectorData,
) => {
  // elementStateFields,

  ElementMRUtils.buildElementMR(
    service,
    // elementContributeName,
    getElementContributeName(),
    selectedUIControls->Meta3dCommonlib.ListSt.toArray,
    selectedUIControlInspectorData->Meta3dCommonlib.ListSt.toArray,
    // elementStateFields,
  )->ElementMRUtils.generateElementContributeFileStr(service, _)
}
