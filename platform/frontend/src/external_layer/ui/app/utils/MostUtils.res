let _isFromEventStream = %raw(` function(stream){ var source = stream.source; return !!source.event && !!source.source; } `)

let concatArray = streamArr =>
  switch Js.Array.length(streamArr) {
  | 0 => Meta3dBsMostDefault.Most.just(Obj.magic(1))
  | _ =>
    streamArr
    ->Meta3dCommonlib.ArraySt.sliceFrom(1)
    ->Meta3dCommonlib.ArraySt.reduceOneParam(
      (. stream1, stream2) =>
        _isFromEventStream(stream1) === true
          ? stream2->Meta3dBsMostDefault.Most.concat(stream1)
          : stream2->Meta3dBsMostDefault.Most.concat(stream1),
      streamArr[0],
    )
  }

let toPromise = (stream: Meta3dBsMostDefault.Most.stream<'a>): Js.Promise.t<'a> => {
  let result: ref<'a> = ref(Obj.magic(1))

  stream->Meta3dBsMostDefault.Most.observe((value: 'a) => {
    result := value
  }, _)->Js.Promise.then_(_ => result.contents->Js.Promise.resolve, _)
}
