type meta = {
  elementName: string,
  execOrder: int,
  // elementState:
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
  meta: meta,
  body: array<uiControl>,
}

let _getSelectedUIControlInspectorData = (selectedUIControlInspectorData, id) => {
  selectedUIControlInspectorData
  ->Meta3dCommonlib.ArraySt.find((data: FrontendUtils.UIViewStoreType.uiControlInspectorData) => {
    data.id == id
  })
  ->Meta3dCommonlib.OptionSt.getExn
}

let buildElementMR = (selectedUIControls, selectedUIControlInspectorData): elementMR => {
  {
    meta: {
      elementName: "UIViewElement",
      execOrder: 0,
    },
    body: selectedUIControls->Meta3dCommonlib.ArraySt.reduceOneParam(
      (. body, {id, data}: FrontendUtils.UIViewStoreType.uiControl) => {
        let {name, version} = data.contributePackageData.protocol

        body->Meta3dCommonlib.ArraySt.push({
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

let _generateUIControlName = protocolName => {
  switch protocolName {
  | "meta3d-ui-control-button-protocol" => "Button"
  | _ =>
    Meta3dCommonlib.Exception.throwErr(
      Meta3dCommonlib.Exception.buildErr(
        Meta3dCommonlib.Log.buildErrorMessage(
          ~title={j`unknown protocol name: ${protocolName}`},
          ~description={
            j``
          },
          ~reason="",
          ~solution=j``,
          ~params=j``,
        ),
      ),
    )
  }
}

let _generateUIControlDataStr = (
  protocolName,
  protocolVersion,
  data: FrontendUtils.UIViewStoreType.uiControlInspectorData,
) => {
  switch protocolName {
  | "meta3d-ui-control-button-protocol" =>
    j`
  {
    rect: ${data.rect->Obj.magic->Js.Json.stringify}
  }
  `
  | _ =>
    Meta3dCommonlib.Exception.throwErr(
      Meta3dCommonlib.Exception.buildErr(
        Meta3dCommonlib.Log.buildErrorMessage(
          ~title={j`unknown protocol name: ${protocolName}`},
          ~description={
            j``
          },
          ~reason="",
          ~solution=j``,
          ~params=j``,
        ),
      ),
    )
  }
}

let _generateGetUIControlsStr = body => {
  body
  ->Meta3dCommonlib.ArraySt.removeDuplicateItemsWithBuildKeyFunc((. {protocol}) => {
    j`${protocol.name}_${protocol.version}`
  })
  ->Meta3dCommonlib.ArraySt.reduceOneParam((. str, {protocol}) => {
    let uiControlName = _generateUIControlName(protocol.name)

    str ++
    j`
    let ${uiControlName} = getUIControl(uiState,"${uiControlName}")
    `
  }, "")
}

let _generateDrawUIControlsStr = body => {
  body->Meta3dCommonlib.ArraySt.reduceOneParam(
    (. str, {protocol, data}) => {
      let protocolName = protocol.name

      str ++
      j`
                data = ${_generateUIControlName(protocolName)}(meta3dState,
                    ${_generateUIControlDataStr(protocolName, protocol.version, data)})
                meta3dState = data[0]
    `
    },
    `
                let data = null
  `,
  )
}

let generateElementContributeFileStr = (mr: elementMR): string => {
  // let elementFuncBody =

  let {elementName, execOrder} = mr.meta

  let str = {
    j`
window.Contribute = {
    getContribute: (api, [dependentExtensionNameMap, _]) => {
        let { meta3dUIExtensionName } = dependentExtensionNameMap

        return {
            elementName:"${elementName}",
            execOrder: ${execOrder->Js.Int.toString},
            elementState: null,
            elementFunc: (meta3dState, elementState) => {
                let { getUIControl } = api.getExtensionService(meta3dState, meta3dUIExtensionName)

                let uiState = api.getExtensionState(meta3dState, meta3dUIExtensionName)
`
  }

  let str = str ++ _generateGetUIControlsStr(mr.body)

  let str = str ++ _generateDrawUIControlsStr(mr.body)

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
