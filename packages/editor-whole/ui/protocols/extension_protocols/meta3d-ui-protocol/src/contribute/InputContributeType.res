type inputName = string

type inputParam

type inputFunc<'data> = (. Meta3dType.Index.state, array<inputParam>) => Js.Promise.t<'data>

type inputContribute<'data> = {
  inputName: inputName,
  func: inputFunc<'data>,
}
