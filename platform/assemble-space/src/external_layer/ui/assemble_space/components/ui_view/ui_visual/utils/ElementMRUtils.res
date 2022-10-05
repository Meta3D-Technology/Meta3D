type element = {
  elementName: string,
  execOrder: int,
  elementStateFields: array<FrontendUtils.UIViewStoreType.elementStateFieldData>,
}

type protocol = {
  name: string,
  version: string,
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
  selectedUIControls,
  selectedUIControlInspectorData,
  elementStateFields,
): elementMR => {
  {
    element: {
      elementName: "UIViewElement",
      execOrder: 0,
      elementStateFields: elementStateFields,
    },
    uiControls: selectedUIControls->Meta3dCommonlib.ArraySt.reduceOneParam(
      (. uiControls, {id, data}: FrontendUtils.UIViewStoreType.uiControl) => {
        let {name, version} = data.contributePackageData.protocol

        uiControls->Meta3dCommonlib.ArraySt.push({
          protocol: {
            name: name,
            version: version,
          },
          data: _getSelectedUIControlInspectorData(selectedUIControlInspectorData, id),
        })
      },
      [],
    ),
  }
}

let _generateGetUIControlsStr = uiControls => {
  uiControls
  ->Meta3dCommonlib.ArraySt.removeDuplicateItemsWithBuildKeyFunc((. {protocol}) => {
    j`${protocol.name}_${protocol.version}`
  })
  ->Meta3dCommonlib.ArraySt.reduceOneParam((. str, {protocol}) => {
    let uiControlName = HandleUIControlProtocolUtils.generateUIControlName(protocol.name)

    str ++
    j`
    let ${uiControlName} = getUIControl(uiState,"${uiControlName}")
    `
  }, "")
}

let _generateAllDrawUIControlAndHandleEventStr = uiControls => {
  uiControls->Meta3dCommonlib.ArraySt.reduceOneParam(
    (. str, {protocol, data}) => {
      let {name, version} = protocol

      str ++
      j`
                data = ${HandleUIControlProtocolUtils.generateUIControlName(name)}(meta3dState,
                    ${HandleUIControlProtocolUtils.generateUIControlDataStr(name, version, data)})
                meta3dState = data[0]
    ` ++
      HandleUIControlProtocolUtils.generateHandleUIControlEventStr(name, version, data.event)
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

let generateElementContributeFileStr = (mr: elementMR): string => {
  let {elementName, execOrder, elementStateFields} = mr.element

  let str = {
    j`
window.Contribute = {
    getContribute: (api, [dependentExtensionNameMap, _]) => {
        let { meta3dUIExtensionName } = dependentExtensionNameMap

        return {
            elementName:"${elementName}",
            execOrder: ${execOrder->Js.Int.toString},
            elementState: ${_generateElementState(elementStateFields)},
            elementFunc: (meta3dState, elementState) => {
                let { getUIControl } = api.getExtensionService(meta3dState, meta3dUIExtensionName)

                let uiState = api.getExtensionState(meta3dState, meta3dUIExtensionName)
`
  }

  let str = str ++ _generateGetUIControlsStr(mr.uiControls)

  let str = str ++ _generateAllDrawUIControlAndHandleEventStr(mr.uiControls)

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
