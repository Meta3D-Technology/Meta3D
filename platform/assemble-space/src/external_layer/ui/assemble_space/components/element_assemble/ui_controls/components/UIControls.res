open FrontendUtils.Antd
%%raw("import 'antd/dist/antd.css'")
open FrontendUtils.AssembleSpaceType

module Method = {
  let getUIControls = SelectedContributesForElementUtils.getUIControls

  let _convertSpecificType = (
    specific: Meta3dType.UIControlProtocolConfigType.uiControlSpecificDataFields,
  ): FrontendUtils.ElementAssembleStoreType.specific => {
    specific->Meta3dCommonlib.ArraySt.map(({
      value,
      name,
      type_,
    }): FrontendUtils.ElementAssembleStoreType.specificData => {
      {
        name,
        type_,
        value: value->FrontendUtils.ElementAssembleStoreType.SpecicFieldDataValue,
      }
    })
  }

  let _getScenViewUIControlProtocolName = () => "meta3d-ui-control-scene-view-protocol"

  let _checkShouldOnlyHasOneSceneViewUIControlAtMost = (
    protocolName,
    selectedUIControls: FrontendUtils.ElementAssembleStoreType.selectedUIControls,
  ) => {
    protocolName === _getScenViewUIControlProtocolName()
      ? {
          selectedUIControls
          ->Meta3dCommonlib.ListSt.filter(uiControl => {
            uiControl.data.contributePackageData.protocol.name === protocolName
          })
          ->Meta3dCommonlib.ListSt.length !== 0
            ? Some({j`只能有1个Scene View UI Control`})
            : None
        }
      : None
  }

  let selectUIControl = (
    service,
    dispatch,
    selectedUIControls,
    selectedContributes,
    protocolIconBase64,
    protocolConfigStr,
    displayName,
    data: Meta3d.ExtensionFileType.contributeFileData,
    parentUIControlId,
  ) => {
    let protocolConfigStr = protocolConfigStr->Meta3dCommonlib.OptionSt.getExn

    switch _checkShouldOnlyHasOneSceneViewUIControlAtMost(
      data.contributePackageData.protocol.name,
      selectedUIControls,
    ) {
    | Some(errorMessage) => service.console.error(. errorMessage, None)
    | None =>
      dispatch(
        FrontendUtils.ElementAssembleStoreType.SelectUIControl(
          protocolIconBase64,
          protocolConfigStr,
          displayName,
          data,
          parentUIControlId,
          service.meta3d.getUIControlSpecificDataFields(.
            service.meta3d.serializeUIControlProtocolConfigLib(. protocolConfigStr),
          )->_convertSpecificType,
        ),
      )
    }
  }

  let useSelector = (
    {apAssembleState, elementAssembleState}: FrontendUtils.AssembleSpaceStoreType.state,
  ) => {
    let {selectedContributes} = apAssembleState
    let {selectedUIControls, parentUIControlId} = elementAssembleState

    (selectedContributes, selectedUIControls, parentUIControlId)
  }
}

@react.component
let make = (~service: service) => {
  let dispatch = FrontendUtils.ReduxUtils.ElementAssemble.useDispatch(service.react.useDispatch)

  let (selectedContributes, selectedUIControls, parentUIControlId) = service.react.useSelector(. 
    Method.useSelector,
  )

  // TODO duplicate with ap view
  <List
  grid={{gutter: 16, column: 2}}
    dataSource={selectedContributes->Method.getUIControls->Meta3dCommonlib.ListSt.toArray}
    renderItem={({id, protocolIconBase64, protocolConfigStr, data}) => {
      // let name = data.contributePackageData.name
      let displayName = data.contributePackageData.displayName

      <List.Item>
        <Card
          key={id}
          onClick={_ => {
            FrontendUtils.ErrorUtils.showCatchedErrorMessage(() => {
              Method.selectUIControl(
                service,
                dispatch,
                selectedUIControls,
                selectedContributes,
                protocolIconBase64,
                protocolConfigStr,
                displayName,
                data,
                parentUIControlId,
              )
            }, 5->Some)
          }}
          bodyStyle={ReactDOM.Style.make(~padding="0px", ())}
          cover={<Image preview=false src={protocolIconBase64} width=50 height=50 />}>
          <Card.Meta
            title={<span
              style={ReactDOM.Style.make(
                ~whiteSpace="normal",
                ~wordWrap="break-word",
                ~wordBreak="break-all",
                (),
              )}>
              {React.string(displayName)}
            </span>}
          />
        </Card>
      </List.Item>
    }}
  />
}
