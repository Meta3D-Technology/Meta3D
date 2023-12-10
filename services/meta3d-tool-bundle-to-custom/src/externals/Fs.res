type options = string

type statSyncFn = {isFile: (. unit) => bool, isDirectory: (. unit) => bool}

@module("fs")
external readFileSync: (. string, options) => string = "readFileSync"

@module("fs")
external statSync: (. string) => statSyncFn = "statSync"

@module("fs")
external existsSync: (. string) => bool = "existsSync"
