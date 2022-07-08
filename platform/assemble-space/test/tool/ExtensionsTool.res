open Sinon

// let hook = (
//   ~sandbox,
//   ~service=ServiceTool.build(~sandbox, ()),
//   ~selectedExtensionsFromShop=list{},
//   (),
// ) => {
//   Extensions.Method.hook(service, selectedExtensionsFromShop)
// }

let useEffectOnce = (
  ~sandbox,
  ~dispatch=createEmptyStub(refJsObjToSandbox(sandbox.contents)),
  ~setExtensions=createEmptyStub(refJsObjToSandbox(sandbox.contents)),
  ~service=ServiceTool.build(~sandbox, ()),
  ~selectedExtensionsFromShop=list{},
  (),
) => {
  Extensions.Method.useEffectOnce((dispatch, setExtensions), service, selectedExtensionsFromShop)
}
