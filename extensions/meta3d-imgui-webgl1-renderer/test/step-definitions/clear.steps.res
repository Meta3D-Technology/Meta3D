open Meta3dBsJestCucumber
open Cucumber
open Expect
open Operators

open Sinon

open Js.Typed_array

let feature = loadFeature("./test/features/clear.feature")

defineFeature(feature, test => {
  let sandbox = ref(Obj.magic(1))
  let state: ref<StateType.state> = ref(Obj.magic(1))
  let webgl1Service = ref(Obj.magic(1))

  test(."clear", ({given, \"when", \"and", then}) => {
    let gl = 2->Obj.magic
    let clearColor = (1., 0.1, 0.2, 0.3)
    let colorBufferBit = 1
    let depthBufferBit = 2
    let stencilBufferBit = 3
    let clearColorStub = ref(Obj.magic(1))
    let clearStub = ref(Obj.magic(1))
    let getColorBufferBitStub = ref(Obj.magic(1))
    let getDepthBufferBitStub = ref(Obj.magic(1))
    let getStencilBufferBitStub = ref(Obj.magic(1))

    given("prepare sandbox", () => {
      sandbox := createSandbox()
    })

    \"and"("prepare webgl1 service", () => {
      clearColorStub := createEmptyStub(refJsObjToSandbox(sandbox.contents))
      clearStub := createEmptyStub(refJsObjToSandbox(sandbox.contents))
      getColorBufferBitStub :=
        createEmptyStub(refJsObjToSandbox(sandbox.contents))->returns(colorBufferBit, _)
      getDepthBufferBitStub :=
        createEmptyStub(refJsObjToSandbox(sandbox.contents))->returns(depthBufferBit, _)
      getStencilBufferBitStub :=
        createEmptyStub(refJsObjToSandbox(sandbox.contents))->returns(stencilBufferBit, _)

      webgl1Service :=
        WebGL1ServiceTool.buildService(
          ~sandbox,
          ~clearColor=clearColorStub.contents->Obj.magic,
          ~clear=clearStub.contents->Obj.magic,
          ~getColorBufferBit=getColorBufferBitStub.contents->Obj.magic,
          ~getDepthBufferBit=getDepthBufferBitStub.contents->Obj.magic,
          ~getStencilBufferBit=getStencilBufferBitStub.contents->Obj.magic,
          (),
        )
    })

    \"and"("prepare webgl context", () => {
      state := {
          ...MainTool.createState(),
          gl: gl->Some,
        }
    })

    \"when"("clear", () => {
      MainTool.clear(
        ~sandbox,
        ~webgl1Service=webgl1Service.contents,
        ~state=state.contents,
        ~clearColor,
        (),
      )
    })

    then("clear color", () => {
      let (r, g, b, a) = clearColor

      clearColorStub.contents->SinonTool.calledWithArg5(r, g, b, a, gl)->expect == true
    })

    \"and"("clear", () => {
      clearStub.contents
      ->SinonTool.calledWithArg2(
        Pervasives.lor(Pervasives.lor(colorBufferBit, depthBufferBit), stencilBufferBit),
        gl,
      )
      ->expect == true
    })
  })
})
