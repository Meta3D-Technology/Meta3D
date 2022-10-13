open FrontendUtils.Antd
%%raw("import 'antd/dist/antd.css'")
open FrontendUtils.AssembleSpaceType

module Method = {
  let getCurrentSelectedUIControlInspectorData = (
    inspectorCurrentUIControlId,
    selectedUIControlInspectorData: FrontendUtils.ElementAssembleStoreType.selectedUIControlInspectorData,
  ) => {
    inspectorCurrentUIControlId->Meta3dCommonlib.OptionSt.bind(inspectorCurrentUIControlId =>
      selectedUIControlInspectorData->Meta3dCommonlib.ListSt.getBy(data =>
        data.id === inspectorCurrentUIControlId
      )
    )
  }

  let setRect = (dispatch, id, rect) => {
    dispatch(FrontendUtils.ElementAssembleStoreType.SetRect(id, rect))
  }

  let getCurrentSelectedUIControl = (
    inspectorCurrentUIControlId,
    selectedUIControls: FrontendUtils.ElementAssembleStoreType.selectedUIControls,
  ) => {
    inspectorCurrentUIControlId->Meta3dCommonlib.OptionSt.bind(inspectorCurrentUIControlId =>
      selectedUIControls->Meta3dCommonlib.ListSt.getBy(data =>
        data.id === inspectorCurrentUIControlId
      )
    )
  }

  let getActions = SelectedContributesUtils.getActions

  let setAction = (
    dispatch,
    id,
    eventName: Meta3dType.Index.supportedEventName,
    actionName: string,
  ) => {
    dispatch(
      FrontendUtils.ElementAssembleStoreType.SetAction(
        id,
        (eventName, SelectUtils.isEmptySelectOptionValue(actionName) ? None : Some(actionName)),
      ),
    )
  }

  let useSelector = (
    {apAssembleState, elementAssembleState}: FrontendUtils.AssembleSpaceStoreType.state,
  ) => {
    let {selectedContributes} = apAssembleState
    let {
      inspectorCurrentUIControlId,
      selectedUIControls,
      selectedUIControlInspectorData,
    } = elementAssembleState

    (
      selectedContributes,
      (inspectorCurrentUIControlId, selectedUIControls, selectedUIControlInspectorData),
    )
  }
}

@react.component
let make = (~service: service) => {
  let dispatch = ReduxUtils.ElementAssemble.useDispatch(service.react.useDispatch)

  let (
    selectedContributes,
    (inspectorCurrentUIControlId, selectedUIControls, selectedUIControlInspectorData),
  ) = service.react.useSelector(Method.useSelector)

  switch Method.getCurrentSelectedUIControlInspectorData(
    inspectorCurrentUIControlId,
    selectedUIControlInspectorData,
  ) {
  | None => React.null
  | Some({id, rect, event}) =>
    let {x, y, width, height} = rect

    <>
      <h1> {React.string(`Rect`)} </h1>
      // TODO extract IntInput
      <Input
        value={x->Js.Int.toString}
        onChange={e => {
          Method.setRect(
            dispatch,
            id,
            {
              ...rect,
              x: e->EventUtils.getEventTargetValue->IntUtils.stringToInt,
            },
          )
        }}
      />
      <Input
        value={y->Js.Int.toString}
        onChange={e => {
          Method.setRect(
            dispatch,
            id,
            {
              ...rect,
              y: e->EventUtils.getEventTargetValue->IntUtils.stringToInt,
            },
          )
        }}
      />
      <Input
        value={width->Js.Int.toString}
        onChange={e => {
          Method.setRect(
            dispatch,
            id,
            {
              ...rect,
              width: e->EventUtils.getEventTargetValue->IntUtils.stringToInt,
            },
          )
        }}
      />
      <Input
        value={height->Js.Int.toString}
        onChange={e => {
          Method.setRect(
            dispatch,
            id,
            {
              ...rect,
              height: e->EventUtils.getEventTargetValue->IntUtils.stringToInt,
            },
          )
        }}
      />
      <h1> {React.string(`Event`)} </h1>
      {switch Method.getCurrentSelectedUIControl(inspectorCurrentUIControlId, selectedUIControls) {
      | None =>
        service.console.error(.
          Meta3dCommonlib.Exception.buildErr(
            Meta3dCommonlib.Log.buildErrorMessage(
              ~title="currentSelectedUIControl should exist",
              ~description="",
              ~reason="",
              ~solution=j``,
              ~params=j``,
            ),
          )
          ->Obj.magic
          ->Js.Exn.message
          ->Meta3dCommonlib.OptionSt.getExn
          ->Obj.magic,
          None,
        )->Obj.magic
      | Some({id, protocolConfigStr, data}) =>
        let {name, version} = data.contributePackageData.protocol

        let actions = selectedContributes->Method.getActions->Meta3dCommonlib.ListSt.toArray

        let configLib = service.meta3d.serializeUIControlProtocolConfigLib(. protocolConfigStr)

        <List
          dataSource={service.meta3d.getUIControlSupportedEventNames(. configLib)}
          renderItem={eventName => {
            let defaultValue =
              ElementMRUtils.getActionName(
                event,
                eventName,
              )->Meta3dCommonlib.NullableSt.getWithDefault(
                SelectUtils.buildEmptySelectOptionValue(),
              )

            <List.Item key={eventName->Obj.magic}>
              <span> {React.string({j`${eventName->Obj.magic}: `})} </span>
              {SelectUtils.buildSelect(
                Method.setAction(dispatch, id, eventName),
                defaultValue,
                actions->Meta3dCommonlib.ArraySt.map(({protocolConfigStr}) => {
                  let configLib = service.meta3d.serializeActionProtocolConfigLib(.
                    protocolConfigStr->Meta3dCommonlib.OptionSt.getExn,
                  )

                  service.meta3d.getActionName(. configLib)
                }),
              )}
            </List.Item>
          }}
        />
      }}
    </>
  }
}
