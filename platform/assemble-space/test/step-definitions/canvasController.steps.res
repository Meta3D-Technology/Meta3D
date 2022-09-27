open Meta3dBsJestCucumber
open Cucumber
open Expect
open Operators

open Sinon

let feature = loadFeature("./test/features/canvasController.feature")

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

  test(."add canvas", ({given, \"when", \"and", then}) => {
    let ui = ref(Obj.magic(1))
    let useEffect1Stub = ref(Obj.magic(1))
    let dispatchStub = ref(Obj.magic(1))

    _prepare(given, \"and")

    \"when"("add two canvas", () => {
      allCanvasData := list{}
      setAllCanvasDataFlag := false

      CanvasControllerTool.addCanvasData(
        (setAllCanvasDataFake, setSetAllCanvasDataFlagFake),
        Js.Math.random,
      )
      CanvasControllerTool.addCanvasData(
        (setAllCanvasDataFake, setSetAllCanvasDataFlagFake),
        Js.Math.random,
      )
    })

    \"and"("render", () => {
      let useStateStub =
        createEmptyStub(refJsObjToSandbox(sandbox.contents))->returns(
          (allCanvasData.contents, setAllCanvasDataFake),
          _,
        )
      dispatchStub := createEmptyStub(refJsObjToSandbox(sandbox.contents))
      useEffect1Stub := createEmptyStub(refJsObjToSandbox(sandbox.contents))

      ui :=
        CanvasControllerTool.buildUI(
          ~sandbox,
          ~service=ServiceTool.build(
            ~sandbox,
            ~useState=useStateStub->Obj.magic,
            ~dispatch=dispatchStub.contents->Obj.magic,
            ~useEffect1=useEffect1Stub.contents->Obj.magic,
            (),
          ),
          (),
        )->ReactTestRenderer.create
    })

    then("should dispatch setAllCanvasData action", () => {
      let func = SinonTool.getFirstArg(~stub=useEffect1Stub.contents, ())
      let param = SinonTool.getArg(~argIndex=1, ~stub=useEffect1Stub.contents, ())

      func()->ignore

      (
        dispatchStub.contents->SinonTool.calledWith(
          FrontendUtils.AssembleSpaceStoreType.ApViewAction(
            FrontendUtils.ApViewStoreType.SetAllCanvasData(allCanvasData.contents),
          ),
        ),
        param,
      )->expect == (true, [allCanvasData.contents])
    })

    \"and"("show their data", () => {
      ui.contents->ReactTestTool.createSnapshotAndMatch
    })
  })

  test(."set canvas's data", ({given, \"when", \"and", then}) => {
    _prepare(given, \"and")

    given("add one canvas", () => {
      allCanvasData := list{}
      setAllCanvasDataFlag := false

      let randomStub = createEmptyStub(refJsObjToSandbox(sandbox.contents))->returns(0.5, _)

      CanvasControllerTool.addCanvasData(
        (setAllCanvasDataFake, setSetAllCanvasDataFlagFake),
        randomStub->Obj.magic,
      )
    })

    \"when"("set its width, height one by one", () => {
      CanvasControllerTool.setWidth(
        (setAllCanvasDataFake, setSetAllCanvasDataFlagFake),
        (allCanvasData.contents->Meta3dCommonlib.ListSt.head->Meta3dCommonlib.OptionSt.getExn).id,
        10,
      )
      CanvasControllerTool.setHeight(
        (setAllCanvasDataFake, setSetAllCanvasDataFlagFake),
        (allCanvasData.contents->Meta3dCommonlib.ListSt.head->Meta3dCommonlib.OptionSt.getExn).id,
        11,
      )
    })

    then("should set to allCanvasData", () => {
      allCanvasData.contents->expect ==
        list{
          (
            {
              height: 11,
              id: "500000",
              width: 10,
            }: FrontendUtils.ApViewStoreType.canvasData
          ),
        }
    })
  })
})
