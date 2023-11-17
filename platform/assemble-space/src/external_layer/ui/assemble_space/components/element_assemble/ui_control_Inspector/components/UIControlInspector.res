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
          x,
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
          y,
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
          width,
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
          height,
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

  let setInput = (dispatch, id, inputName: string) => {
    dispatch(
      FrontendUtils.ElementAssembleStoreType.SetInput(
        id,
        FrontendUtils.SelectUtils.isEmptySelectOptionValue(inputName) ? None : Some(inputName),
      ),
    )
  }

  let getActions = SelectedContributesForElementUtils.getActions

  let setAction = (
    dispatch,
    id,
    eventName: Meta3dType.UIControlProtocolConfigType.supportedEventName,
    // eventName: Meta3dType.UIControlProtocolConfigType.eventName,
    actionName: string,
  ) => {
    dispatch(
      FrontendUtils.ElementAssembleStoreType.SetAction(
        id,
        (
          eventName,
          FrontendUtils.SelectUtils.isEmptySelectOptionValue(actionName) ? None : Some(actionName),
        ),
      ),
    )
  }

  let _getRectFieldIntValue = (rectField: FrontendUtils.ElementAssembleStoreType.rectField) => {
    switch rectField {
    | IntForRectField(value) => value->Some
    | _ => None
    }
  }

  // let _getRectFieldElementFieldValue = (
  //   rectField: FrontendUtils.ElementAssembleStoreType.rectField,
  // ) => {
  //   switch rectField {
  //   | ElementStateFieldForRectField(value) => value->Some
  //   | _ => None
  //   }
  // }

  // let _getSpecificTypeElementStateFieldNames = (
  //   elementStateFields: FrontendUtils.ElementAssembleStoreType.elementStateFields,
  //   specificType,
  // ) => {
  //   elementStateFields
  //   ->Meta3dCommonlib.ListSt.filter(({type_}) => type_ == specificType)
  //   ->Meta3dCommonlib.ListSt.map(({name}) => name)
  // }

  // let buildRectField = (dispatch, setRectField, elementStateFields, id, rect, rectField) => {
  let buildRectField = (dispatch, setRectField, id, rect, rectField) => {
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
      // {FrontendUtils.SelectUtils.buildSelect(value =>
      //   FrontendUtils.SelectUtils.isEmptySelectOptionValue(value)
      //     ? ()
      //     : {
      //         setRectField(
      //           dispatch,
      //           id,
      //           rect,
      //           value->FrontendUtils.ElementAssembleStoreType.ElementStateFieldForRectField,
      //         )
      //       }
      // , rectField
      // ->_getRectFieldElementFieldValue
      // ->Meta3dCommonlib.OptionSt.getWithDefault(
      //   FrontendUtils.SelectUtils.buildEmptySelectOptionValue(),
      // ), elementStateFields
      // ->_getSpecificTypeElementStateFieldNames(#int)
      // ->Meta3dCommonlib.ListSt.toArray)}
    </>
  }

  let getIsDrawBoolValue = (isDraw: FrontendUtils.ElementAssembleStoreType.isDraw) => {
    switch isDraw {
    | BoolForIsDraw(value) => value->Some
    | _ => None
    }
  }

  // let getIsDrawElementFieldValue = (isDraw: FrontendUtils.ElementAssembleStoreType.isDraw) => {
  //   switch isDraw {
  //   | ElementStateFieldForIsDraw(value) => value->Some
  //   | _ => None
  //   }
  // }

  // let getBoolElementStateFieldNames = (
  //   elementStateFields: FrontendUtils.ElementAssembleStoreType.elementStateFields,
  // ) => {
  //   elementStateFields
  //   ->Meta3dCommonlib.ListSt.filter(({type_}) => type_ == #bool)
  //   ->Meta3dCommonlib.ListSt.map(({name}) => name)
  // }

  let buildIsDraw = (dispatch, id, isDraw) => {
    <Space direction=#vertical>
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
      // {FrontendUtils.SelectUtils.buildSelect(value =>
      //   FrontendUtils.SelectUtils.isEmptySelectOptionValue(value)
      //     ? ()
      //     : {
      //         setIsDraw(
      //           dispatch,
      //           id,
      //           value->FrontendUtils.ElementAssembleStoreType.ElementStateFieldForIsDraw,
      //         )
      //       }
      // , isDraw
      // ->getIsDrawElementFieldValue
      // ->Meta3dCommonlib.OptionSt.getWithDefault(
      //   FrontendUtils.SelectUtils.buildEmptySelectOptionValue(),
      // ), elementStateFields->getBoolElementStateFieldNames->Meta3dCommonlib.ListSt.toArray)}
    </Space>
  }

  let _handleUploadImage = %raw(`
function (onloadFunc, onprogressFunc, onerrorFunc, file, ){
        let reader = new FileReader()

        reader.onload = () => {
            onloadFunc(file, reader.result)
        }

        reader.onprogress = (event) => {
            onprogressFunc(event.loaded, event.total)
        }

        reader.onerror = (event) => {
            onerrorFunc(event, file)
        }

    reader.readAsDataURL(file)

    return false
}
`)

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
                value,
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

  // let _getSpecificDataValueElementFieldValue = (
  //   specificDataValue: FrontendUtils.ElementAssembleStoreType.specificDataValue,
  // ) => {
  //   switch specificDataValue {
  //   | ElementStateFieldForSpecificDataValue(value) => value->Some
  //   | _ => None
  //   }
  // }

  let buildSpecific = (service, dispatch, id, specific) => {
    <>
      {specific
      ->Meta3dCommonlib.ArraySt.mapi((
        {type_, value, name}: FrontendUtils.ElementAssembleStoreType.specificData,
        i,
      ) => {
        <Card key={name} title={name}>
          {switch type_ {
          | #string =>
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
          | #imageBase64 =>
            <Upload
              beforeUpload={file =>
                _handleUploadImage(
                  (file, imageBase64) => {
                    _setSpecificData(
                      dispatch,
                      specific,
                      id,
                      i,
                      imageBase64->FrontendUtils.ElementAssembleStoreType.SpecicFieldDataValue,
                      type_,
                    )
                  },
                  (_, _) => (),
                  (event, _) => {
                    service.console.error(. {j`error`}, None)
                  },
                  file,
                )}
              showUploadList=false>
              <Button icon={<Icon.UploadOutlined />}> {React.string(`上传图片`)} </Button>
            </Upload>
          }}
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
      // elementInspectorData,
      inspectorCurrentUIControlId,
      selectedUIControls,
      selectedUIControlInspectorData,
    } = elementAssembleState

    (
      selectedContributes,
      (
        // elementInspectorData,
        inspectorCurrentUIControlId,
        selectedUIControls,
        selectedUIControlInspectorData,
      ),
    )
  }
}

@react.component
let make = (~service: service) => {
  let dispatch = FrontendUtils.ReduxUtils.ElementAssemble.useDispatch(service.react.useDispatch)

  let (
    selectedContributes,
    (
      // elementInspectorData,
      inspectorCurrentUIControlId,
      selectedUIControls,
      selectedUIControlInspectorData,
    ),
  ) = service.react.useSelector(. Method.useSelector)

  // let {elementStateFields} = elementInspectorData

  switch Method.getCurrentSelectedUIControlInspectorData(
    inspectorCurrentUIControlId,
    selectedUIControlInspectorData,
  ) {
  | None => React.null
  | Some({id, rect, isDraw, input, event, specific}) =>
    let {x, y, width, height} = rect

    <Space direction=#vertical size=#middle>
      {service.ui.buildTitle(. ~level=2, ~children={React.string(`Rect`)}, ())}
      <Space direction=#horizontal wrap=true>
        {Method.buildRectField(dispatch, Method.setRectX, id, rect, x)}
        {Method.buildRectField(dispatch, Method.setRectY, id, rect, y)}
        {Method.buildRectField(dispatch, Method.setRectWidth, id, rect, width)}
        {Method.buildRectField(dispatch, Method.setRectHeight, id, rect, height)}
      </Space>
      {service.ui.buildTitle(. ~level=2, ~children={React.string(`IsDraw`)}, ())}
      {Method.buildIsDraw(dispatch, id, isDraw)}
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
      | Some({id, protocolConfigStr, data}) =>
        // let {name, version} = data.contributePackageData.protocol

        let actions = selectedContributes->Method.getActions->Meta3dCommonlib.ListSt.toArray

        let uiControlConfigLib = service.meta3d.serializeUIControlProtocolConfigLib(.
          protocolConfigStr,
        )

        let uiControlProtocolName = data.contributePackageData.protocol.name

        <Space direction=#vertical size=#middle>
          {service.ui.buildTitle(. ~level=2, ~children={React.string(`Input`)}, ())}
          {FrontendUtils.SelectUtils.buildSelect(
            Method.setInput(dispatch, id),
            input
            ->Meta3dCommonlib.OptionSt.map(input => input.inputName)
            ->Meta3dCommonlib.OptionSt.getWithDefault(
              FrontendUtils.SelectUtils.buildEmptySelectOptionValue(),
            )
            ->Meta3dCommonlib.Log.printForDebug,
            SelectedContributesForElementUtils.getInputs(selectedContributes)
            ->Meta3dCommonlib.ListSt.toArray
            ->Meta3dCommonlib.Log.printForDebug
            ->Meta3dCommonlib.ArraySt.filter(({data}) => {
              data.contributePackageData.protocol.name
              ->Js.String.replace("-input-", "-ui-control-", _)
              ->Meta3dCommonlib.Log.printForDebug == uiControlProtocolName
            })
            ->Meta3dCommonlib.Log.printForDebug
            ->Meta3dCommonlib.ArraySt.map(({data}) => {
              (
                service.meta3d.execGetContributeFunc(. data.contributeFuncData)->Obj.magic
              )["inputName"]
            })
            ->Meta3dCommonlib.Log.printForDebug,
          )}
          {service.ui.buildTitle(. ~level=2, ~children={React.string(`Specific`)}, ())}
          {Method.buildSpecific(service, dispatch, id, specific)}
          {service.ui.buildTitle(. ~level=2, ~children={React.string(`Event`)}, ())}
          <List
            dataSource={service.meta3d.getUIControlSupportedEventNames(. uiControlConfigLib)}
            // renderItem={(( eventName, actionProtocolName )) => {
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
                  actions
                  // ->Meta3dCommonlib.ArraySt.filter(({data}) => {
                  //   data.contributePackageData.protocol.name == actionProtocolName
                  // })
                  ->Meta3dCommonlib.ArraySt.map(({data}) => {
                    (
                      service.meta3d.execGetContributeFunc(. data.contributeFuncData)->Obj.magic
                    )["actionName"]
                  }),
                )}
              </List.Item>
            }}
          />
        </Space>
      }}
    </Space>
  }
}
