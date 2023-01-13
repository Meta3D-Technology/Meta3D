open Sinon

let buildService = (
  ~sandbox,
  ~init=createEmptyStub(refJsObjToSandbox(sandbox.contents)),
  ~clear=createEmptyStub(refJsObjToSandbox(sandbox.contents)),
  ~render=createEmptyStub(refJsObjToSandbox(sandbox.contents)),
  ~beforeExec=createEmptyStub(refJsObjToSandbox(sandbox.contents)),
  ~afterExec=createEmptyStub(refJsObjToSandbox(sandbox.contents)),
  ~setStyle=createEmptyStub(refJsObjToSandbox(sandbox.contents)),
  ~beginWindow=createEmptyStub(refJsObjToSandbox(sandbox.contents)),
  ~endWindow=createEmptyStub(refJsObjToSandbox(sandbox.contents)),
  ~setNextWindowRect=createEmptyStub(refJsObjToSandbox(sandbox.contents)),
  ~addFBOTexture=createEmptyStub(refJsObjToSandbox(sandbox.contents)),
  ~getContext=createEmptyStub(refJsObjToSandbox(sandbox.contents)),
  ~button=createEmptyStub(refJsObjToSandbox(sandbox.contents)),
  ~setCursorPos=createEmptyStub(refJsObjToSandbox(sandbox.contents)),
  (),
): Meta3dImguiRendererProtocol.ServiceType.service => {
  {
    init,
    clear,
    render,
    beforeExec,
    afterExec,
    setStyle,
    beginWindow,
    endWindow,
    setNextWindowRect,
    addFBOTexture,
    getContext,
    button,
    setCursorPos,
  }
}
