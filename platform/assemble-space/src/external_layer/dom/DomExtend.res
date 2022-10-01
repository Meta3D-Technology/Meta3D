@val external document: Dom.htmlDocument = ""

@return(null_to_opt) @send
external querySelector: (Dom.htmlDocument, string) => option<Dom.htmlElement> = ""