let prepareStartFlag = %raw(` function(){window.startFlag = 0} `)

let prepareInitFlag = %raw(` function(){window.initFlag = 0} `)

let prepareUpdateFlag = %raw(` function(){window.updateFlag = 0} `)

let buildEmptyExtensionFileStr = () => {
  `window.Extension = { getExtensionService: (api, dependentData) =>{ return {} }, createExtensionState: () => {}, getExtensionLife: (api, extensionName) =>{ return { } } } `
}

let buildEmptyExtensionFileStrWithOnStart = (addNumber: int) => {
  j`window.Extension = { getExtensionService: (api, dependentData) =>{return {}}, createExtensionState: () => {}, getExtensionLife: (api, extensionName) =>{ return { onStart: (meta3dState, service) =>{ window.startFlag += ${addNumber->Js.Int.toString}; } } } }`
}

let buildEmptyExtensionFileStrWithOnInit = (addNumber: int) => {
  j`window.Extension = { getExtensionService: (api, dependentData) =>{return {}}, createExtensionState: () => {}, getExtensionLife: (api, extensionName) =>{ return { onInit: (meta3dState, service) =>{ window.initFlag += ${addNumber->Js.Int.toString}; return new Promise((resolve) =>{
resolve(meta3dState)
  }) ; } } } }`
}

let buildEmptyExtensionFileStrWithOnUpdate = (addNumber: int) => {
  j`window.Extension = { getExtensionService: (api, dependentData) =>{return {}}, createExtensionState: () => {}, getExtensionLife: (api, extensionName) =>{ return { onUpdate: (meta3dState, service) =>{ window.updateFlag += ${addNumber->Js.Int.toString}; return new Promise((resolve) =>{
resolve(meta3dState)
  }) ; } } } }`
}


let buildEmptyContributeFileStr = () => {
  `window.Contribute = { getContribute: (api, dependentData) =>{ return {} }}`
}

let getStartFlag = %raw(` function(){return window.startFlag} `)

let getInitFlag = %raw(` function(){return window.initFlag} `)

let getUpdateFlag = %raw(` function(){return window.updateFlag} `)
