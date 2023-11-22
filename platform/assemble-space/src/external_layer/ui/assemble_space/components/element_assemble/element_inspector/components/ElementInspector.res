open FrontendUtils.Antd
%%raw("import 'antd/dist/antd.css'")
open FrontendUtils.AssembleSpaceType

module Method = {
  let getCurrentSelectedUIControlInspectorData = (
    inspectorCurrentUIControlId,
    selectedUIControlInspectorData: FrontendUtils.ElementAssembleStoreType.selectedUIControlInspectorData,
  ) => {
    inspectorCurrentUIControlId->Meta3dCommonlib.OptionSt.bind(inspectorCurrentUIControlId =>
      HierachyUtils.findSelectedUIControlData(
        None,
        (
          (data: FrontendUtils.ElementAssembleStoreType.uiControlInspectorData) => data.id,
          (data: FrontendUtils.ElementAssembleStoreType.uiControlInspectorData) => data.children,
        ),
        selectedUIControlInspectorData,
        inspectorCurrentUIControlId,
      )
    )
  }

  let getCurrentSelectedUIControl = (
    inspectorCurrentUIControlId,
    selectedUIControls: FrontendUtils.ElementAssembleStoreType.selectedUIControls,
  ) => {
    inspectorCurrentUIControlId->Meta3dCommonlib.OptionSt.bind(inspectorCurrentUIControlId =>
      HierachyUtils.findSelectedUIControlData(
        None,
        (
          (data: FrontendUtils.ElementAssembleStoreType.uiControl) => data.id,
          (data: FrontendUtils.ElementAssembleStoreType.uiControl) => data.children,
        ),
        selectedUIControls,
        inspectorCurrentUIControlId,
      )
    )
  }

  let useSelector = ({elementAssembleState}: FrontendUtils.AssembleSpaceStoreType.state) => {
    let {
      inspectorCurrentUIControlId,
      selectedUIControls,
      selectedUIControlInspectorData,
    } = elementAssembleState

    (inspectorCurrentUIControlId, selectedUIControls, selectedUIControlInspectorData)
  }
}

@react.component
let make = (~service: service) => {
  let (
    inspectorCurrentUIControlId,
    selectedUIControls,
    selectedUIControlInspectorData,
  ) = service.react.useSelector(. Method.useSelector)

  switch (
    Method.getCurrentSelectedUIControlInspectorData(
      inspectorCurrentUIControlId,
      selectedUIControlInspectorData,
    ),
    Method.getCurrentSelectedUIControl(inspectorCurrentUIControlId, selectedUIControls),
  ) {
  | (Some(currentSelectedUIControlInspectorData), Some(currentSelectedUIControl)) =>
    <UIControlInspector service currentSelectedUIControl currentSelectedUIControlInspectorData />
  | _ => React.null
  }
}
