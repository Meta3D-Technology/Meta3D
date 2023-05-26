// let prepareStartFlag = %raw(` function(){window.startFlag = 0} `)

let prepareInitFlag = %raw(` function(){window.initFlag = 0} `)

let prepareFlagForSevice = %raw(` function(){window.serviceFlag = 0} `)

// let prepareUpdateFlag = %raw(` function(){window.updateFlag = 0} `)

let buildEmptyExtensionFileStr = () => {
  `window.Extension = { getExtensionService: (api) =>{ return {} }, createExtensionState: () => {}, getExtensionLife: (api, extensionName) =>{ return { } } } `
}

// let buildEmptyExtensionFileStrWithOnStart = (addNumber: int) => {
//   j`window.Extension = { getExtensionService: (api) =>{return {}}, createExtensionState: () => {}, getExtensionLife: (api, extensionName) =>{ return { onStart: (meta3dState, service, configData) =>{ window.startFlag += ${addNumber->Js.Int.toString} + configData[0].height; } } } }`
// }

let buildEmptyExtensionFileStrWithOnInit = (addNumber: int) => {
  j`window.Extension = { getExtensionService: (api) =>{return {}}, createExtensionState: () => {}, getExtensionLife: (api, extensionName) =>{ return { onInit: (meta3dState, service, data) =>{ window.initFlag += ${addNumber->Js.Int.toString} + data; return new Promise((resolve) =>{
resolve(meta3dState)
  }) ; } } } }`
}

// let buildEmptyExtensionFileStrWithOnUpdate = (addNumber: int) => {
//   j`window.Extension = { getExtensionService: (api) =>{return {}}, createExtensionState: () => {}, getExtensionLife: (api, extensionName) =>{ return { onUpdate: (meta3dState, service, data) =>{ window.updateFlag += ${addNumber->Js.Int.toString} + data; return new Promise((resolve) =>{
// resolve(meta3dState)
//   }) ; } } } }`
// }

let buildEmptyExtensionFileStrWithService = () => {
  `
window.Extension = {
    getExtensionService: (api) => {
        return {
            func1: (flag) => {
                window.serviceFlag += flag
            }
        }
    }, createExtensionState: () => { }, getExtensionLife: (api, extensionName) => { return {} }
}
  `
}

let buildEmptyContributeFileStr = () => {
  `window.Contribute = { getContribute: (api) =>{ return {} }}`
}

// let getStartFlag = %raw(` function(){return window.startFlag} `)

let getInitFlag = %raw(` function(){return window.initFlag} `)

let getServiceFlag = %raw(` function(){return window.serviceFlag} `)
