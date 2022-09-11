open WindowType

@val @scope(("window"))
external \"open": (string, string)=> openResult  = ""


@val @scope(("window", "location"))
external reload: unit => unit  = ""