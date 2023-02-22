


var serializeLib = (function(fileStr, libraryName){
  eval('(' + "(function(){" + fileStr + "}())" + ')')

  return window[libraryName]
    });

var getFuncFromLib = (function(lib, funcName){
        return lib[funcName]
    });

export {
  serializeLib ,
  getFuncFromLib ,
}
/* No side effect */
