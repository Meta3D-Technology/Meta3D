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

  let getActions = SelectedContributesForElementUtils.getActions

  let setAction = (
    dispatch,
    id,
    eventName: Meta3dType.UIControlProtocolConfigType.supportedEventName,
    actionName: string,
  ) => {
    dispatch(
      FrontendUtils.ElementAssembleStoreType.SetAction(
        id,
        (eventName, FrontendUtils.SelectUtils.isEmptySelectOptionValue(actionName) ? None : Some(actionName)),
      ),
    )
  }

  let _getRectFieldIntValue = (rectField: FrontendUtils.ElementAssembleStoreType.rectField) => {
    switch rectField {
    | IntForRectField(value) => value->Some
    | _ => None
    }
  }

  let _getRectFieldElementFieldValue = (
    rectField: FrontendUtils.ElementAssembleStoreType.rectField,
  ) => {
    switch rectField {
    | ElementStateFieldForRectField(value) => value->Some
    | _ => None
    }
  }

  let _getSpecificTypeElementStateFieldNames = (
    elementStateFields: FrontendUtils.ElementAssembleStoreType.elementStateFields,
    specificType,
  ) => {
    elementStateFields
    ->Meta3dCommonlib.ListSt.filter(({type_}) => type_ == specificType)
    ->Meta3dCommonlib.ListSt.map(({name}) => name)
  }

  let buildRectField = (dispatch, setRectField, elementStateFields, id, rect, rectField) => {
    <>
      <InputNumber
        value={rectField
        ->_getRectFieldIntValue
        ->Meta3dCommonlib.OptionSt.getWithDefault(0)
        ->Js.Int.toString}
        step="1"
        onChange={value => {
          setRectField(
            dispatch,
            id,
            rect,
            value->IntUtils.stringToInt->FrontendUtils.ElementAssembleStoreType.IntForRectField,
          )
        }}
      />
      {FrontendUtils.SelectUtils.buildSelect(value =>
        FrontendUtils.SelectUtils.isEmptySelectOptionValue(value)
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
      ->_getRectFieldElementFieldValue
      ->Meta3dCommonlib.OptionSt.getWithDefault(
        FrontendUtils.SelectUtils.buildEmptySelectOptionValue(),
      ), elementStateFields
      ->_getSpecificTypeElementStateFieldNames(#int)
      ->Meta3dCommonlib.ListSt.toArray)}
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
      {FrontendUtils.SelectUtils.buildSelectWithoutEmpty(
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
      {FrontendUtils.SelectUtils.buildSelect(value =>
        FrontendUtils.SelectUtils.isEmptySelectOptionValue(value)
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
        FrontendUtils.SelectUtils.buildEmptySelectOptionValue(),
      ), elementStateFields->getBoolElementStateFieldNames->Meta3dCommonlib.ListSt.toArray)}
    </>
  }

  let _setSpecificData = (dispatch, specific, id, i, value, type_) => {
    dispatch(
      FrontendUtils.ElementAssembleStoreType.SetSpecificData(
        id,
        specific->Meta3dCommonlib.ArraySt.mapi((
          specificData: FrontendUtils.ElementAssembleStoreType.specificData,
          j,
        ) => {
          j === i
            ? {
                ...specificData,
                value: value,
              }
            : specificData
        }),
      ),
    )
  }

  let _getSpecificDataValue = (
    specificDataValue: FrontendUtils.ElementAssembleStoreType.specificDataValue,
  ) => {
    switch specificDataValue {
    | SpecicFieldDataValue(value) => value->Some
    | _ => None
    }
  }

  let _getSpecificDataValueElementFieldValue = (
    specificDataValue: FrontendUtils.ElementAssembleStoreType.specificDataValue,
  ) => {
    switch specificDataValue {
    | ElementStateFieldForSpecificDataValue(value) => value->Some
    | _ => None
    }
  }

  let buildSpecific = (service, dispatch, id, specific, elementStateFields) => {
    <>
      {specific
      ->Meta3dCommonlib.ArraySt.mapi((
        {type_, value, name}: FrontendUtils.ElementAssembleStoreType.specificData,
        i,
      ) => {
        <Card key={name} title={name}>
          <Input
            key={name}
            value={_getSpecificDataValue(value)
            ->Meta3dCommonlib.OptionSt.map(SpecificUtils.convertValueToString(_, type_))
            ->Meta3dCommonlib.OptionSt.getWithDefault("")}
            onChange={e => {
              _setSpecificData(
                dispatch,
                specific,
                id,
                i,
                e
                ->EventUtils.getEventTargetValue
                ->SpecificUtils.convertStringToValue(type_)
                ->FrontendUtils.ElementAssembleStoreType.SpecicFieldDataValue,
                type_,
              )
            }}
          />
          {FrontendUtils.SelectUtils.buildSelect(value =>
            FrontendUtils.SelectUtils.isEmptySelectOptionValue(value)
              ? ()
              : {
                  _setSpecificData(
                    dispatch,
                    specific,
                    id,
                    i,
                    value->FrontendUtils.ElementAssembleStoreType.ElementStateFieldForSpecificDataValue,
                    type_,
                  )
                }
          , value
          ->_getSpecificDataValueElementFieldValue
          ->Meta3dCommonlib.OptionSt.getWithDefault(
            FrontendUtils.SelectUtils.buildEmptySelectOptionValue(),
          ), elementStateFields
          ->_getSpecificTypeElementStateFieldNames(
            type_->FrontendUtils.ElementAssembleStoreType.specificTypeToElementStateFieldType,
          )
          ->Meta3dCommonlib.ListSt.toArray)}
        </Card>
      })
      ->React.array}
    </>
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
  | Some({id, rect, isDraw, event, specific}) =>
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
        service.console.errorWithExn(.
          Meta3dCommonlib.Exception.buildErr(
            Meta3dCommonlib.Log.buildErrorMessage(
              ~title="currentSelectedUIControl should exist",
              ~description="",
              ~reason="",
              ~solution=j``,
              ~params=j``,
            ),
          ),
          None,
        )->Obj.magic
      | Some({id, protocolConfigStr}) =>
        // let {name, version} = data.contributePackageData.protocol

        let actions = selectedContributes->Method.getActions->Meta3dCommonlib.ListSt.toArray

        let uiControlConfigLib = service.meta3d.serializeUIControlProtocolConfigLib(.
          protocolConfigStr,
        )

        <>
          <h1> {React.string(`Specific`)} </h1>
          {Method.buildSpecific(service, dispatch, id, specific, elementStateFields)}
          <h1> {React.string(`Event`)} </h1>
          <List
            dataSource={service.meta3d.getUIControlSupportedEventNames(. uiControlConfigLib)}
            renderItem={eventName => {
              let value =
                ElementMRUtils.getActionName(
                  event,
                  eventName,
                )->Meta3dCommonlib.NullableSt.getWithDefault(
                  FrontendUtils.SelectUtils.buildEmptySelectOptionValue(),
                )

              <List.Item key={eventName->Obj.magic}>
                <span> {React.string({j`${eventName->Obj.magic}: `})} </span>
                {FrontendUtils.SelectUtils.buildSelect(
                  Method.setAction(dispatch, id, eventName),
                  value,
                  actions->Meta3dCommonlib.ArraySt.map(({data}) => {
                    (
                      service.meta3d.execGetContributeFunc(.
                        data.contributeFuncData,
                        Meta3dCommonlib.ImmutableHashMap.createEmpty(),
                        Meta3dCommonlib.ImmutableHashMap.createEmpty(),
                      )->Obj.magic
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
