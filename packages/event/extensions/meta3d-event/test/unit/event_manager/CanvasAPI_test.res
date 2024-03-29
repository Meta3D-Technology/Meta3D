open Meta3dEventProtocol.EventType

open Meta3d_jest

let _ = describe("CanvasAPI", () => {
  open Expect
  open Expect.Operators
  open Sinon

  let sandbox = getSandboxDefaultVal()

  beforeEach(() => {
    sandbox := createSandbox()
    TestTool.prepareState()
  })
  afterEach(() => restoreSandbox(refJsObjToSandbox(sandbox.contents)))

  describe("setCanvas", () => {
    test("set canvas", () => {
      let canvas = Obj.magic(2)

      CanvasAPI.setCanvas(canvas)

      ContainerManager.getState(EventExtensionTool.buildEventExtentsionProtocolName())->CanvasDoService.getCanvas->expect == canvas
    })
  })
})
