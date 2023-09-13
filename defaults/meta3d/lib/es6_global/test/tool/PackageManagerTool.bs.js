


var prepareInitFlag = (function(){window.initFlag = 0});

var prepareFlagForSevice = (function(){window.serviceFlag = 0});

function buildEmptyExtensionFileStr(param) {
  return "window.Extension = { getExtensionService: (api) =>{ return {} }, createExtensionState: () => {}, getExtensionLife: (api, extensionName) =>{ return { } } } ";
}

function buildEmptyExtensionFileStrWithOnInit(addNumber) {
  return "window.Extension = { getExtensionService: (api) =>{return {}}, createExtensionState: () => {}, getExtensionLife: (api, extensionName) =>{ return { onInit: (meta3dState, service, data) =>{ window.initFlag += " + addNumber.toString() + " + data; return new Promise((resolve) =>{\nresolve(meta3dState)\n  }) ; } } } }";
}

function buildEmptyExtensionFileStrWithService(param) {
  return "\nwindow.Extension = {\n    getExtensionService: (api) => {\n        return {\n            func1: (flag) => {\n                window.serviceFlag += flag\n            }\n        }\n    }, createExtensionState: () => { }, getExtensionLife: (api, extensionName) => { return {} }\n}\n  ";
}

function buildEmptyContributeFileStr(param) {
  return "window.Contribute = { getContribute: (api) =>{ return {} }}";
}

var getInitFlag = (function(){return window.initFlag});

var getServiceFlag = (function(){return window.serviceFlag});

export {
  prepareInitFlag ,
  prepareFlagForSevice ,
  buildEmptyExtensionFileStr ,
  buildEmptyExtensionFileStrWithOnInit ,
  buildEmptyExtensionFileStrWithService ,
  buildEmptyContributeFileStr ,
  getInitFlag ,
  getServiceFlag ,
}
/* No side effect */
