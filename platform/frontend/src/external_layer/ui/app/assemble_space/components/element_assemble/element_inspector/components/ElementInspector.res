open Antd
%%raw("import 'antd/dist/reset.css'")
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
      customActions,
    } = elementAssembleState

    (
      inspectorCurrentUIControlId,
      selectedUIControls,
      selectedUIControlInspectorData,
      customInputs,
      customActions,
    )
  }
}

@react.component
let make = (
  ~service: service,
  ~account,
  ~selectedContributes,
  ~rectXInputTarget: React.ref<Js.Nullable.t<'a>>,
  ~rectWidthInputTarget: React.ref<Js.Nullable.t<'a>>,
  ~rectHeightInputTarget: React.ref<Js.Nullable.t<'a>>,
) => {
  let (
    inspectorCurrentUIControlId,
    selectedUIControls,
    selectedUIControlInspectorData,
    customInputs,
    customActions,
  ) = service.react.useSelector(. Method.useSelector)

  let (
    selectedContributesAddedGeneratedCustoms,
    setSelectedContributesAddedGeneratedCustoms,
  ) = React.useState(_ => None)

  service.react.useEffectOnce(() => {
    MessageUtils.showCatchedErrorMessage(() => {
      setSelectedContributesAddedGeneratedCustoms(
        _ =>
          ElementVisualUtils.addGeneratedCustoms(
            service,
            selectedContributes,
            account->Meta3dCommonlib.OptionSt.getExn,
            customInputs,
            customActions,
          )->Some,
      )
    }, 5->Some)

    ((), None)
  })

  switch (
    Method.getCurrentSelectedUIControlInspectorData(
      inspectorCurrentUIControlId,
      selectedUIControlInspectorData,
    ),
    Method.getCurrentSelectedUIControl(inspectorCurrentUIControlId, selectedUIControls),
    selectedContributesAddedGeneratedCustoms,
  ) {
  | (
      Some(currentSelectedUIControlInspectorData),
      Some(currentSelectedUIControl),
      Some(selectedContributesAddedGeneratedCustoms),
    ) =>
    <UIControlInspector
      service
      currentSelectedUIControl
      currentSelectedUIControlInspectorData
      selectedContributes={selectedContributesAddedGeneratedCustoms}
      rectXInputTarget
      rectWidthInputTarget
      rectHeightInputTarget
    />
  | _ => React.null
  }
}
