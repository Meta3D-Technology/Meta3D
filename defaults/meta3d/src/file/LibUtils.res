type lib

type func

let serializeLib: (string, string) => lib = %raw(`
    function(fileStr, libraryName){
        try{
  eval('(' + "(function(){" + fileStr + "}())" + ')')

  return window[libraryName]
        }
        catch(e){
            console.error("libraryName: ", libraryName)
            console.error("fileStr: ", fileStr)
            throw new Error (e)
        }

    }
    `)

let getFuncFromLib: (lib, string) => func = %raw(`
    function(lib, funcName){
        return lib[funcName]
    }
    `)
