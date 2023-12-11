open Antd
%%raw("import 'antd/dist/antd.css'")
open AssembleSpaceType

module Method = {
  let getCurrentSelectedUIControlInspectorData = (
    inspectorCurrentUIControlId,
    selectedUIControlInspectorData: ElementAssembleStoreType.selectedUIControlInspectorData,
  ) => {
    inspectorCurrentUIControlId->Meta3dCommonlib.OptionSt.bind(inspectorCurrentUIControlId =>
      HierachyUtils.findSelectedUIControlData(
        None,
        (
          (data: ElementAssembleStoreType.uiControlInspectorData) => data.id,
          (data: ElementAssembleStoreType.uiControlInspectorData) => data.children,
        ),
        selectedUIControlInspectorData,
        inspectorCurrentUIControlId,
      )
    )
  }

  let getCurrentSelectedUIControl = (
    inspectorCurrentUIControlId,
    selectedUIControls: ElementAssembleStoreType.selectedUIControls,
  ) => {
    inspectorCurrentUIControlId->Meta3dCommonlib.OptionSt.bind(inspectorCurrentUIControlId =>
      HierachyUtils.findSelectedUIControlData(
        None,
        (
          (data: ElementAssembleStoreType.uiControl) => data.id,
          (data: ElementAssembleStoreType.uiControl) => data.children,
        ),
        selectedUIControls,
        inspectorCurrentUIControlId,
      )
    )
  }

  let useSelector = ({elementAssembleState}: AssembleSpaceStoreType.state) => {
    let {
      inspectorCurrentUIControlId,
      selectedUIControls,
      selectedUIControlInspectorData,
      customInputs,
    } = elementAssembleState

    (
      inspectorCurrentUIControlId,
      selectedUIControls,
      selectedUIControlInspectorData,
      customInputs,
      list{},
    )
  }
}

@react.component
let make = (~service: service, ~account, ~selectedContributes) => {
  let (
    inspectorCurrentUIControlId,
    selectedUIControls,
    selectedUIControlInspectorData,
    customInputs,
    customActions,
  ) = service.react.useSelector(. Method.useSelector)

  switch (
    Method.getCurrentSelectedUIControlInspectorData(
      inspectorCurrentUIControlId,
      selectedUIControlInspectorData,
    ),
    Method.getCurrentSelectedUIControl(inspectorCurrentUIControlId, selectedUIControls),
  ) {
  | (Some(currentSelectedUIControlInspectorData), Some(currentSelectedUIControl)) =>
    <UIControlInspector
      service
      currentSelectedUIControl
      currentSelectedUIControlInspectorData
      selectedContributes={ElementVisualUtils.addGeneratedCustoms(
        service,
        selectedContributes,
        account->Meta3dCommonlib.OptionSt.getExn,
        customInputs,
        customActions,
      )}
    />
  | _ => React.null
  }
}
