open Meta3dBsJestCucumber
open Cucumber
open Expect
open Operators

open Sinon

open Js.Typed_array

let feature = loadFeature("./test/features/fbo_texture.feature")

defineFeature(feature, test => {
  let sandbox = ref(Obj.magic(1))

  test(."get fbo texture", ({given, \"when", then}) => {
    let state: ref<Meta3dUiProtocol.StateType.state> = ref(Obj.magic(1))
    let textureID = "t1"
    let t1 = Obj.magic(5)
    let result = ref(Obj.magic(1))

    given(
      "set a fbo texture to t1",
      () => {
        state := MainTool.setFBOTexture(~textureID, ~texture=t1, ())
      },
    )

    \"when"(
      "get fbo texture",
      () => {
        result := MainTool.getFBOTexture(~textureID, ~state=state.contents, ())
      },
    )

    then(
      "return t1",
      () => {
        result.contents->expect == t1->Meta3dCommonlib.NullableSt.return
      },
    )
  })

  // test(."set fbo texture", ({given, \"when", then}) => {
  //   let state: ref<Meta3dUiProtocol.StateType.state> = ref(Obj.magic(1))
  //   let textureID = "t1"
  //   let t1 = Obj.magic(5)

  //   \"when"(
  //     "set a fbo texture",
  //     () => {
  //       state := MainTool.setFBOTexture(~textureID, ~texture=t1, ())
  //     },
  //   )

  //   then(
  //     "get fbo texture should return it",
  //     () => {
  //       MainTool.getFBOTexture(~textureID, ~state=state.contents, ())->expect ==
  //         t1->Meta3dCommonlib.NullableSt.return
  //     },
  //   )
  // })

  test(."add fbo texture", ({given, \"when", \"and", then}) => {
    let meta3dState1: Meta3dType.Index.state = Obj.magic(22)
    let texture: ref<Meta3dImguiRendererProtocol.ServiceType.texture> = ref(Obj.magic(1))
    let size = (10, 20)
    let result = ref(Obj.magic(1))
    let imguiRendererExtensionProtocolName = "imguiRendererExtensionProtocolName"
    let imguiRendererService = ref(Obj.magic(1))
    let imguiRendererState1 = Obj.magic(12)
    let addFBOTextureStub = ref(Obj.magic(1))
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
        // context := {"a": 1}

        addFBOTextureStub := createEmptyStub(refJsObjToSandbox(sandbox.contents))

        imguiRendererService :=
          ImguiRendererServiceTool.buildService(
            ~sandbox,
            ~addFBOTexture=addFBOTextureStub.contents->Obj.magic,
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

    \"and"(
      "prepare fbo texture",
      () => {
        texture := {"a": 1}->Obj.magic
      },
    )

    \"when"(
      "add fbo texture",
      () => {
        result :=
          MainTool.addFBOTexture(
            ~sandbox,
            ~texture=texture.contents->Js.Null.return,
            ~size,
            ~imguiRendererExtensionProtocolName,
            ~getExtensionService=getExtensionServiceStub.contents,
            ~meta3dState=meta3dState1,
            (),
          )
      },
    )

    then(
      "invoke imgui renderer's addFBOTexture",
      () => {
        (
          getExtensionServiceStub.contents
          ->withTwoArgs(meta3dState1, imguiRendererExtensionProtocolName, _)
          ->getCallCount,
          addFBOTextureStub.contents
          ->getCall(0, _)
          ->SinonTool.calledWithArg2(texture.contents, size),
        )->expect == (1, true)
      },
    )
  })
})
