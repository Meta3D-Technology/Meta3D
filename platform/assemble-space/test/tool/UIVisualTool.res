let buildUI = (~sandbox, ~service=ServiceTool.build(~sandbox, ()), ()) => {
  <UIVisual service />
}

let getAndSetVisualExtension = UIVisual.Method.getAndSetVisualExtension

let renderApp = UIVisual.Method.renderApp

let loadAndBuildVisualExtension = UIVisual.Method._loadAndBuildVisualExtension

let getVisualExtensionName = UIVisual.Method._getVisualExtensionName

let getVisualExtensionProtocolName = UIVisual.Method._getVisualExtensionProtocolName

let getVisualExtensionProtocolVersion = UIVisual.Method._getVisualExtensionProtocolVersion

let getVisualExtensionVersion = UIVisual.Method._getVisualExtensionVersion

let prepareInitFlag = %raw(` function(){window.initFlag = 0} `)

let prepareUpdateFlag = %raw(` function(){window.updateFlag = 0} `)

let buildEmptyExtensionFileStr = () => {
  `window.Extension = { getExtensionService: (api, dependentData) =>{ return {} }, createExtensionState: () => {}, getExtensionLife: (api, extensionName) =>{ return { } } } `
}

let buildEmptyExtensionFileStrWithOnInitAndOnUpdate = (
  addNumberForInit: int,
  addNumberForUpdate: int,
) => {
  j`window.Extension = { getExtensionService: (api, dependentData) =>{return {}}, createExtensionState: () => {}, getExtensionLife: (api, extensionName) =>{ return { onInit: (meta3dState, service, data) =>{ window.initFlag += ${addNumberForInit->Js.Int.toString}; return new Promise((resolve) =>{
resolve(meta3dState)
  }) ; }, onUpdate: (meta3dState, service, data) =>{ window.updateFlag += ${addNumberForUpdate->Js.Int.toString}; return new Promise((resolve) =>{
resolve(meta3dState)
  }) ; } } } }`
}

let buildEmptyContributeFileStr = () => {
  `window.Contribute = { getContribute: (api, dependentData) =>{ return {} }}`
}

let getInitFlag = %raw(` function(){return window.initFlag} `)

let getUpdateFlag = %raw(` function(){return window.updateFlag} `)

// let initApp = UIVisual.Method._initApp

// let updateApp = UIVisual.Method._updateApp

let generateElementContribute = UIVisual.Method.generateElementContribute

let buildEmptyContributeFileStr = () => {
  `window.Contribute = { getContribute: (api, dependentData) =>{ return {} }}`
}

let buildElementMR = ElementMRUtils.buildElementMR

let generateElementContributeFileStr = ElementMRUtils.generateElementContributeFileStr
