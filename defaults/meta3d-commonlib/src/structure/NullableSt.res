external unsafeGet: Js.Nullable.t<'a> => 'a = "%identity"

let return = data => data->Js.Nullable.return

let getWithDefault = (nullableData, default) => {
  OptionSt.fromNullable(nullableData)->OptionSt.getWithDefault(default)
}

let map = Js.Nullable.bind

let bind = (nullableData, func) => {
  nullableData
  ->OptionSt.fromNullable
  ->OptionSt.bind(val => func(val)->OptionSt.fromNullable)
  ->OptionSt.toNullable
}
