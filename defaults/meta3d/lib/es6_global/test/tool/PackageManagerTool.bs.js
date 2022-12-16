


var prepareStartFlag = (function(){window.startFlag = 0});

var prepareInitFlag = (function(){window.initFlag = 0});

function buildEmptyExtensionFileStr(param) {
  return "window.Extension = { getExtensionService: (api, dependentData) =>{ return {} }, createExtensionState: () => {}, getExtensionLife: (api, extensionName) =>{ return { } } } ";
}

function buildEmptyExtensionFileStrWithOnInit(addNumber) {
  return "window.Extension = { getExtensionService: (api, dependentData) =>{return {}}, createExtensionState: () => {}, getExtensionLife: (api, extensionName) =>{ return { onInit: (meta3dState, service, data) =>{ window.initFlag += " + addNumber.toString() + " + data; return new Promise((resolve) =>{\nresolve(meta3dState)\n  }) ; } } } }";
}

function buildEmptyContributeFileStr(param) {
  return "window.Contribute = { getContribute: (api, dependentData) =>{ return {} }}";
}

var getInitFlag = (function(){return window.initFlag});

export {
  prepareStartFlag ,
  prepareInitFlag ,
  buildEmptyExtensionFileStr ,
  buildEmptyExtensionFileStrWithOnInit ,
  buildEmptyContributeFileStr ,
  getInitFlag ,
}
/* No side effect */
