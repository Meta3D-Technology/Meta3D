open Meta3dBsJestCucumber
open Cucumber
open Expect
open Operators

open Sinon

open Js.Typed_array

let feature = loadFeature("./test/features/begin_window.feature")

defineFeature(feature, test => {
  let sandbox = ref(Obj.magic(1))

  test(."invoke imgui renderer's beginWindow", ({given, \"when", \"and", then}) => {
    let newMeta3dState: ref<Meta3dType.Index.state> = ref(Obj.magic(12))
    let meta3dState1: Meta3dType.Index.state = Obj.magic(22)
    let meta3dState2: Meta3dType.Index.state = Obj.magic(23)
    let imguiRendererExtensionProtocolName = "imguiRendererExtensionProtocolName"
    let label = ref(Obj.magic(1))
    let imguiRendererService = ref(Obj.magic(1))
    let imguiRendererState1 = Obj.magic(12)
    let imguiRendererState2 = Obj.magic(13)
    let beginWindowStub = ref(Obj.magic(1))
    let getExtensionServiceStub = ref(Obj.magic(1))
    let getExtensionStateStub = ref(Obj.magic(1))
    let setExtensionStateStub = ref(Obj.magic(1))

    given("prepare sandbox", () => {
      sandbox := createSandbox()
    })

    \"and"("prepare imgui renderer service", () => {
      beginWindowStub :=
        createEmptyStub(refJsObjToSandbox(sandbox.contents))->returns(imguiRendererState2, _)

      imguiRendererService :=
        ImguiRendererServiceTool.buildService(
          ~sandbox,
          ~beginWindow=beginWindowStub.contents->Obj.magic,
          (),
        )
    })

    \"and"("prepare api", () => {
      getExtensionServiceStub :=
        createEmptyStub(refJsObjToSandbox(sandbox.contents))->returns(
          imguiRendererService.contents,
          _,
        )

      getExtensionStateStub :=
        createEmptyStub(refJsObjToSandbox(sandbox.contents))->returns(imguiRendererState1, _)
      setExtensionStateStub :=
        createEmptyStub(refJsObjToSandbox(sandbox.contents))->returns(meta3dState2, _)
    })

    given("prepare data", () => {
      label := "Window"
    })

    \"when"("beginWindow", () => {
      newMeta3dState :=
        MainTool.beginWindow(
          ~sandbox,
          ~imguiRendererExtensionProtocolName,
          ~getExtensionService=getExtensionServiceStub.contents,
          ~getExtensionState=getExtensionStateStub.contents,
          ~setExtensionState=setExtensionStateStub.contents,
          ~meta3dState=meta3dState1,
          ~label=label.contents,
          (),
        )
    })

    then("invoke imgui renderer's beginWindow", () => {
      (
        getExtensionStateStub.contents
        ->withTwoArgs(meta3dState1, imguiRendererExtensionProtocolName, _)
        ->getCallCount,
        getExtensionServiceStub.contents
        ->withTwoArgs(meta3dState1, imguiRendererExtensionProtocolName, _)
        ->getCallCount,
        beginWindowStub.contents
        ->getCall(0, _)
        ->SinonTool.calledWithArg2(label.contents, imguiRendererState1),
      )->expect == (1, 1, true)
    })

    \"and"("update imgui renderer state", () => {
      (
        setExtensionStateStub.contents
        ->getCall(0, _)
        ->SinonTool.calledWithArg3(meta3dState1, imguiRendererExtensionProtocolName, imguiRendererState2),
        newMeta3dState.contents,
      )->expect == (true, meta3dState2)
    })
  })
})
