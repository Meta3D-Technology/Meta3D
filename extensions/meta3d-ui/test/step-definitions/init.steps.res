open Meta3dBsJestCucumber
open Cucumber
open Expect
open Operators

open Sinon

open Js.Typed_array

let feature = loadFeature("./test/features/init.feature")

defineFeature(feature, test => {
  let sandbox = ref(Obj.magic(1))

  test(."init imgui renderer", ({given, \"when", \"and", then}) => {
    let newMeta3dState: ref<Meta3dType.Index.state> = ref(Obj.magic(12))
    let meta3dState1: Meta3dType.Index.state = Obj.magic(22)
    let meta3dState2: Meta3dType.Index.state = Obj.magic(23)
    let imguiRendererExtensionName = "imguiRendererExtensionName"
    let isDebug = true
    let canvas = Obj.magic(5)
    let imguiRendererService = ref(Obj.magic(1))
    let imguiRendererState1 = Obj.magic(12)
    let imguiRendererState2 = Obj.magic(13)
    let initStub = ref(Obj.magic(1))
    let getExtensionServiceStub = ref(Obj.magic(1))
    let getExtensionStateStub = ref(Obj.magic(1))
    let setExtensionStateStub = ref(Obj.magic(1))

    given("prepare sandbox", () => {
      sandbox := createSandbox()
    })

    \"and"("prepare imgui renderer service", () => {
      initStub :=
        createEmptyStub(refJsObjToSandbox(sandbox.contents))->returns(imguiRendererState2, _)

      imguiRendererService :=
        ImguiRendererServiceTool.buildService(~sandbox, ~init=initStub.contents->Obj.magic, ())
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

    given("prepare canvas", () => {
      ()
    })

    \"when"("init", () => {
      newMeta3dState :=
        MainTool.init(
          ~sandbox,
          ~imguiRendererExtensionName,
          ~getExtensionService=getExtensionServiceStub.contents,
          ~getExtensionState=getExtensionStateStub.contents,
          ~setExtensionState=setExtensionStateStub.contents,
          ~meta3dState=meta3dState1,
          ~isDebug,
          ~canvas,
          (),
        )
    })

    then("init imgui renderer", () => {
      (
        getExtensionStateStub.contents
        ->withTwoArgs(meta3dState1, imguiRendererExtensionName, _)
        ->getCallCount,
        getExtensionServiceStub.contents
        ->withTwoArgs(meta3dState1, imguiRendererExtensionName, _)
        ->getCallCount,
        initStub.contents
        ->getCall(0, _)
        ->SinonTool.calledWithArg4(imguiRendererState1, meta3dState1, isDebug, canvas),
      )->expect == (1, 1, true)
    })

    \"and"("update imgui renderer state", () => {
      (
        setExtensionStateStub.contents
        ->getCall(0, _)
        ->SinonTool.calledWithArg3(meta3dState1, imguiRendererExtensionName, imguiRendererState2),
        newMeta3dState.contents,
      )->expect == (true, meta3dState2)
    })
  })
})
