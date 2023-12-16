type rec moment = {subtract: (. moment ) => moment, dayOfYear: (. unit ) => int, month: (. unit ) => int}

@module("moment")
external moment: (. unit) => moment = "default"

@module("moment")
external createMomentFromDate: (. string) => moment = "default"
