open Sinon

let getValue = (~setLocalValueStub, ~callIndex=0, ()) => {
  (
    setLocalValueStub
    ->getCall(callIndex, _)
    ->getArgs
    ->Meta3dCommonlib.ListSt.head
    ->Meta3dCommonlib.OptionSt.getExn
  )()
}

let buildEmptySetStateFunc = () => {
  () => ()
}
