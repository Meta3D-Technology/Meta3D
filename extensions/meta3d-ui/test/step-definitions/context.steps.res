open Meta3dBsJestCucumber
open Cucumber
open Expect
open Operators

open Sinon

open Js.Typed_array

let feature = loadFeature("./test/features/context.feature")

defineFeature(feature, test => {
  let sandbox = ref(Obj.magic(1))

  test(."get context", ({given, \"when", \"and", then}) => {
    let meta3dState1: Meta3dType.Index.state = Obj.magic(22)
    let context = ref(Obj.magic(1))
    let result = ref(Obj.magic(1))
    let imguiRendererExtensionProtocolName = "imguiRendererExtensionProtocolName"
    let imguiRendererService = ref(Obj.magic(1))
    let imguiRendererState1 = Obj.magic(12)
    let getContextStub = ref(Obj.magic(1))
    let getExtensionServiceStub = ref(Obj.magic(1))
    // let getExtensionStateStub = ref(Obj.magic(1))

    given(
      "prepare sandbox",
      () => {
        sandbox := createSandbox()
      },
    )

    \"and"(
      "prepare imgui renderer service",
      () => {
        context := {"a": 1}

        getContextStub :=
          createEmptyStub(refJsObjToSandbox(sandbox.contents))->returns(context.contents, _)

        imguiRendererService :=
          ImguiRendererServiceTool.buildService(
            ~sandbox,
            ~getContext=getContextStub.contents->Obj.magic,
            (),
          )
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

        // getExtensionStateStub :=
        //   createEmptyStub(refJsObjToSandbox(sandbox.contents))->returns(imguiRendererState1, _)
      },
    )

    \"when"(
      "get context",
      () => {
        result :=
          MainTool.getContext(
            ~sandbox,
            ~imguiRendererExtensionProtocolName,
            ~getExtensionService=getExtensionServiceStub.contents,
            ~meta3dState=meta3dState1,
            (),
          )
      },
    )

    then(
      "return context",
      () => {
        (
          result.contents,
          getExtensionServiceStub.contents
          ->withTwoArgs(meta3dState1, imguiRendererExtensionProtocolName, _)
          ->getCallCount,
          getContextStub.contents->getCallCount,
        )->expect == (context.contents, 1, 1)
      },
    )
  })
})
