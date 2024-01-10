type ecsConfig

type service = {
  prepare: (Meta3dType.Index.state, bool, ecsConfig) => Meta3dType.Index.state,
  init: (Meta3dType.Index.state, Dom.htmlElement) => Js.Promise.t<Meta3dType.Index.state>,
  update: Meta3dType.Index.state => Js.Promise.t<Meta3dType.Index.state>,
  render: Meta3dType.Index.state => Js.Promise.t<Meta3dType.Index.state>,
  loadScene: (
    Meta3dType.Index.state,
    Js.Typed_array.ArrayBuffer.t,
  ) => Js.Promise.t<Meta3dType.Index.state>,
}
