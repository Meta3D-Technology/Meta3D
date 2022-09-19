@val external document: Dom.htmlDocument = ""

// let getBody = state => Obj.magic(document)["body"]->EventType.bodyToEventTarget
let getBody = state => Obj.magic(document)["body"]
