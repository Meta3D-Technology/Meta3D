type element = {
  elementName: string,
  execOrder: int,
  elementStateFields: array<FrontendUtils.ElementAssembleStoreType.elementStateFieldData>,
  reducers: FrontendUtils.ElementAssembleStoreType.reducers,
}

type protocolConfigLib = Meta3d.LibUtils.lib

type protocol = {
  name: string,
  version: string,
  configLib: protocolConfigLib,
}

type rec uiControl = {
  name: string,
  protocol: protocol,
  data: FrontendUtils.ElementAssembleStoreType.uiControlInspectorData,
  children: array<uiControl>,
}

type elementMR = {
  element: element,
  uiControls: array<uiControl>,
}

let _getSelectedUIControlInspectorData = (selectedUIControlInspectorData, id) => {
  selectedUIControlInspectorData
  ->Meta3dCommonlib.ArraySt.find((
    data: FrontendUtils.ElementAssembleStoreType.uiControlInspectorData,
  ) => {
    data.id == id
  })
  ->Meta3dCommonlib.OptionSt.getExn
}

let _handleChildren = uiControls => {
  let (uiControlsAfterInsertChild, needRemovedIds) =
    uiControls->Meta3dCommonlib.ArraySt.reduceOneParami(
      (.
        (uiControlsAfterInsertChild, needRemovedIds) as result,
        (parentId, idOfChild, childUIControl),
        i,
      ) => {
        switch parentId {
        | None => result
        | Some(parentId) =>
          uiControlsAfterInsertChild->Meta3dCommonlib.ArraySt.reduceOneParam(
            (.
              (uiControlsAfterInsertChildResult, needRemovedIds),
              (_parentId, id, {children} as parentUIControl: uiControl),
            ) => {
              id === parentId
                ? (
                    uiControlsAfterInsertChildResult->Meta3dCommonlib.ArraySt.push((
                      _parentId,
                      id,
                      {
                        ...parentUIControl,
                        children: children
                        ->Meta3dCommonlib.ArraySt.copy
                        ->Meta3dCommonlib.ArraySt.push(childUIControl),
                      },
                    )),
                    needRemovedIds->Meta3dCommonlib.ArraySt.push(idOfChild),
                  )
                : (
                    uiControlsAfterInsertChildResult->Meta3dCommonlib.ArraySt.push((
                      _parentId,
                      id,
                      parentUIControl,
                    )),
                    needRemovedIds,
                  )
            },
            ([], needRemovedIds),
          )
        }
      },
      (uiControls, []),
    )

  uiControlsAfterInsertChild
  ->Meta3dCommonlib.ArraySt.filter(((_, id, _)) => {
    !(needRemovedIds->Meta3dCommonlib.ArraySt.includes(id))
  })
  ->Meta3dCommonlib.ArraySt.map(Meta3dCommonlib.Tuple3.getLast)
}

let buildElementMR = (
  service: FrontendUtils.AssembleSpaceType.service,
  elementName,
  selectedUIControls,
  selectedUIControlInspectorData,
  (elementStateFields, reducers),
): elementMR => {
  {
    element: {
      elementName: elementName,
      execOrder: 0,
      elementStateFields: elementStateFields->Meta3dCommonlib.ListSt.toArray,
      reducers: reducers,
    },
    uiControls: selectedUIControls
    ->Meta3dCommonlib.ArraySt.reduceOneParam(
      (.
        uiControls,
        {id, parentId, protocolConfigStr, data}: FrontendUtils.ElementAssembleStoreType.uiControl,
      ) => {
        let {name, version} = data.contributePackageData.protocol

        uiControls->Meta3dCommonlib.ArraySt.push((
          parentId,
          id,
          {
            name: (
              service.meta3d.execGetContributeFunc(.
                data.contributeFuncData,
                Meta3dCommonlib.ImmutableHashMap.createEmpty(),
                Meta3dCommonlib.ImmutableHashMap.createEmpty(),
              )->Obj.magic
            )["uiControlName"],
            protocol: {
              name: name,
              version: version,
              configLib: service.meta3d.serializeUIControlProtocolConfigLib(. protocolConfigStr),
            },
            data: _getSelectedUIControlInspectorData(selectedUIControlInspectorData, id),
            children: [],
          },
        ))
      },
      [],
    )
    ->_handleChildren,
  }
}

let _generateGetUIControlsStr = (service: FrontendUtils.AssembleSpaceType.service, uiControls) => {
  uiControls
  ->Meta3dCommonlib.ArraySt.removeDuplicateItemsWithBuildKeyFunc((. {name}) => {
    name
  })
  ->Meta3dCommonlib.ArraySt.reduceOneParam((. str, {name, protocol}) => {
    str ++
    j`
    let ${name} = getUIControl(uiState,"${name}")
    `
  }, "")
}

let getActionName = (event: FrontendUtils.ElementAssembleStoreType.event, eventName) => {
  event
  ->Meta3dCommonlib.ArraySt.find(eventData => {
    eventData.eventName === eventName
  })
  ->Meta3dCommonlib.OptionSt.map(({actionName}) => actionName)
  ->Meta3dCommonlib.OptionSt.toNullable
}

let _generateHandleUIControlEventStr = (
  service: FrontendUtils.AssembleSpaceType.service,
  configLib,
  event,
) => {
  service.meta3d.generateHandleUIControlEventStr(.
    configLib,
    service.meta3d.getUIControlSupportedEventNames(.
      configLib,
    )->Meta3dCommonlib.ArraySt.map(eventName => {
      getActionName(event, eventName)
    }),
  )
}

let _generateRectField = (rectField: FrontendUtils.ElementAssembleStoreType.rectField) => {
  switch rectField {
  | IntForRectField(value) => value->Js.Int.toString
  | ElementStateFieldForRectField(value) => j`elementState.${value}`
  }
}

let _generateRect = (rect: FrontendUtils.ElementAssembleStoreType.rect): string => {
  let {x, y, width, height} = rect

  j`{
    x: ${_generateRectField(x)},
    y: ${_generateRectField(y)},
    width: ${_generateRectField(width)},
    height: ${_generateRectField(height)}
    }`
}

let _generateSkin = (skin: FrontendUtils.ElementAssembleStoreType.skin): string => {
  j` getSkin(uiState, "${skin.skinName}").skin `
}

let _generateSpecific = (specific: FrontendUtils.ElementAssembleStoreType.specific): string => {
  specific->Meta3dCommonlib.ArraySt.reduceOneParam((. map, {name, value}) => {
    map->Meta3dCommonlib.ImmutableHashMap.set(name, value)
  }, Meta3dCommonlib.ImmutableHashMap.createEmpty())->Obj.magic->Js.Json.stringify
}

let _generateIsDrawIfBegin = (isDraw: FrontendUtils.ElementAssembleStoreType.isDraw) => {
  switch isDraw {
  | BoolForIsDraw(value) => j`if(${value->BoolUtils.boolToString}){`
  | ElementStateFieldForIsDraw(value) => j`if(elementState.${value}){`
  }
}

let _generateIsDrawIfEnd = () => {
  j`}`
}

let rec _generateChildren = (service, children: array<uiControl>): string => {
  children->Meta3dCommonlib.ArraySt.length === 0
    ? {j`childrenFunc:(meta3dState) => meta3dState`}
    : {
        let str = j`childrenFunc: (meta3dState) =>{
    `
        let str = str ++ _generateGetUIControlsStr(service, children)

        let str =
          str ++
          _generateAllDrawUIControlAndHandleEventStr(service, children) ++ {
            j`
        return meta3dState
        `
          }

        str ++ "}"
      }
}
and _generateAllDrawUIControlAndHandleEventStr = (
  service: FrontendUtils.AssembleSpaceType.service,
  uiControls,
) => {
  uiControls->Meta3dCommonlib.ArraySt.reduceOneParam(
    (. str, {name, protocol, data, children}) => {
      str ++
      _generateIsDrawIfBegin(data.isDraw) ++
      j`
                data = ${name}(meta3dState,
                {
                  ...${service.meta3d.generateUIControlCommonDataStr(.
          protocol.configLib,
          _generateRect(data.rect),
          _generateSkin(data.skin),
        )},
        ...${_generateSpecific(data.specific)},
      ${_generateChildren(service, children)}
                }
                    )
                meta3dState = data[0]
    ` ++
      _generateHandleUIControlEventStr(service, protocol.configLib, data.event) ++
      _generateIsDrawIfEnd()
    },
    `
                let data = null
  `,
  )
}

let _generateElementState = elementStateFields => {
  elementStateFields
  ->Meta3dCommonlib.ArraySt.reduceOneParam(
    (.
      map,
      {name, type_, defaultValue}: FrontendUtils.ElementAssembleStoreType.elementStateFieldData,
    ) => {
      switch type_ {
      | #string => map->Meta3dCommonlib.ImmutableHashMap.set(name, defaultValue)
      | #int =>
        map->Meta3dCommonlib.ImmutableHashMap.set(
          name,
          defaultValue->Obj.magic->IntUtils.stringToInt->Obj.magic,
        )
      | #bool =>
        map->Meta3dCommonlib.ImmutableHashMap.set(
          name,
          defaultValue->Obj.magic->BoolUtils.stringToBool->Obj.magic,
        )
      }
    },
    Meta3dCommonlib.ImmutableHashMap.createEmpty(),
  )
  ->Obj.magic
  ->Js.Json.stringify
}

let _generateReducers = (reducers: FrontendUtils.ElementAssembleStoreType.reducers) => {
  switch reducers.role {
  | None => "null"
  | Some(role) =>
    {
      "role": role,
      "handlers": reducers.handlers->Meta3dCommonlib.ListSt.toArray,
    }
    ->Obj.magic
    ->Js.Json.stringify
  }
}

let generateElementContributeFileStr = (service, mr: elementMR): string => {
  let {elementName, execOrder, elementStateFields, reducers} = mr.element

  let str = {
    j`
window.Contribute = {
    getContribute: (api, [dependentExtensionNameMap, _]) => {
        let { meta3dUIExtensionName, meta3dEventExtensionName } = dependentExtensionNameMap

        return {
            elementName:"${elementName}",
            execOrder: ${execOrder->Js.Int.toString},
            elementState: ${_generateElementState(elementStateFields)},
            reducers: ${_generateReducers(reducers)},
            elementFunc: (meta3dState, elementState) => {
                let { getSkin, getUIControl } = api.getExtensionService(meta3dState, meta3dUIExtensionName)

                let uiState = api.getExtensionState(meta3dState, meta3dUIExtensionName)
`
  }

  let str = str ++ _generateGetUIControlsStr(service, mr.uiControls)

  let str = str ++ _generateAllDrawUIControlAndHandleEventStr(service, mr.uiControls)

  let str =
    str ++ `
  return new Promise((resolve) => {
                    resolve(meta3dState)
                })
  `

  let str =
    str ++ `
            }
        }
    }
}
  `

  str
}
