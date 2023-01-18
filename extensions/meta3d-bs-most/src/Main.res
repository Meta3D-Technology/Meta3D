let _isFromEventStream = %raw(` function(stream){ var source = stream.source; return !!source.event && !!source.source; } `)

let concatArray = streamArr =>
  switch Js.Array.length(streamArr) {
  | 0 => Most.just(Obj.magic(1))
  | _ =>
    streamArr
    ->Meta3dCommonlib.ArraySt.sliceFrom(1)
    ->Meta3dCommonlib.ArraySt.reduceOneParam(
      (. stream1, stream2) =>
        _isFromEventStream(stream1) === true
          ? stream2->Most.concat(stream1)
          : stream2->Most.concat(stream1),
      streamArr[0],
    )
  }

let callFunc = func => {
  Most.just(func)->Most.map(func => func(), _)
}

let getExtensionService: Meta3dType.Index.getExtensionService<
  Meta3dBsMostProtocol.DependentMapType.dependentExtensionProtocolNameMap,
  Meta3dBsMostProtocol.DependentMapType.dependentContributeProtocolNameMap,
  Meta3dBsMostProtocol.ServiceType.service,
> = (api, _) => {
  tap: Most.tap,
  filter: Most.filter,
  take: Most.take,
  fromEvent: Most.fromEvent->Obj.magic,
  fromPromise: Most.fromPromise->Obj.magic,
  just: Most.just,
  map: Most.map,
  flatMap: Most.flatMap,
  mergeArray: Most.mergeArray,
  concat: Most.concat,
  concatArray: concatArray,
  callFunc: callFunc,
  drain: Most.drain,
}

let createExtensionState: Meta3dType.Index.createExtensionState<
  Meta3dBsMostProtocol.StateType.state,
> = () => {
  ()
}

let getExtensionLife: Meta3dType.Index.getExtensionLife<
  Meta3dBsMostProtocol.ServiceType.service,
> = (_, _) => {
  {
    onRegister: Js.Nullable.null,
    onStart: Js.Nullable.null,
    onInit: Js.Nullable.null,
    onUpdate: Js.Nullable.null,
  }
}
