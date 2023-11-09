let toPromise = (stream: Meta3dBsMost.Most.stream<'a>): Js.Promise.t<'a> => {
  let result: ref<'a> = ref(Obj.magic(1))

  stream->Meta3dBsMost.Most.observe((value: 'a) => {
    result := value
  }, _)->Js.Promise.then_(_ => result.contents->Js.Promise.resolve, _)
}
