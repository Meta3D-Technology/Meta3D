type element = {
  elementName: string,
  execOrder: int,
  elementStateFields: array<FrontendUtils.UIViewStoreType.elementStateFieldData>,
  reducers: FrontendUtils.UIViewStoreType.reducers,
}

type protocolConfigLib = Meta3d.LibUtils.lib

type protocol = {
  name: string,
  version: string,
  configLib: protocolConfigLib,
}

type uiControl = {
  protocol: protocol,
  data: FrontendUtils.UIViewStoreType.uiControlInspectorData,
}

type elementMR = {
  element: element,
  uiControls: array<uiControl>,
}

let _getSelectedUIControlInspectorData = (selectedUIControlInspectorData, id) => {
  selectedUIControlInspectorData
  ->Meta3dCommonlib.ArraySt.find((data: FrontendUtils.UIViewStoreType.uiControlInspectorData) => {
    data.id == id
  })
  ->Meta3dCommonlib.OptionSt.getExn
}

let buildElementMR = (
  service: FrontendUtils.AssembleSpaceType.service,
  selectedUIControls,
  selectedUIControlInspectorData,
  (elementStateFields, reducers),
): elementMR => {
  {
    element: {
      elementName: "UIViewElement",
      execOrder: 0,
      elementStateFields: elementStateFields->Meta3dCommonlib.ListSt.toArray,
      reducers: reducers,
    },
    uiControls: selectedUIControls->Meta3dCommonlib.ArraySt.reduceOneParam(
      (. uiControls, {id, protocolConfigStr, data}: FrontendUtils.UIViewStoreType.uiControl) => {
        let {name, version} = data.contributePackageData.protocol

        uiControls->Meta3dCommonlib.ArraySt.push({
          protocol: {
            name: name,
            version: version,
            configLib: service.meta3d.serializeUIControlProtocolConfigLib(. protocolConfigStr),
          },
          data: _getSelectedUIControlInspectorData(selectedUIControlInspectorData, id),
        })
      },
      [],
    ),
  }
}

let _generateGetUIControlsStr = (service: FrontendUtils.AssembleSpaceType.service, uiControls) => {
  uiControls
  ->Meta3dCommonlib.ArraySt.removeDuplicateItemsWithBuildKeyFunc((. {protocol}) => {
    j`${protocol.name}_${protocol.version}`
  })
  ->Meta3dCommonlib.ArraySt.reduceOneParam((. str, {protocol}) => {
    let uiControlName = service.meta3d.generateUIControlName(. protocol.configLib)

    str ++
    j`
    let ${uiControlName} = getUIControl(uiState,"${uiControlName}")
    `
  }, "")
}

let getActionName = (event: FrontendUtils.UIViewStoreType.event, eventName) => {
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

let _generateAllDrawUIControlAndHandleEventStr = (
  service: FrontendUtils.AssembleSpaceType.service,
  uiControls,
) => {
  uiControls->Meta3dCommonlib.ArraySt.reduceOneParam(
    (. str, {protocol, data}) => {
      let {name, version, configLib} = protocol

      str ++
      j`
                data = ${service.meta3d.generateUIControlName(. configLib)}(meta3dState,
                    ${service.meta3d.generateUIControlDataStr(. configLib, data.rect)})
                meta3dState = data[0]
    ` ++
      _generateHandleUIControlEventStr(service, configLib, data.event)
    },
    `
                let data = null
  `,
  )
}

let _generateElementState = elementStateFields => {
  elementStateFields
  ->Meta3dCommonlib.ArraySt.reduceOneParam(
    (. map, {name, defaultValue}: FrontendUtils.UIViewStoreType.elementStateFieldData) => {
      map->Meta3dCommonlib.ImmutableHashMap.set(name, defaultValue)
    },
    Meta3dCommonlib.ImmutableHashMap.createEmpty(),
  )
  ->Obj.magic
  ->Js.Json.stringify
}

let _generateReducers = (reducers: FrontendUtils.UIViewStoreType.reducers) => {
  switch reducers.role {
  | None => "null"
  | Some(role) =>
    // Meta3dCommonlib.ImmutableHashMap.createEmpty()
    // ->Meta3dCommonlib.ImmutableHashMap.set("role", role)
    // ->Meta3dCommonlib.ImmutableHashMap.set(
    //   "handlers",
    //   reducers.handlers->Meta3dCommonlib.ListSt.toArray,
    // )
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
        let { meta3dUIExtensionName } = dependentExtensionNameMap

        return {
            elementName:"${elementName}",
            execOrder: ${execOrder->Js.Int.toString},
            elementState: ${_generateElementState(elementStateFields)},
            reducers: ${_generateReducers(reducers)},
            elementFunc: (meta3dState, elementState) => {
                let { getUIControl } = api.getExtensionService(meta3dState, meta3dUIExtensionName)

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
