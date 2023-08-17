let buildUI = (~sandbox, ~account=None, ~service=ServiceTool.build(~sandbox, ()), ()) => {
  <ElementVisual service account />
}

let getAndSetNewestVisualExtension = ElementVisual.Method.getAndSetNewestVisualExtension

let startApp = ElementVisual.Method.startApp

let cancelAppLoop = ElementVisualUtils.cancelAppLoop

let setElementContributeToSpaceState = ElementVisual.Method.setElementContributeToSpaceState

let getVisualExtensionName = ElementVisual.Method._getVisualExtensionName

let loadAndBuildVisualExtension = (service, file) =>
  ElementVisualUtils._loadAndBuildVisualExtension(service, file)

let getVisualExtensionProtocolName = ElementVisual.Method._getVisualExtensionProtocolName

let prepareInitFlag = %raw(` function(){window.initFlag = 0} `)

let prepareUpdateFlag = %raw(` function(){window.updateFlag = 0} `)

let buildEmptyExtensionFileStr = () => {
  `window.Extension = { getExtensionService: (api) =>{ return {} }, createExtensionState: () => {}, getExtensionLife: (api, extensionName) =>{ return { } } } `
}

let buildEmptyExtensionFileStrWithOnInitAndOnUpdate = (
  addNumberForInit: int,
  addNumberForUpdate: int,
) => {
  j`window.Extension = { getExtensionService: (api) =>{return {}}, createExtensionState: () => {}, getExtensionLife: (api, extensionName) =>{ return { onInit: (meta3dState, service, data) =>{ window.initFlag += ${addNumberForInit->Js.Int.toString}; return new Promise((resolve) =>{
resolve(meta3dState)
  }) ; }, onUpdate: (meta3dState, service, data) =>{ window.updateFlag += ${addNumberForUpdate->Js.Int.toString}; return new Promise((resolve) =>{
resolve(meta3dState)
  }) ; } } } }`
}

let buildEmptyContributeFileStr = () => {
  `window.Contribute = { getContribute: (api) =>{ return {} }}`
}

let getInitFlag = %raw(` function(){return window.initFlag} `)

let getUpdateFlag = %raw(` function(){return window.updateFlag} `)

// let initApp = ElementVisual.Method._initApp

// let updateApp = ElementVisual.Method._updateApp

let generateElementContribute = (
  ~sandbox,
  ~service=ServiceTool.build(~sandbox, ()),
  ~protocolName=ElementContributeUtils.getElementContributeProtocolName(),
  ~protocolVersion=ElementContributeUtils.getElementContributeProtocolVersion(),
  ~elementName=ElementVisual.Method._getElementContributeName(),
  ~elementVersion=ElementVisual.Method._getElementContributeVersion(),
  ~account="meta3d",
  ~fileStr="",
  (),
) =>
  ElementVisual.Method._generateElementContribute(
    service,
    protocolName,
    protocolVersion,
    elementName,
    elementVersion,
    account,
    elementName,
    ElementContributeUtils.getElementContributeRepoLink(),
    ElementContributeUtils.getElementContributeDescription(),
    fileStr,
  )

let buildEmptyContributeFileStr = () => {
  `window.Contribute = { getContribute: (api) =>{ return {} }}`
}

let buildElementMR = ElementMRUtils.buildElementMR

let generateElementContributeFileStr = ElementMRUtils.generateElementContributeFileStr

let getUIProtocolVersion = ElementVisualUtils._getUIProtocolVersion

let getEventProtocolVersion = ElementVisualUtils._getEventProtocolVersion
