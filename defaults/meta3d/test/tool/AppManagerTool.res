let prepareFlag = %raw(` function(){window.startFlag = 0} `)

let buildEmptyExtensionFileStr = () => {
  `window.Extension = { getExtensionService: (api, dependentData) =>{ return {} }, createExtensionState: () => {}, getExtensionLife: (api, extensionName) =>{ return { } } } `
}

let buildEmptyExtensionFileStrWithOnStart = (addNumber: int) => {
  j`window.Extension = { getExtensionService: (api, dependentData) =>{return {}}, createExtensionState: () => {}, getExtensionLife: (api, extensionName) =>{ return { onStart: (meta3dState, service) =>{ window.startFlag += ${addNumber->Js.Int.toString}; return meta3dState; } } } }`
}

let buildEmptyContributeFileStr = () => {
  `window.Contribute = { getContribute: (api, dependentData) =>{ return {} }}`
}

let getFlag = %raw(` function(){return window.startFlag} `)
