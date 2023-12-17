open Meta3dBsJestCucumber
open Cucumber
open Expect
open Operators

open Sinon

let feature = loadFeature("./test/features/apInspector.feature")

defineFeature(feature, test => {
  let sandbox = ref(Obj.magic(1))
  // let selectedContributes = ref(Obj.magic(1))
  let isShowApInspector = ref(false)
  let apInspectorData = ref(Obj.magic(1))

  let _prepare = given => {
    given("prepare", () => {
      sandbox := createSandbox()
      ReactTestTool.prepare()

      SelectTool.markNotShowSelectForTest()
    })
  }

  test(."show nothing", ({given, \"when", \"and", then}) => {
    _prepare(given)

    given("mark not show", () => {
      isShowApInspector := false
    })

    \"when"("render", () => {
      ()
    })

    then("should show nothing", () => {
      ApInspectorTool.buildUI(
        ~sandbox,
        ~service=ServiceTool.build(
          ~sandbox,
          ~useSelector=createEmptyStub(refJsObjToSandbox(sandbox.contents))->returns(
            (isShowApInspector.contents, list{}, ApInspectorTool.buildApInspectorData()),
            _,
          ),
          (),
        ),
        (),
      )
      ->ReactTestRenderer.create
      ->ReactTestTool.createSnapshotAndMatch
    })
  })

  let _prepareForMarkShow = given => {
    given("mark show", () => {
      isShowApInspector := true
    })
  }

  test(."show isDebug select", ({given, \"when", \"and", then}) => {
    _prepare(given)

    _prepareForMarkShow(given)

    given("prepare ap inspector data", () => {
      apInspectorData := ApInspectorTool.buildApInspectorData(~isDebug=false, ())
    })

    \"when"("render", () => {
      ()
    })

    then("should show isDebug select", () => {
      ApInspectorTool.buildUI(
        ~sandbox,
        ~service=ServiceTool.build(
          ~sandbox,
          ~useSelector=createEmptyStub(refJsObjToSandbox(sandbox.contents))->returns(
            (isShowApInspector.contents, list{}, apInspectorData.contents),
            _,
          ),
          (),
        ),
        (),
      )
      ->ReactTestRenderer.create
      ->ReactTestTool.createSnapshotAndMatch
    })
  })

  test(."set isDebug", ({given, \"when", \"and", then}) => {
    let dispatchStub = ref(Obj.magic(1))

    _prepare(given)

    _prepareForMarkShow(given)

    \"when"("set isDebug", () => {
      dispatchStub := createEmptyStub(refJsObjToSandbox(sandbox.contents))

      ApInspectorTool.setIsDebug(dispatchStub.contents->Obj.magic, "true")
    })

    then("should dispatch SetIsDebug", () => {
      dispatchStub.contents->SinonTool.getFirstArg(~callIndex=0, ~stub=_, ())->expect ==
        ApAssembleStoreType.SetIsDebug(true)
    })
  })

  test(."show clearColor r input", ({given, \"when", \"and", then}) => {
    _prepare(given)

    _prepareForMarkShow(given)

    given("prepare ap inspector data", () => {
      apInspectorData := ApInspectorTool.buildApInspectorData(~clearColor=(0.1, 1., 1., 1.), ())
    })

    \"when"("render", () => {
      ()
    })

    then("should show clearColor r input", () => {
      ApInspectorTool.buildUI(
        ~sandbox,
        ~service=ServiceTool.build(
          ~sandbox,
          ~useSelector=createEmptyStub(refJsObjToSandbox(sandbox.contents))->returns(
            (isShowApInspector.contents, list{}, apInspectorData.contents),
            _,
          ),
          (),
        ),
        (),
      )
      ->ReactTestRenderer.create
      ->ReactTestTool.createSnapshotAndMatch
    })
  })

  test(."set clearColor r", ({given, \"when", \"and", then}) => {
    let dispatchStub = ref(Obj.magic(1))

    _prepare(given)

    _prepareForMarkShow(given)

    \"when"("set clearColor r", () => {
      dispatchStub := createEmptyStub(refJsObjToSandbox(sandbox.contents))

      ApInspectorTool.setClearColorR(dispatchStub.contents->Obj.magic, (1., 1., 1., 1.), 0.2)
    })

    then("should dispatch SetClearColor", () => {
      dispatchStub.contents->SinonTool.getFirstArg(~callIndex=0, ~stub=_, ())->expect ==
        ApAssembleStoreType.SetClearColor((0.2, 1., 1., 1.))
    })
  })

  test(."show skin name select", ({given, \"when", \"and", then}) => {
    _prepare(given)

    _prepareForMarkShow(given)

    given("prepare ap inspector data", () => {
      apInspectorData := ApInspectorTool.buildApInspectorData(~skinName="s1"->Some, ())
    })

    \"when"("render", () => {
      ()
    })

    then("should show skin name select", () => {
      ApInspectorTool.buildUI(
        ~sandbox,
        ~service=ServiceTool.build(
          ~sandbox,
          ~useSelector=createEmptyStub(refJsObjToSandbox(sandbox.contents))->returns(
            (isShowApInspector.contents, list{}, apInspectorData.contents),
            _,
          ),
          (),
        ),
        (),
      )
      ->ReactTestRenderer.create
      ->ReactTestTool.createSnapshotAndMatch
    })
  })

  test(."set skin name", ({given, \"when", \"and", then}) => {
    let skinName = "s1"
    let dispatchStub = ref(Obj.magic(1))

    _prepare(given)

    _prepareForMarkShow(given)

    \"when"("set skin name", () => {
      dispatchStub := createEmptyStub(refJsObjToSandbox(sandbox.contents))

      ApInspectorTool.setSkinName(dispatchStub.contents->Obj.magic, skinName)
    })

    then("should dispatch SetSkinName", () => {
      dispatchStub.contents->SinonTool.getFirstArg(~callIndex=0, ~stub=_, ())->expect ==
        ApAssembleStoreType.SetSkinName(skinName->Some)
    })
  })

  test(."set skin name to empty", ({given, \"when", \"and", then}) => {
    let dispatchStub = ref(Obj.magic(1))

    _prepare(given)

    _prepareForMarkShow(given)

    \"when"("set skin name to empty", () => {
      dispatchStub := createEmptyStub(refJsObjToSandbox(sandbox.contents))

      ApInspectorTool.setSkinName(dispatchStub.contents->Obj.magic, "empty")
    })

    then("should dispatch SetSkinName empty", () => {
      dispatchStub.contents->SinonTool.getFirstArg(~callIndex=0, ~stub=_, ())->expect ==
        ApAssembleStoreType.SetSkinName(None)
    })
  })
})
