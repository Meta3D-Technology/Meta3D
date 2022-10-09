open Meta3dBsJestCucumber
open Cucumber
open Expect
open Operators

open Sinon

let feature = loadFeature("./test/features/runUIVisual.feature")

defineFeature(feature, test => {
  let sandbox = ref(Obj.magic(1))

  let _prepare = (given, \"and") => {
    given("prepare", () => {
      sandbox := createSandbox()
      ReactTestTool.prepare()
    })
  }

  test(."show the canvas", ({given, \"when", \"and", then}) => {
    let useUrlStub = ref(Obj.magic(1))

    _prepare(given, \"and")

    given("prepare canvas data in the url", () => {
      useUrlStub :=
        createEmptyStub(refJsObjToSandbox(sandbox.contents))->returns(
          {
            "search": j`canvasData=${CanvasControllerTool.buildCanvasData(~width=1, ~height=2, ())
              ->Obj.magic
              ->Js.Json.stringify}`,
          },
          _,
        )
    })

    \"when"("render", () => {
      ()
    })

    then("should show the canvas", () => {
      RunUIVisualTool.buildUI(
        ~sandbox,
        ~service=ServiceTool.build(~sandbox, ~useUrl=useUrlStub.contents->Obj.magic, ()),
        (),
      )
      ->ReactTestRenderer.create
      ->ReactTestTool.createSnapshotAndMatch
    })
  })

  test(."if not get app binary file from storage, error", ({given, \"when", \"and", then}) => {
    let getItemStub = ref(Obj.magic(1))
    let errorStub = ref(Obj.magic(1))

    _prepare(given, \"and")

    given("empty storage", () => {
      errorStub := createEmptyStub(refJsObjToSandbox(sandbox.contents))

      getItemStub :=
        createEmptyStub(refJsObjToSandbox(sandbox.contents))->returns(Js.Nullable.null, _)
    })

    CucumberAsync.execStep(\"when", "start app", () => {
      RunUIVisualTool.startApp(
        ServiceTool.build(
          ~sandbox,
          ~getItem=getItemStub.contents->Obj.magic,
          ~error=errorStub.contents->Obj.magic,
          (),
        ),
      )
    })

    then("should error", () => {
      errorStub.contents
      ->Obj.magic
      ->SinonTool.calledWithArg2({j`appBinaryFile not exist`}, None)
      ->expect == true
    })
  })

  test(."else, start app", ({given, \"when", \"and", then}) => {
    let appBinaryFile = Obj.magic(10)
    let canvas = Obj.magic(22)
    let meta3dState = ref(Obj.magic(100))
    let getItemStub = ref(Obj.magic(1))
    let loadAppStub = ref(Obj.magic(1))
    let initExtensionStub = ref(Obj.magic(1))
    let updateExtensionStub = ref(Obj.magic(1))
    let requestAnimationFrameStub = ref(Obj.magic(1))
    let querySelectorStub = ref(Obj.magic(1))

    _prepare(given, \"and")

    given("storage has app binary file", () => {
      getItemStub :=
        createEmptyStub(refJsObjToSandbox(sandbox.contents))->returns(
          Js.Nullable.return(appBinaryFile),
          _,
        )
    })

    \"and"("prepare canvas", () => {
      querySelectorStub :=
        createEmptyStub(refJsObjToSandbox(sandbox.contents))->returns(canvas->Some, _)
    })

    CucumberAsync.execStep(\"when", "start app", () => {
      loadAppStub :=
        createEmptyStub(refJsObjToSandbox(sandbox.contents))->returns(
          (Obj.magic(101), Obj.magic(1)),
          _,
        )

      initExtensionStub :=
        createEmptyStub(refJsObjToSandbox(sandbox.contents))->returns(
          Obj.magic(102)->Js.Promise.resolve,
          _,
        )

      updateExtensionStub :=
        createEmptyStub(refJsObjToSandbox(sandbox.contents))->returns(
          Obj.magic(103)->Js.Promise.resolve,
          _,
        )

      requestAnimationFrameStub := createEmptyStub(refJsObjToSandbox(sandbox.contents))

      RunUIVisualTool.startApp(
        ServiceTool.build(
          ~sandbox,
          ~getItem=getItemStub.contents->Obj.magic,
          ~loadApp=loadAppStub.contents->Obj.magic,
          ~initExtension=initExtensionStub.contents->Obj.magic,
          ~updateExtension=updateExtensionStub.contents->Obj.magic,
          ~requestAnimationFrame=requestAnimationFrameStub.contents->Obj.magic,
          ~querySelector=querySelectorStub.contents->Obj.magic,
          (),
        ),
      )
    })

    then("load app", () => {
      loadAppStub.contents->Obj.magic->SinonTool.calledWith(appBinaryFile)->expect == true
    })

    \"and"("init app", () => {
      initExtensionStub.contents
      ->Obj.magic
      ->SinonTool.calledWithArg3(
        Obj.magic(101),
        RunUIVisualTool.getVisualExtensionName(),
        {
          "isDebug": true,
          "canvas": canvas,
        },
      )
      ->expect == true
    })

    \"and"("loop app", () => {
      (
        updateExtensionStub.contents
        ->Obj.magic
        ->SinonTool.calledWithArg3(
          Obj.magic(102),
          RunUIVisualTool.getVisualExtensionName(),
          matchAny,
        ),
        requestAnimationFrameStub.contents->getCallCount,
      )->expect == (true, 1)
    })
  })
})
