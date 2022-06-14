


var prepareFlag = (function(){window.startFlag = 0});

function buildEmptyExtensionFileStr(param) {
  return "window.Extension = { getExtensionService: (api, dependentData) =>{ return {} }, createExtensionState: () => {}, getExtensionLife: (api, extensionName) =>{ return { } } } ";
}

function buildEmptyExtensionFileStrWithOnStart(addNumber) {
  return "window.Extension = { getExtensionService: (api, dependentData) =>{return {}}, createExtensionState: () => {}, getExtensionLife: (api, extensionName) =>{ return { onStart: (meta3dState, service) =>{ window.startFlag += " + addNumber.toString() + "; return meta3dState; } } } }";
}

function buildEmptyContributeFileStr(param) {
  return "window.Contribute = { getContribute: (api, dependentData) =>{ return {} }}";
}

var getFlag = (function(){return window.startFlag});

export {
  prepareFlag ,
  buildEmptyExtensionFileStr ,
  buildEmptyExtensionFileStrWithOnStart ,
  buildEmptyContributeFileStr ,
  getFlag ,
  
}
/* No side effect */
