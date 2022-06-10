type lib

type func

let serializeLib: (string, string) => lib = %raw(`
    function(fileStr, libraryName){
  eval('(' + "(function(){" + fileStr + "}())" + ')')

  return window[libraryName]
    }
    `)

let getFuncFromLib: (lib, string) => func = %raw(`
    function(lib, funcName){
        return lib[funcName]
    }
    `)
