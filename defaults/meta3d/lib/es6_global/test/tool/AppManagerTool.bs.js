


var prepareStartFlag = (function(){window.startFlag = 0});

var prepareInitFlag = (function(){window.initFlag = 0});

var prepareUpdateFlag = (function(){window.updateFlag = 0});

function buildEmptyExtensionFileStr(param) {
  return "window.Extension = { getExtensionService: (api, dependentData) =>{ return {} }, createExtensionState: () => {}, getExtensionLife: (api, extensionName) =>{ return { } } } ";
}

function buildEmptyExtensionFileStrWithOnStart(addNumber) {
  return "window.Extension = { getExtensionService: (api, dependentData) =>{return {}}, createExtensionState: () => {}, getExtensionLife: (api, extensionName) =>{ return { onStart: (meta3dState, service) =>{ window.startFlag += " + addNumber.toString() + "; } } } }";
}

function buildEmptyExtensionFileStrWithOnInit(addNumber) {
  return "window.Extension = { getExtensionService: (api, dependentData) =>{return {}}, createExtensionState: () => {}, getExtensionLife: (api, extensionName) =>{ return { onInit: (meta3dState, service, data) =>{ window.initFlag += " + addNumber.toString() + " + data; return new Promise((resolve) =>{\nresolve(meta3dState)\n  }) ; } } } }";
}

function buildEmptyExtensionFileStrWithOnUpdate(addNumber) {
  return "window.Extension = { getExtensionService: (api, dependentData) =>{return {}}, createExtensionState: () => {}, getExtensionLife: (api, extensionName) =>{ return { onUpdate: (meta3dState, service, data) =>{ window.updateFlag += " + addNumber.toString() + " + data; return new Promise((resolve) =>{\nresolve(meta3dState)\n  }) ; } } } }";
}

function buildEmptyContributeFileStr(param) {
  return "window.Contribute = { getContribute: (api, dependentData) =>{ return {} }}";
}

var getStartFlag = (function(){return window.startFlag});

var getInitFlag = (function(){return window.initFlag});

var getUpdateFlag = (function(){return window.updateFlag});

export {
  prepareStartFlag ,
  prepareInitFlag ,
  prepareUpdateFlag ,
  buildEmptyExtensionFileStr ,
  buildEmptyExtensionFileStrWithOnStart ,
  buildEmptyExtensionFileStrWithOnInit ,
  buildEmptyExtensionFileStrWithOnUpdate ,
  buildEmptyContributeFileStr ,
  getStartFlag ,
  getInitFlag ,
  getUpdateFlag ,
  
}
/* No side effect */
