let getElementContributeProtocolName = () => "meta3d-element-assemble-element-protocol"

let getElementContributeProtocolVersion = () =>"0.6.0"

let buildElementContributeFileStr = (
  service,
  elementContributeName,
  selectedUIControls,
  selectedUIControlInspectorData,
  (elementStateFields, reducers),
) => {
  ElementMRUtils.buildElementMR(
    service,
    elementContributeName,
    selectedUIControls->Meta3dCommonlib.ListSt.toArray,
    selectedUIControlInspectorData->Meta3dCommonlib.ListSt.toArray,
    (elementStateFields, reducers),
  )->ElementMRUtils.generateElementContributeFileStr(service, _)
}
