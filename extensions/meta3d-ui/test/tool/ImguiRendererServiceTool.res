open Sinon

let buildService = (
  ~sandbox,
  ~init=createEmptyStub(refJsObjToSandbox(sandbox.contents)),
  ~clear=createEmptyStub(refJsObjToSandbox(sandbox.contents)),
  ~render=createEmptyStub(refJsObjToSandbox(sandbox.contents)),
  ~drawBox=createEmptyStub(refJsObjToSandbox(sandbox.contents)),
  (),
): Meta3dImguiRendererProtocol.ServiceType.service => {
  {
    init: init,
    clear: clear,
    render: render,
    drawBox: drawBox,
  }
}