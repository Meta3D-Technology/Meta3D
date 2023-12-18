'use strict';


var serializeLib = (function(fileStr, libraryName){
        try{
  eval('(' + "(function(){" + fileStr + "}())" + ')')

  return window[libraryName]
        }
        catch(e){
            console.error("libraryName: ", libraryName)
            console.error("fileStr: ", fileStr)
            throw new Error (e)
        }

    });

var getFuncFromLib = (function(lib, funcName){
        return lib[funcName]
    });

exports.serializeLib = serializeLib;
exports.getFuncFromLib = getFuncFromLib;
/* No side effect */
