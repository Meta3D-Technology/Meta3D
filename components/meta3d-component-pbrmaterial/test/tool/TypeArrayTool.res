open StateType

let getDefaultDiffuseColor = state => state.defaultDiffuseColor

let getDefaultSpecular = state => state.defaultSpecular

let changeTypeArrayToTuple = typeArr => typeArr->Js.Array.from
