open Meta3dBsJestCucumber
open Cucumber
open Expect
open Operators

open Sinon

let feature = loadFeature("./test/features/init.feature")

defineFeature(feature, test => {
  let sandbox = ref(Obj.magic(1))
  let state: ref<StateType.state> = ref(Obj.magic(1))

  test(."get webgl1 context", ({given, \"when", \"and", then}) => {
    let gl = 2->Obj.magic
    let canvas = 10->Obj.magic
    let getContextStub = ref(Obj.magic(1))

    given("prepare sandbox", () => {
      sandbox := createSandbox()
    })

    \"when"("init", () => {
      getContextStub := createEmptyStub(refJsObjToSandbox(sandbox.contents))->returns(gl, _)

      state :=
        MainTool.init(
          ~sandbox,
          ~webgl1Service=WebGL1ServiceTool.buildService(
            ~sandbox,
            ~getContext=getContextStub.contents->Obj.magic,
            (),
          ),
          ~isDebug=false,
          ~canvas,
          (),
        )
    })

    then("get webgl context with config", () => {
      (
        state.contents.gl,
        getContextStub.contents
        ->getCall(0, _)
        ->SinonTool.calledWithArg2(
          canvas,
          {
            "alpha": true,
            "depth": true,
            "stencil": false,
            "antialias": true,
            "premultipliedAlpha": true,
            "preserveDrawingBuffer": false,
          },
        ),
      )->expect == (gl->Some, true)
    })
  })
})
