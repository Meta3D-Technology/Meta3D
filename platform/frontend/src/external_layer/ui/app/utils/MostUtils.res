let _isFromEventStream = %raw(` function(stream){ var source = stream.source; return !!source.event && !!source.source; } `)

let concatArray = streamArr =>
  switch Js.Array.length(streamArr) {
  | 0 => Meta3dBsMost.Most.just(Obj.magic(1))
  | _ =>
    streamArr
    ->Meta3dCommonlib.ArraySt.sliceFrom(1)
    ->Meta3dCommonlib.ArraySt.reduceOneParam(
      (. stream1, stream2) =>
        _isFromEventStream(stream1) === true
          ? stream2->Meta3dBsMost.Most.concat(stream1)
          : stream2->Meta3dBsMost.Most.concat(stream1),
      streamArr[0],
    )
  }
