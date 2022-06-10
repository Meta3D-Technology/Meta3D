'use strict';


var serializeLib = (function(fileStr, libraryName){
  eval('(' + "(function(){" + fileStr + "}())" + ')')

  return window[libraryName]
    });

var getFuncFromLib = (function(lib, funcName){
        return lib[funcName]
    });

exports.serializeLib = serializeLib;
exports.getFuncFromLib = getFuncFromLib;
/* No side effect */
