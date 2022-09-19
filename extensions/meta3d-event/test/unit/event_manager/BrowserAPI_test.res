open EventType

open Meta3d_jest

let _ = describe("BrowserAPI", () => {
  open Expect
  open Expect.Operators
  open Sinon

  let sandbox = getSandboxDefaultVal()

  beforeEach(() => {
    sandbox := createSandbox()
    TestTool.prepareState()
  })
  afterEach(() => restoreSandbox(refJsObjToSandbox(sandbox.contents)))

  describe("setBrowser", () => {
    test("set browser", () => {
      MainTool.setBrowser(Meta3dEventProtocol.BrowserType.IOS)

      ContainerManager.getState()->BrowserDoService.getBrowser->expect == Meta3dEventProtocol.BrowserType.IOS
    })
  })
})
