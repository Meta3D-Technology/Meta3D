@val external document: Dom.htmlDocument = "document"

// let getBody = state => Obj.magic(document)["body"]->Meta3dEventProtocol.EventType.bodyToEventTarget
let getBody = state => Obj.magic(document)["body"]
