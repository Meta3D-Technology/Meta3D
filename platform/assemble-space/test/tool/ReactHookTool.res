open Sinon

let buildReactRef = (value): React.ref<'value> => {current: value}

let getReactRefValue = (ref: React.ref<'value>) => ref.current

let getValue = (~setLocalValueStub, ~callIndex=0, ()) => {
  (setLocalValueStub->SinonTool.getFirstArg(~stub=_, ~callIndex, ()))()
}

let getValueWithArg1 = (~setLocalValueStub, ~arg1, ~callIndex=0, ()) => {
  (setLocalValueStub->SinonTool.getFirstArg(~stub=_, ~callIndex, ()))(arg1)
}

let buildEmptySetStateFunc = () => {
  (func) => []-> Obj.magic
}

// let buildUseStateStub = (~sandbox, ~callData=[], ()) => {
//   let useStateStub = createEmptyStub(refJsObjToSandbox(sandbox.contents))

//   (

//     useStateStub, callData->Js.Array.map(((callIndex, localValueRef)) => {
//       let setLocalValueFunc = func => {
//         Js.log(("set: ", localValueRef.contents, func(localValueRef.contents)))

//         localValueRef := func(localValueRef.contents)
//       }

//       useStateStub
//       ->onCall(callIndex, _)
//       ->returns((localValueRef.contents, setLocalValueFunc), _)
//       ->ignore

//       setLocalValueFunc
//     }, _))->Obj.magic
// }
