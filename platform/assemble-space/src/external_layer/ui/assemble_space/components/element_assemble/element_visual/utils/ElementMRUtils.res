type element = {
  elementName: string,
  execOrder: int,
  elementStateFields: array<FrontendUtils.ElementAssembleStoreType.elementStateFieldData>,
  // reducers: FrontendUtils.ElementAssembleStoreType.reducers,
}

type protocolConfigLib = Meta3d.LibUtils.lib

type protocol = {
  name: string,
  version: string,
  configLib: protocolConfigLib,
}

type rec uiControl = {
  displayName: string,
  protocol: protocol,
  data: FrontendUtils.ElementAssembleStoreType.uiControlInspectorData,
  children: array<uiControl>,
}

type elementMR = {
  element: element,
  uiControls: array<uiControl>,
}

let rec _buildUIControls = (
  service: FrontendUtils.AssembleSpaceType.service,
  selectedUIControls,
  selectedUIControlInspectorData,
) => {
  selectedUIControls->Meta3dCommonlib.ArraySt.reduceOneParam(
    (.
      uiControls,
      {id, children, protocolConfigStr, data}: FrontendUtils.ElementAssembleStoreType.uiControl,
    ) => {
      let {name, version} = data.contributePackageData.protocol

      uiControls->Meta3dCommonlib.ArraySt.push({
        displayName: (
          service.meta3d.execGetContributeFunc(. data.contributeFuncData)->Obj.magic
        )["uiControlName"],
        protocol: {
          name,
          version,
          configLib: service.meta3d.serializeUIControlProtocolConfigLib(. protocolConfigStr),
        },
        data: HierachyUtils.findSelectedUIControlData(
          None,
          (
            (data: FrontendUtils.ElementAssembleStoreType.uiControlInspectorData) => data.id,
            (data: FrontendUtils.ElementAssembleStoreType.uiControlInspectorData) => data.children,
          ),
          selectedUIControlInspectorData->Meta3dCommonlib.ListSt.fromArray,
          id,
        )->Meta3dCommonlib.OptionSt.getExn,
        children: children
        ->Meta3dCommonlib.ListSt.toArray
        ->_buildUIControls(service, _, selectedUIControlInspectorData),
      })
    },
    [],
  )
}

let buildElementMR = (
  service: FrontendUtils.AssembleSpaceType.service,
  elementName,
  selectedUIControls,
  selectedUIControlInspectorData,
  elementStateFields,
): elementMR => {
  {
    element: {
      elementName,
      execOrder: 0,
      elementStateFields: elementStateFields->Meta3dCommonlib.ListSt.toArray,
      // reducers,
    },
    uiControls: _buildUIControls(service, selectedUIControls, selectedUIControlInspectorData),
  }
}

let _generateGetUIControlsStr = (service: FrontendUtils.AssembleSpaceType.service, uiControls) => {
  uiControls
  ->Meta3dCommonlib.ArraySt.removeDuplicateItemsWithBuildKeyFunc((. {displayName}) => {
    displayName
  })
  ->Meta3dCommonlib.ArraySt.reduceOneParam((. str, {displayName, protocol}) => {
    str ++
    j`
    let ${displayName} = getUIControlFunc(uiState,"${displayName}")
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
    )->Meta3dCommonlib.ArraySt.map(((  eventName, _  )) => {
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

// let _generateSpecific = (specific: FrontendUtils.ElementAssembleStoreType.specific): string => {
//   specific
//   ->Meta3dCommonlib.ArraySt.reduceOneParam(
//     (. map, {name, type_, value}: FrontendUtils.ElementAssembleStoreType.specificData) => {
//       map->Meta3dCommonlib.ImmutableHashMap.set(
//         name,
//         switch value {
//         | SpecicFieldDataValue(value) => SpecificUtils.convertValueToString(value, type_)
//         | ElementStateFieldForSpecificDataValue(value) => j`elementState.${value}`
//         },
//       )
//     },
//     Meta3dCommonlib.ImmutableHashMap.createEmpty(),
//   )
//   ->Obj.magic
//   ->Js.Json.stringify
// }

let _generateSpecific = (specific: FrontendUtils.ElementAssembleStoreType.specific): string => {
  specific->Meta3dCommonlib.ArraySt.reduceOneParam(
    (. result, {name, type_, value}: FrontendUtils.ElementAssembleStoreType.specificData) => {
      result ++
      j`${name}: ` ++
      switch value {
      | SpecicFieldDataValue(value) =>
        switch type_ {
        | #string => j`"${value->Obj.magic}"`
        | _ => SpecificUtils.convertValueToString(value, type_)
        }
      | ElementStateFieldForSpecificDataValue(value) => j`elementState.${value}`
      }

      // map->Meta3dCommonlib.ImmutableHashMap.set(
      //   name,
      //   switch value {
      //   | SpecicFieldDataValue(value) => SpecificUtils.convertValueToString(value, type_)
      //   | ElementStateFieldForSpecificDataValue(value) => j`elementState.${value}`
      //   },
      // )
    },
    "{",
  ) ++ "}"
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
    ? {j`childrenFunc:(meta3dState) => new Promise((resolve, reject) => resolve(meta3dState))`}
    : {
        let str = j`childrenFunc: (meta3dState) =>{
                let uiState = api.getExtensionState(meta3dState, "meta3d-ui-protocol")
    `
        let str = str ++ _generateGetUIControlsStr(service, children)

        let str =
          str ++
          _generateAllDrawUIControlAndHandleEventStr(service, children) ++ {
            j`
        return new Promise((resolve, reject) => resolve(meta3dState))
        `
          }

        str ++ "}"
      }
}
and _generateAllDrawUIControlAndHandleEventStr = (
  service: FrontendUtils.AssembleSpaceType.service,
  uiControls,
) => {
  let (str, endCount) = uiControls->Meta3dCommonlib.ArraySt.reduceOneParam(
    (. (str, endCount), {displayName, protocol, data, children}) => {
      (
        str ++
        _generateIsDrawIfBegin(data.isDraw) ++
        j`
                 return ${displayName}(meta3dState,
                {
                  ...${service.meta3d.generateUIControlCommonDataStr(.
            protocol.configLib,
            _generateRect(data.rect),
          )},
        ...${_generateSpecific(data.specific)},
      ${_generateChildren(service, children)}
                }
                    ).then(data =>{
                meta3dState = data[0]
` ++
        _generateHandleUIControlEventStr(service, protocol.configLib, data.event),
        endCount->succ,
      )
    },
    (
      `
                let data = null
  `,
      0,
    ),
  )

  let str =
    str ++ `
  return new Promise((resolve) => {
                    resolve(meta3dState)
                })
                `

  Meta3dCommonlib.ArraySt.range(0, endCount - 1)->Meta3dCommonlib.ArraySt.reduceOneParam(
    (. str, _) => {
      str ++ `})` ++ _generateIsDrawIfEnd()
    },
    str,
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

// let _generateReducers = (reducers: FrontendUtils.ElementAssembleStoreType.reducers) => {
//   switch reducers.role {
//   | None => "null"
//   | Some(role) =>
//     {
//       "role": role,
//       "handlers": reducers.handlers->Meta3dCommonlib.ListSt.toArray,
//     }
//     ->Obj.magic
//     ->Js.Json.stringify
//   }
// }

let generateElementContributeFileStr = (service, mr: elementMR): string => {
  let {elementName, execOrder, elementStateFields} = mr.element

  let str = {
    j`
window.Contribute = {
    getContribute: (api) => {
        return {
            elementName:"${elementName}",
            execOrder: ${execOrder->Js.Int.toString},
            elementState: ${_generateElementState(elementStateFields)},
            elementFunc: (meta3dState, elementState) => {
                let { getUIControlFunc } = api.getExtensionService(meta3dState, "meta3d-ui-protocol")

                let uiState = api.getExtensionState(meta3dState, "meta3d-ui-protocol")
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
