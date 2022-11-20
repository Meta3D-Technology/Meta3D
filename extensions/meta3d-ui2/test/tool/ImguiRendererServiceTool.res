open Sinon

let buildService = (
  ~sandbox,
  ~init=createEmptyStub(refJsObjToSandbox(sandbox.contents)),
  ~clear=createEmptyStub(refJsObjToSandbox(sandbox.contents)),
  ~render=createEmptyStub(refJsObjToSandbox(sandbox.contents)),
  ~beforeExec=createEmptyStub(refJsObjToSandbox(sandbox.contents)),
  ~afterExec=createEmptyStub(refJsObjToSandbox(sandbox.contents)),
  ~beginWindow=createEmptyStub(refJsObjToSandbox(sandbox.contents)),
  ~endWindow=createEmptyStub(refJsObjToSandbox(sandbox.contents)),
  ~setNextWindowRect=createEmptyStub(refJsObjToSandbox(sandbox.contents)),
  ~button=createEmptyStub(refJsObjToSandbox(sandbox.contents)),
  ~setCursorPos=createEmptyStub(refJsObjToSandbox(sandbox.contents)),
  (),
): Meta3dImguiRenderer2Protocol.ServiceType.service => {
  {
    init: init,
    clear: clear,
    render: render,
    beforeExec: beforeExec,
    afterExec: afterExec,
    beginWindow: beginWindow,
    endWindow: endWindow,
    setNextWindowRect: setNextWindowRect,
    button:button,
    setCursorPos:setCursorPos
  }
}
