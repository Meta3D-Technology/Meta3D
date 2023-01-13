open Meta3dBsJestCucumber
open Cucumber
open Expect
open Operators

open Sinon

open Js.Typed_array

let feature = loadFeature("./test/features/clear.feature")

defineFeature(feature, test => {
  let sandbox = ref(Obj.magic(1))

  test(."clear imgui renderer", ({given, \"when", \"and", then}) => {
    let meta3dState1: Meta3dType.Index.state = Obj.magic(22)
    let imguiRendererExtensionProtocolName = "imguiRendererExtensionProtocolName"
    let clearColor = (1., 0.1, 0.2, 0.3)
    let imguiRendererService = ref(Obj.magic(1))
    let imguiRendererState1 = Obj.magic(12)
    let clearStub = ref(Obj.magic(1))
    let getExtensionServiceStub = ref(Obj.magic(1))
    let getExtensionStateStub = ref(Obj.magic(1))

    given(
      "prepare sandbox",
      () => {
        sandbox := createSandbox()
      },
    )

    \"and"(
      "prepare imgui renderer service",
      () => {
        clearStub := createEmptyStub(refJsObjToSandbox(sandbox.contents))

        imguiRendererService :=
          ImguiRendererServiceTool.buildService(~sandbox, ~clear=clearStub.contents->Obj.magic, ())
      },
    )

    \"and"(
      "prepare api",
      () => {
        getExtensionServiceStub :=
          createEmptyStub(refJsObjToSandbox(sandbox.contents))->returns(
            imguiRendererService.contents,
            _,
          )

        getExtensionStateStub :=
          createEmptyStub(refJsObjToSandbox(sandbox.contents))->returns(imguiRendererState1, _)
      },
    )

    \"when"(
      "clear",
      () => {
        // newMeta3dState :=
        let _ = MainTool.clear(
          ~sandbox,
          ~imguiRendererExtensionProtocolName,
          ~getExtensionService=getExtensionServiceStub.contents,
          ~getExtensionState=getExtensionStateStub.contents,
          ~meta3dState=meta3dState1,
          ~clearColor,
          (),
        )
      },
    )

    then(
      "clear imgui renderer",
      () => {
        (
          getExtensionStateStub.contents
          ->withTwoArgs(meta3dState1, imguiRendererExtensionProtocolName, _)
          ->getCallCount,
          getExtensionServiceStub.contents
          ->withTwoArgs(meta3dState1, imguiRendererExtensionProtocolName, _)
          ->getCallCount,
          clearStub.contents->getCall(0, _)->SinonTool.calledWith(clearColor),
        )->expect == (1, 1, true)
      },
    )
  })
})
