type inputName = string

type inputFunc<'data> = (. Meta3dType.Index.state) => Js.Promise.t<'data>

type inputContribute<'data> = {
  inputName: inputName,
  func: inputFunc<'data>,
}
