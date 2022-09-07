open Sinon

let getValue = (~setLocalValueStub, ~callIndex=0, ()) => {
  (setLocalValueStub->SinonTool.getFirstArg(~stub=_, ~callIndex, ()))()
}

let buildEmptySetStateFunc = () => {
  () => ()
}
