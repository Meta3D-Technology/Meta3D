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

  // test(."add canvas", ({given, \"when", \"and", then}) => {
  //   let ui = ref(Obj.magic(1))
  //   let useEffect1Stub = ref(Obj.magic(1))
  //   let dispatchStub = ref(Obj.magic(1))

  //   _prepare(given, \"and")

  //   \"when"("add two canvas", () => {
  //     allCanvasData := list{}
  //     setAllCanvasDataFlag := false

  //     CanvasControllerTool.addCanvasData(
  //       (setAllCanvasDataFake, setSetAllCanvasDataFlagFake),
  //       Js.Math.random,
  //     )
  //     CanvasControllerTool.addCanvasData(
  //       (setAllCanvasDataFake, setSetAllCanvasDataFlagFake),
  //       Js.Math.random,
  //     )
  //   })

  //   \"and"("render", () => {
  //     let useStateStub =
  //       createEmptyStub(refJsObjToSandbox(sandbox.contents))->returns(
  //         (allCanvasData.contents, setAllCanvasDataFake),
  //         _,
  //       )
  //     dispatchStub := createEmptyStub(refJsObjToSandbox(sandbox.contents))
  //     useEffect1Stub := createEmptyStub(refJsObjToSandbox(sandbox.contents))

  //     ui :=
  //       CanvasControllerTool.buildAp(
  //         ~sandbox,
  //         ~service=ServiceTool.build(
  //           ~sandbox,
  //           ~useState=useStateStub->Obj.magic,
  //           ~dispatch=dispatchStub.contents->Obj.magic,
  //           ~useEffect1=useEffect1Stub.contents->Obj.magic,
  //           (),
  //         ),
  //         (),
  //       )->ReactTestRenderer.create
  //   })

  //   then("should dispatch SetAllCanvasData action", () => {
  //     let func = SinonTool.getFirstArg(~stub=useEffect1Stub.contents, ())
  //     let param = SinonTool.getArg(~argIndex=1, ~stub=useEffect1Stub.contents, ())

  //     func()->ignore

  //     (
  //       dispatchStub.contents->SinonTool.calledWith(
  //         FrontendUtils.AssembleSpaceStoreType.ApAssembleAction(
  //           FrontendUtils.ApAssembleStoreType.SetAllCanvasData(allCanvasData.contents),
  //         ),
  //       ),
  //       param,
  //     )->expect == (true, [allCanvasData.contents])
  //   })

  //   \"and"("show their data", () => {
  //     ui.contents->ReactTestTool.createSnapshotAndMatch
  //   })
  // })

  test(."set canvas's data", ({given, \"when", \"and", then}) => {
    let canvasData = ref(Obj.magic(1))
    let dispatchStub = ref(Obj.magic(1))

    _prepare(given, \"and")

    given("prepare the canvas", () => {
      canvasData := CanvasControllerTool.buildCanvasData(~width=0, ~height=0, ())
    })

    \"when"("set its width, height one by one", () => {
      dispatchStub := createEmptyStub(refJsObjToSandbox(sandbox.contents))

      let width = 10

      CanvasControllerTool.setWidth(dispatchStub.contents->Obj.magic, canvasData.contents, width)
      canvasData := {
          ...canvasData.contents,
          width: width,
        }
      CanvasControllerTool.setHeight(dispatchStub.contents->Obj.magic, canvasData.contents, 11)
    })

    then("should dispatch SetAllCanvasData action twice", () => {
      (
        dispatchStub.contents->SinonTool.getFirstArg(~callIndex=0, ~stub=_, ()),
        dispatchStub.contents->SinonTool.getFirstArg(~callIndex=1, ~stub=_, ()),
      )->expect ==
        (
          FrontendUtils.ApAssembleStoreType.SetCanvasData(
            CanvasControllerTool.buildCanvasData(~width=10, ~height=0, ()),
          ),
          FrontendUtils.ApAssembleStoreType.SetCanvasData(
            CanvasControllerTool.buildCanvasData(~width=10, ~height=11, ()),
          ),
        )
    })
  })
})
