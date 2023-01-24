open Sinon

let buildReactRef = (value): React.ref<'value> => {current: value}

let getReactRefValue = (ref: React.ref<'value>) => ref.current

let getValue = (~setLocalValueStub, ~callIndex=0, ()) => {
  (setLocalValueStub->SinonTool.getFirstArg(~stub=_, ~callIndex, ()))()
}

let buildEmptySetStateFunc = () => {
  () => ()
}
