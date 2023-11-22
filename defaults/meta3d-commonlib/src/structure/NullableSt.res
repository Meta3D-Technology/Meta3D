external unsafeGet: Js.Nullable.t<'a> => 'a = "%identity"

let getExn = data => {
  data->OptionSt.fromNullable->OptionSt.getExn
}

let return = data => data->Js.Nullable.return

let getWithDefault = (nullableData, default) => {
  OptionSt.fromNullable(nullableData)->OptionSt.getWithDefault(default)
}

let map = Js.Nullable.bind

let bind = (nullableData, func) => {
  nullableData
  ->OptionSt.fromNullable
  ->OptionSt.bind(val => func(. val)->OptionSt.fromNullable)
  ->OptionSt.toNullable
}

let isNullable = Js.Nullable.isNullable

let getEmpty = () => Js.Nullable.undefined
