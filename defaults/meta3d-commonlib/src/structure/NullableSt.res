external unsafeGet: Js.Nullable.t<'a> => 'a = "%identity"

let return = data => data->Js.Nullable.return

let getWithDefault = (nullableData, default) =>{
	OptionSt.fromNullable(nullableData) -> OptionSt.getWithDefault(default)
}

let bind = Js.Nullable.bind