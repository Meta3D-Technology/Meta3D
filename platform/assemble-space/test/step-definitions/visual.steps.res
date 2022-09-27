open Meta3dBsJestCucumber
open Cucumber
open Expect
open Operators

open Sinon

let feature = loadFeature("./test/features/visual.feature")

defineFeature(feature, test => {
  let sandbox = ref(Obj.magic(1))
  let allCanvasData = ref(Obj.magic(1))
  let setAllCanvasDataFlag = ref(Obj.magic(1))
  let setAllCanvasDataFake = func => {
    allCanvasData := func(allCanvasData.contents)
  }
  let setSetAllCanvasDataFlagFake = func => {
    setAllCanvasDataFlag := func(setAllCanvasDataFlag.contents)
  }

  let _prepare = (given, \"and") => {
    given("prepare", () => {
      sandbox := createSandbox()
      ReactTestTool.prepare()
    })
  }

  test(."show all canvas", ({given, \"when", \"and", then}) => {
    let ui = ref(Obj.magic(1))
    let useSelectorStub = ref(Obj.magic(1))

    _prepare(given, \"and")

    given("add two canvas", () => {
      CanvasControllerTool.addCanvasData(
        (setAllCanvasDataFake, setSetAllCanvasDataFlagFake),
        Js.Math.random,
      )
      CanvasControllerTool.addCanvasData(
        (setAllCanvasDataFake, setSetAllCanvasDataFlagFake),
        Js.Math.random,
      )

      useSelectorStub :=
        createEmptyStub(refJsObjToSandbox(sandbox.contents))->returns(
          list{
            CanvasControllerTool.buildCanvasData(~width=1, ~height=2, ()),
            CanvasControllerTool.buildCanvasData(~width=10, ~height=20, ()),
          },
          _,
        )
    })

    \"when"("render", () => {
      ui :=
        VisualTool.buildUI(
          ~sandbox,
          ~service=ServiceTool.build(
            ~sandbox,
            ~useSelector=useSelectorStub.contents->Obj.magic,
            (),
          ),
          (),
        )->ReactTestRenderer.create
    })

    then("should show all canvas", () => {
      ui.contents->ReactTestTool.createSnapshotAndMatch
    })
  })
})
