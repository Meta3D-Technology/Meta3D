let isUndefined = value => value === Obj.magic(Js.Nullable.undefined)

let isEmpty = value =>
  value === Obj.magic(Js.Nullable.null) || value === Obj.magic(Js.Nullable.undefined)

let isNotInMap = value => value->Obj.magic === Js.Nullable.undefined

let isInMap = value => value->Obj.magic !== Js.Nullable.undefined
