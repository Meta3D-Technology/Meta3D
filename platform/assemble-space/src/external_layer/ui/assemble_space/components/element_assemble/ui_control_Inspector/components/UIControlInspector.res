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

  let buildInputNameSelectValues = (
    service,
    selectedContributes,
    uiControlProtocolName,
    input: option<FrontendUtils.ElementAssembleStoreType.input>,
  ) => {
    let values =
      SelectedContributesForElementUtils.getInputs(selectedContributes)
      ->Meta3dCommonlib.ListSt.toArray
      ->Meta3dCommonlib.ArraySt.filter(({data}) => {
        data.contributePackageData.protocol.name->Js.String.replace("-input-", "-ui-control-", _) ==
          uiControlProtocolName
      })
      ->Meta3dCommonlib.ArraySt.map(({data}) => {
        (service.meta3d.execGetContributeFunc(. data.contributeFuncData)->Obj.magic)["inputName"]
      })

    switch input {
    | Some({inputName}) if !(values->Meta3dCommonlib.ArraySt.includes(inputName)) =>
      values->Meta3dCommonlib.ArraySt.push(inputName)
    // ->Meta3dCommonlib.ArraySt.removeDuplicateItemsWithBuildKeyFunc((. value) => value)
    | _ => values
    }
  }

  let setInput = (dispatch, id, inputName: string) => {
    dispatch(
      FrontendUtils.ElementAssembleStoreType.SetInput(
        id,
        FrontendUtils.SelectUtils.isEmptySelectOptionValue(inputName) ? None : Some(inputName),
      ),
    )
  }

  let buildDefaultInputFileStr = uiControlProtocolName => {
    j`window.Contribute = {
    getContribute: (api) => {
      return {
        inputName: "${ElementVisualUtils.buildDefaultInputNameForInputFileStr(
        uiControlProtocolName,
      )}",
        func: (meta3dState) =>{
            return Promise.resolve(null)
        }
      }
    }
}`
  }

  let setInputFileStrData = (dispatch, id, inputName, inputFileStr) => {
    switch inputFileStr {
    | Some(inputFileStr) =>
      dispatch(FrontendUtils.ElementAssembleStoreType.SetInputFileStr(id, inputName, inputFileStr))
    | None => ()
    }
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

  let buildActionNameSelectValues = (service, actions, actionName) => {
    let values = actions->Meta3dCommonlib.ArraySt.map((
      {data}: FrontendUtils.ApAssembleStoreType.contribute,
    ) => {
      (service.meta3d.execGetContributeFunc(. data.contributeFuncData)->Obj.magic)["actionName"]
    })

    switch actionName {
    | Some(actionName) if !(values->Meta3dCommonlib.ArraySt.includes(actionName)) =>
      values->Meta3dCommonlib.ArraySt.push(actionName)
    | _ => values
    }
  }

  let buildDefaultActionFileStr = (uiControlProtocolName, eventName) => {
    j`window.Contribute = {
  getContribute: (api) => {
    return {
      actionName: "${ElementVisualUtils.buildDefaultActionNameForActionFileStr(
        uiControlProtocolName,
        eventName,
      )}",
      init: (meta3dState) => {
        let eventSourcingService = api.getPackageService(meta3dState, "meta3d-editor-whole-protocol").event(meta3dState).eventSourcing(meta3dState)

        return new Promise((resolve, reject) => {
          resolve(eventSourcingService.on(meta3dState, "${eventName}", 0, (meta3dState) => {
            return Promise.resolve(meta3dState)
          }, (meta3dState) => {
            return Promise.resolve(meta3dState)
          }))
        })
      },
      handler: (meta3dState, uiData) => {
        return new Promise((resolve, reject) => {
          let eventSourcingService = api.getPackageService(meta3dState, "meta3d-editor-whole-protocol").event(meta3dState).eventSourcing(meta3dState)

          resolve(eventSourcingService.addEvent(meta3dState, {
            name: "${eventName}",
            inputData: []
          }))
        })
      },
      createState: () => {
        return null
      }
    }
  }
}`
  }

  let setActionFileStrData = (dispatch, id, eventName, actionName, actionFileStr) => {
    switch actionFileStr {
    | Some(actionFileStr) =>
      dispatch(
        FrontendUtils.ElementAssembleStoreType.SetActionFileStr(
          id,
          eventName,
          actionName,
          actionFileStr,
        ),
      )
    | None => ()
    }
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
            value->IntUtils.stringToInt->FrontendUtils.CommonType.IntForRectField,
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
            value->BoolUtils.stringToBool->FrontendUtils.CommonType.BoolForIsDraw,
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
                  ->FrontendUtils.CommonType.SpecicFieldDataValue,
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
                      imageBase64->FrontendUtils.CommonType.SpecicFieldDataValue,
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

  let (inputFileStr, setInputFileStr) = service.react.useState(_ =>
    Method.getCurrentSelectedUIControlInspectorData(
      inspectorCurrentUIControlId,
      selectedUIControlInspectorData,
    )->Meta3dCommonlib.OptionSt.bind(({input}) =>
      input->Meta3dCommonlib.OptionSt.bind(({inputFileStr}) => inputFileStr)
    )
  )
  let (actionFileStrMap, setActionFileStrMap) = service.react.useState(_ => {
    let map = Meta3dCommonlib.ImmutableHashMap.createEmpty()

    Method.getCurrentSelectedUIControlInspectorData(
      inspectorCurrentUIControlId,
      selectedUIControlInspectorData,
    )
    ->Meta3dCommonlib.OptionSt.map(({event}) =>
      event->Meta3dCommonlib.ArraySt.reduceOneParam(
        (. map, {eventName, actionFileStr}) => {
          switch actionFileStr {
          | Some(actionFileStr) =>
            map->Meta3dCommonlib.ImmutableHashMap.set(eventName->Obj.magic, actionFileStr)
          | None => map
          }
        },
        map,
      )
    )
    ->Meta3dCommonlib.OptionSt.getWithDefault(map)
  })

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
          {<>
            {FrontendUtils.SelectUtils.buildSelect(
              Method.setInput(dispatch, id),
              input
              ->Meta3dCommonlib.OptionSt.map(input => input.inputName)
              ->Meta3dCommonlib.OptionSt.getWithDefault(
                FrontendUtils.SelectUtils.buildEmptySelectOptionValue(),
              ),
              Method.buildInputNameSelectValues(
                service,
                selectedContributes,
                uiControlProtocolName,
                input,
              ),
            )}
            {TextareaUtils.isNotShowTextareaForTest()
              ? React.null
              : <Input.TextArea
                  value={inputFileStr->Meta3dCommonlib.OptionSt.getWithDefault(
                    Method.buildDefaultInputFileStr(uiControlProtocolName),
                  )}
                  onChange={e => {
                    setInputFileStr(_ => e->EventUtils.getEventTargetValue->Some)
                  }}
                />}
            <Button
              onClick={_ => {
                FrontendUtils.ErrorUtils.showCatchedErrorMessage(() => {
                  Method.setInputFileStrData(
                    dispatch,
                    id,
                    ElementVisualUtils.buildDefaultInputNameForInputFileStr(uiControlProtocolName),
                    inputFileStr,
                  )
                }, 5->Some)
              }}>
              {React.string(`提交`)}
            </Button>
          </>}
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
                <Space direction=#vertical size=#middle>
                  {<Space direction=#horizontal size=#middle>
                    <span> {React.string({j`${eventName->Obj.magic}: `})} </span>
                    {FrontendUtils.SelectUtils.buildSelect(
                      Method.setAction(dispatch, id, eventName),
                      value,
                      Method.buildActionNameSelectValues(
                        service,
                        actions,
                        ElementMRUtils.getActionName(
                          event,
                          eventName,
                        )->Meta3dCommonlib.OptionSt.fromNullable,
                      ),
                    )}
                  </Space>}
                  {TextareaUtils.isNotShowTextareaForTest()
                    ? React.null
                    : <Input.TextArea
                        value={actionFileStrMap
                        ->Meta3dCommonlib.ImmutableHashMap.get(eventName->Obj.magic)
                        ->Meta3dCommonlib.OptionSt.getWithDefault(
                          Method.buildDefaultActionFileStr(
                            uiControlProtocolName,
                            eventName->Obj.magic,
                          ),
                        )}
                        onChange={e => {
                          setActionFileStrMap(map =>
                            map->Meta3dCommonlib.ImmutableHashMap.set(
                              eventName->Obj.magic,
                              e->EventUtils.getEventTargetValue,
                            )
                          )
                        }}
                      />}
                  <Button
                    onClick={_ => {
                      FrontendUtils.ErrorUtils.showCatchedErrorMessage(() => {
                        Method.setActionFileStrData(
                          dispatch,
                          id,
                          eventName,
                          ElementVisualUtils.buildDefaultActionNameForActionFileStr(
                            uiControlProtocolName,
                            eventName->Obj.magic,
                          ),
                          actionFileStrMap->Meta3dCommonlib.ImmutableHashMap.get(
                            eventName->Obj.magic,
                          ),
                        )
                      }, 5->Some)
                    }}>
                    {React.string(`提交`)}
                  </Button>
                </Space>
              </List.Item>
            }}
          />
        </Space>
      }}
    </Space>
  }
}
