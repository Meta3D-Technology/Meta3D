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

  // let setRect = (dispatch, id, rect) => {
  //   dispatch(FrontendUtils.ElementAssembleStoreType.SetRect(id, rect))
  // }
  let setRectX = (dispatch, id, rect, x) => {
    dispatch(
      FrontendUtils.ElementAssembleStoreType.SetRect(
        id,
        {
          ...rect,
          x: x,
        },
      ),
    )
  }

  let setRectY = (dispatch, id, rect, y) => {
    dispatch(
      FrontendUtils.ElementAssembleStoreType.SetRect(
        id,
        {
          ...rect,
          y: y,
        },
      ),
    )
  }

  let setRectWidth = (dispatch, id, rect, width) => {
    dispatch(
      FrontendUtils.ElementAssembleStoreType.SetRect(
        id,
        {
          ...rect,
          width: width,
        },
      ),
    )
  }

  let setRectHeight = (dispatch, id, rect, height) => {
    dispatch(
      FrontendUtils.ElementAssembleStoreType.SetRect(
        id,
        {
          ...rect,
          height: height,
        },
      ),
    )
  }

  let setIsDraw = (dispatch, id, isDraw) => {
    dispatch(FrontendUtils.ElementAssembleStoreType.SetIsDraw(id, isDraw))
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

  let getSkins = SelectedContributesUtils.getSkins

  let setSkin = (dispatch, id, skinName: string) => {
    dispatch(FrontendUtils.ElementAssembleStoreType.SetSkin(id, skinName))
  }

  let setAction = (
    dispatch,
    id,
    eventName: Meta3dType.UIControlProtocolConfigType.supportedEventName,
    actionName: string,
  ) => {
    dispatch(
      FrontendUtils.ElementAssembleStoreType.SetAction(
        id,
        (eventName, SelectUtils.isEmptySelectOptionValue(actionName) ? None : Some(actionName)),
      ),
    )
  }

  let getRectFieldIntValue = (rectField: FrontendUtils.ElementAssembleStoreType.rectField) => {
    switch rectField {
    | IntForRectField(value) => value->Some
    | _ => None
    }
  }

  let getRectFieldElementFieldValue = (
    rectField: FrontendUtils.ElementAssembleStoreType.rectField,
  ) => {
    switch rectField {
    | ElementStateFieldForRectField(value) => value->Some
    | _ => None
    }
  }

  let getIntElementStateFieldNames = (
    elementStateFields: FrontendUtils.ElementAssembleStoreType.elementStateFields,
  ) => {
    elementStateFields
    ->Meta3dCommonlib.ListSt.filter(({type_}) => type_ == #int)
    ->Meta3dCommonlib.ListSt.map(({name}) => name)
  }

  let buildRectField = (dispatch, setRectField, elementStateFields, id, rect, rectField) => {
    <>
      // TODO extract IntInput
      <Input
        value={rectField
        ->getRectFieldIntValue
        ->Meta3dCommonlib.OptionSt.getWithDefault(0)
        ->Js.Int.toString}
        onChange={e => {
          setRectField(
            dispatch,
            id,
            rect,
            e
            ->EventUtils.getEventTargetValue
            ->IntUtils.stringToInt
            ->FrontendUtils.ElementAssembleStoreType.IntForRectField,
          )
        }}
      />
      {SelectUtils.buildSelect(value =>
        SelectUtils.isEmptySelectOptionValue(value)
          ? ()
          : {
              setRectField(
                dispatch,
                id,
                rect,
                value->FrontendUtils.ElementAssembleStoreType.ElementStateFieldForRectField,
              )
            }
      , rectField
      ->getRectFieldElementFieldValue
      ->Meta3dCommonlib.OptionSt.getWithDefault(
        SelectUtils.buildEmptySelectOptionValue(),
      ), elementStateFields->getIntElementStateFieldNames->Meta3dCommonlib.ListSt.toArray)}
    </>
  }

  let getIsDrawBoolValue = (isDraw: FrontendUtils.ElementAssembleStoreType.isDraw) => {
    switch isDraw {
    | BoolForIsDraw(value) => value->Some
    | _ => None
    }
  }

  let getIsDrawElementFieldValue = (isDraw: FrontendUtils.ElementAssembleStoreType.isDraw) => {
    switch isDraw {
    | ElementStateFieldForIsDraw(value) => value->Some
    | _ => None
    }
  }

  let getBoolElementStateFieldNames = (
    elementStateFields: FrontendUtils.ElementAssembleStoreType.elementStateFields,
  ) => {
    elementStateFields
    ->Meta3dCommonlib.ListSt.filter(({type_}) => type_ == #bool)
    ->Meta3dCommonlib.ListSt.map(({name}) => name)
  }

  let buildIsDraw = (dispatch, elementStateFields, id, isDraw) => {
    <>
      {SelectUtils.buildSelectWithoutEmpty(
        value =>
          setIsDraw(
            dispatch,
            id,
            value->BoolUtils.stringToBool->FrontendUtils.ElementAssembleStoreType.BoolForIsDraw,
          ),
        isDraw
        ->getIsDrawBoolValue
        ->Meta3dCommonlib.OptionSt.getWithDefault(true)
        ->BoolUtils.boolToString,
        ["true", "false"],
      )}
      {SelectUtils.buildSelect(value =>
        SelectUtils.isEmptySelectOptionValue(value)
          ? ()
          : {
              setIsDraw(
                dispatch,
                id,
                value->FrontendUtils.ElementAssembleStoreType.ElementStateFieldForIsDraw,
              )
            }
      , isDraw
      ->getIsDrawElementFieldValue
      ->Meta3dCommonlib.OptionSt.getWithDefault(
        SelectUtils.buildEmptySelectOptionValue(),
      ), elementStateFields->getBoolElementStateFieldNames->Meta3dCommonlib.ListSt.toArray)}
    </>
  }

  let _handleSpecificDataFieldType = (handleStringTypeFunc, type_) => {
    switch type_ {
    | #string => handleStringTypeFunc()
    }
  }

  let _convertDefaultValueToItsType = (
    {name, type_, defaultValue} as field: FrontendUtils.ElementAssembleStoreType.specificData,
  ) => {
    _handleSpecificDataFieldType(() => {
      field
    }, type_)
  }

  let _onFinishSpecific = (dispatch, id, values) => {
    dispatch(
      FrontendUtils.ElementAssembleStoreType.SetSpecific(
        id,
        (values->Obj.magic)["fields"]->Meta3dCommonlib.ArraySt.map(_convertDefaultValueToItsType),
      ),
    )
  }

  let _onFinishFailedSpecific = (service, errorInfo) => {
    service.console.error(. {j`Failed: ${errorInfo->Obj.magic->Js.Json.stringify}`}, None)
  }

  let buildSpecificForm = (service, dispatch, id, specific) => {
    <Form
      onFinish={_onFinishSpecific(dispatch, id)} onFinishFailed={_onFinishFailedSpecific(service)}>
      <Form.List name="fields" initialValue={specific->Obj.magic}>
        {(fields, _) => {
          <>
            {fields
            ->Meta3dCommonlib.ArraySt.map(field => {
              let specificData: FrontendUtils.ElementAssembleStoreType.specificData =
                specific[field.name->IntUtils.stringToInt]

              <Form.Item key={field.key}>
                <Form.Item label={specificData.name} name={[field.name, "defaultValue"]->Obj.magic}>
                  <Input />
                </Form.Item>
              </Form.Item>
            })
            ->React.array}
          </>
        }}
      </Form.List>
      <Form.Item> <Button htmlType="submit"> {React.string(`Submit`)} </Button> </Form.Item>
    </Form>
  }

  let useSelector = (
    {apAssembleState, elementAssembleState}: FrontendUtils.AssembleSpaceStoreType.state,
  ) => {
    let {selectedContributes} = apAssembleState
    let {
      elementInspectorData,
      inspectorCurrentUIControlId,
      selectedUIControls,
      selectedUIControlInspectorData,
    } = elementAssembleState

    (
      selectedContributes,
      (
        elementInspectorData,
        inspectorCurrentUIControlId,
        selectedUIControls,
        selectedUIControlInspectorData,
      ),
    )
  }
}

@react.component
let make = (~service: service) => {
  let dispatch = ReduxUtils.ElementAssemble.useDispatch(service.react.useDispatch)

  let (
    selectedContributes,
    (
      elementInspectorData,
      inspectorCurrentUIControlId,
      selectedUIControls,
      selectedUIControlInspectorData,
    ),
  ) = service.react.useSelector(Method.useSelector)

  let {elementStateFields} = elementInspectorData

  switch Method.getCurrentSelectedUIControlInspectorData(
    inspectorCurrentUIControlId,
    selectedUIControlInspectorData,
  ) {
  | None => React.null
  | Some({id, rect, isDraw, skin, event, specific}) =>
    let {x, y, width, height} = rect

    <>
      <h1> {React.string(`Rect`)} </h1>
      {Method.buildRectField(dispatch, Method.setRectX, elementStateFields, id, rect, x)}
      {Method.buildRectField(dispatch, Method.setRectY, elementStateFields, id, rect, y)}
      {Method.buildRectField(dispatch, Method.setRectWidth, elementStateFields, id, rect, width)}
      {Method.buildRectField(dispatch, Method.setRectHeight, elementStateFields, id, rect, height)}
      <h1> {React.string(`IsDraw`)} </h1>
      {Method.buildIsDraw(dispatch, elementStateFields, id, isDraw)}
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
      | Some({id, protocolConfigStr}) =>
        // let {name, version} = data.contributePackageData.protocol

        let actions = selectedContributes->Method.getActions->Meta3dCommonlib.ListSt.toArray

        let skins = selectedContributes->Method.getSkins->Meta3dCommonlib.ListSt.toArray

        let uiControlConfigLib = service.meta3d.serializeUIControlProtocolConfigLib(.
          protocolConfigStr,
        )

        <>
          <h1> {React.string(`Specific`)} </h1>
          {Method.buildSpecificForm(service, dispatch, id, specific)}
          <h1> {React.string(`Skin`)} </h1>
          {SelectUtils.buildSelectWithoutEmpty(
            Method.setSkin(dispatch, id),
            skin.skinName,
            SkinUtils.findSkins(
              service,
              exn => {
                service.console.error(.
                  exn->Obj.magic->Js.Exn.message->Meta3dCommonlib.OptionSt.getExn->Obj.magic,
                  None,
                )
                []
              },
              protocolConfigStr,
              selectedContributes,
            )->Meta3dCommonlib.ArraySt.map(({data}) => {
              (
                service.meta3d.execGetContributeFunc(. data.contributeFuncData)->Obj.magic
              )["skinName"]
            }),
          )}
          <h1> {React.string(`Event`)} </h1>
          <List
            dataSource={service.meta3d.getUIControlSupportedEventNames(. uiControlConfigLib)}
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
                  actions->Meta3dCommonlib.ArraySt.map(({data}) => {
                    (
                      service.meta3d.execGetContributeFunc(. data.contributeFuncData)->Obj.magic
                    )["actionName"]
                  }),
                )}
              </List.Item>
            }}
          />
        </>
      }}
    </>
  }
}
