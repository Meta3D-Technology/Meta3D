open Meta3dBsJestCucumber
open Cucumber
open Expect
open Operators

open Sinon

let feature = loadFeature("./test/features/runElementVisual.feature")

defineFeature(feature, test => {
  let sandbox = ref(Obj.magic(1))

  let _prepare = (given, \"and") => {
    given("prepare", () => {
      sandbox := createSandbox()
      ReactTestTool.prepare()
    })
  }

  test(."show the canvas", ({given, \"when", \"and", then}) => {
    let useSelectorStub = ref(Obj.magic(1))

    _prepare(given, \"and")

    given(
      "prepare canvas data",
      () => {
        useSelectorStub :=
          createEmptyStub(refJsObjToSandbox(sandbox.contents))->returns(
            (
              CanvasControllerTool.buildCanvasData(~width=1, ~height=2, ()),
              ApInspectorTool.buildApInspectorData(),
            ),
            _,
          )
      },
    )

    \"when"(
      "render",
      () => {
        ()
      },
    )

    then(
      "should show the canvas",
      () => {
        RunElementVisualTool.buildUI(
          ~sandbox,
          ~service=ServiceTool.build(~sandbox, ~useSelector=useSelectorStub.contents, ()),
          (),
        )
        ->ReactTestRenderer.create
        ->ReactTestTool.createSnapshotAndMatch
      },
    )
  })

  test(."if not get app binary file from storage, error", ({given, \"when", \"and", then}) => {
    let initForElementVisualAppStub = ref(Obj.magic(1))
    let getElementVisualAppStub = ref(Obj.magic(1))
    let errorWithExnStub = ref(Obj.magic(1))

    _prepare(given, \"and")

    given(
      "empty storage",
      () => {
        errorWithExnStub := createEmptyStub(refJsObjToSandbox(sandbox.contents))

        initForElementVisualAppStub :=
          createEmptyStub(refJsObjToSandbox(sandbox.contents))->returns(
            Meta3dBsMost.Most.empty(),
            _,
          )

        getElementVisualAppStub :=
          createEmptyStub(refJsObjToSandbox(sandbox.contents))->returns(
            Meta3dBsMost.Most.fromPromise(
              Js.Promise.make(
                (~resolve, ~reject) => {
                  reject(.
                    Js.Exn.raiseError({
                      "error"
                    }),
                  )
                },
              ),
            ),
            _,
          )
      },
    )

    CucumberAsync.execStep(
      \"when",
      "start app",
      () => {
        RunElementVisualTool.startApp(
          ServiceTool.build(
            ~sandbox,
            ~initForElementVisualApp=initForElementVisualAppStub.contents->Obj.magic,
            ~getElementVisualApp=getElementVisualAppStub.contents->Obj.magic,
            ~errorWithExn=errorWithExnStub.contents->Obj.magic,
            (),
          ),
          ApInspectorTool.buildApInspectorData(),
        )
      },
    )

    then(
      "should error",
      () => {
        errorWithExnStub.contents->Obj.magic->getCallCount->expect == 1
      },
    )
  })

  test(."else, start app", ({given, \"when", \"and", then}) => {
    let appBinaryFile = Obj.magic(10)
    let canvas = Obj.magic(22)
    let isDebug = false
    let meta3dState = ref(Obj.magic(100))
    let initForElementVisualAppStub = ref(Obj.magic(1))
    let getElementVisualAppStub = ref(Obj.magic(1))
    let loadAppStub = ref(Obj.magic(1))
    let initExtensionStub = ref(Obj.magic(1))
    let updateExtensionStub = ref(Obj.magic(1))
    let requestAnimationOtherFrameStub = ref(Obj.magic(1))
    let querySelectorStub = ref(Obj.magic(1))

    _prepare(given, \"and")

    given(
      "storage has app binary file",
      () => {
        initForElementVisualAppStub :=
          createEmptyStub(refJsObjToSandbox(sandbox.contents))->returns(
            Meta3dBsMost.Most.just(Obj.magic(1)),
            _,
          )

        getElementVisualAppStub :=
          createEmptyStub(refJsObjToSandbox(sandbox.contents))->returns(
            Meta3dBsMost.Most.just(appBinaryFile),
            _,
          )
      },
    )

    \"and"(
      "prepare canvas",
      () => {
        querySelectorStub :=
          createEmptyStub(refJsObjToSandbox(sandbox.contents))->returns(canvas->Some, _)
      },
    )

    CucumberAsync.execStep(
      \"when",
      "start app",
      () => {
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

        requestAnimationOtherFrameStub := createEmptyStub(refJsObjToSandbox(sandbox.contents))

        RunElementVisualTool.startApp(
          ServiceTool.build(
            ~sandbox,
            ~initForElementVisualApp=initForElementVisualAppStub.contents->Obj.magic,
            ~getElementVisualApp=getElementVisualAppStub.contents->Obj.magic,
            ~loadApp=loadAppStub.contents->Obj.magic,
            ~initExtension=initExtensionStub.contents->Obj.magic,
            ~updateExtension=updateExtensionStub.contents->Obj.magic,
            ~requestAnimationFirstFrame=func => {
              func(0.)

              0
            },
            ~requestAnimationOtherFrame=requestAnimationOtherFrameStub.contents->Obj.magic,
            ~querySelector=querySelectorStub.contents->Obj.magic,
            (),
          ),
          ApInspectorTool.buildApInspectorData(~isDebug, ()),
        )
      },
    )

    then(
      "load app",
      () => {
        loadAppStub.contents->Obj.magic->SinonTool.calledWith(appBinaryFile)->expect == true
      },
    )

    \"and"(
      "init app",
      () => {
        initExtensionStub.contents
        ->Obj.magic
        ->SinonTool.calledWithArg3(
          Obj.magic(101),
          RunElementVisualTool.getVisualExtensionProtocolName(),
          {
            "isDebug": isDebug,
            "canvas": canvas,
          },
        )
        ->expect == true
      },
    )

    \"and"(
      "loop app",
      () => {
        (
          updateExtensionStub.contents
          ->Obj.magic
          ->SinonTool.calledWithArg3(
            Obj.magic(102),
            RunElementVisualTool.getVisualExtensionProtocolName(),
            matchAny,
          ),
          requestAnimationOtherFrameStub.contents->getCallCount,
        )->expect == (true, 1)
      },
    )
  })
})
