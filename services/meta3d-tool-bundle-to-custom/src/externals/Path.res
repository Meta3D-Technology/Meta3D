type path = string

@module("path")
external dirname: path => path = "dirname"

@module("path")
external resolve1: path => path = "resolve"

@module("path")
external resolve2: (path, path) => path = "resolve"

@module("path")
external resolve3: (path, path, path) => path = "resolve"

@module("path")
external extname: (. string) => string = "extname"
