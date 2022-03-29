open Meta3dBsJestCucumber
open Cucumber
open Expect
open Operators

open Sinon

let feature = loadFeature("./test/features/clone.feature")

defineFeature(feature, test => {
  let contribute = ref(Obj.magic(1))
  let gameObjectState = ref(Obj.magic(1))
  let transformState = ref(Obj.magic(1))
  let pbrMaterialState = ref(Obj.magic(1))
  let geometryState = ref(Obj.magic(1))
  let clonedGameObjects = ref([])

  let gameObject1 = ref(Obj.magic(1))
  let gameObject2 = ref(Obj.magic(1))
  let transform1 = ref(Obj.magic(3))
  let transform2 = ref(Obj.magic(3))
  let clonedTransform1 = 11
  let clonedTransform2 = 12
  let clonedTransform3 = 13
  let clonedTransform4 = 14
  let sandbox = ref(Obj.magic(1))
  let getTransformFuncStub = ref(Obj.magic(1))
  let cloneTransformFuncStub = ref(Obj.magic(1))
  let addTransformFuncStub = ref(Obj.magic(1))
  let getTransformDataFuncStub = ref(Obj.magic(1))
  let setTransformDataFuncStub = ref(Obj.magic(1))
  let getTransformGameObjectsFuncStub = ref(Obj.magic(1))

  let _getContributeAndCreateAState = ((given, \"and")) => {
    given("I get contribute", () => {
      contribute := Main.getGameObjectContribute()
    })

    \"and"("create a state", () => {
      gameObjectState := StateTool.createState(~contribute=contribute.contents, ())
    })
  }

  let _cloneGameObject = (
    ~contribute: Meta3dEngineCoreProtocol.GameObjectContributeType.gameObjectContribute<
      StateType.state,
    >,
    ~gameObjectState,
    ~gameObject,
    ~count=1,
    ~isShareMaterial=false,
    ~transformState=Obj.magic(1),
    ~pbrMaterialState=Obj.magic(1),
    ~geometryState=Obj.magic(1),
    ~getTransformFunc=(. componentState, _) => Obj.magic(1),
    ~cloneTransformFunc=(. componentState, _, _, _) => (componentState, []),
    ~addTransformFunc=(. componentState, _, _) => componentState,
    ~getTransformGameObjectsFunc=(. componentState, _) => [],
    ~getTransformDataFunc=(. componentState, _, _) => Js.Nullable.undefined,
    ~setTransformDataFunc=(. componentState, _, _, _) => componentState,
    ~getPBRMaterialFunc=(. componentState, _) => Obj.magic(1),
    ~clonePBRMaterialFunc=(. componentState, _, _, _) => (componentState, []),
    ~addPBRMaterialFunc=(. componentState, _, _) => componentState,
    ~getGeometryFunc=(. componentState, _) => Obj.magic(1),
    ~cloneGeometryFunc=(. componentState, _, _, _) => (componentState, []),
    ~addGeometryFunc=(. componentState, _, _) => componentState,
    (),
  ) => {
    contribute.cloneGameObjectFunc(.
      (
        gameObjectState,
        transformState->Obj.magic,
        pbrMaterialState->Obj.magic,
        geometryState->Obj.magic,
      ),
      (
        (
          getTransformFunc,
          cloneTransformFunc,
          addTransformFunc,
          getTransformGameObjectsFunc,
          getTransformDataFunc,
          setTransformDataFunc,
        ),
        (getPBRMaterialFunc, clonePBRMaterialFunc, addPBRMaterialFunc),
        (getGeometryFunc, cloneGeometryFunc, addGeometryFunc),
      ),
      count,
      ({isShareMaterial: isShareMaterial}: Meta3dGameobjectProtocol.Index.cloneConfig),
      gameObject,
    )
  }

  test(."cloned gameObjects are new gameObjects", ({given, \"when", \"and", then}) => {
    let gameObject = ref(Obj.magic(1))

    _getContributeAndCreateAState((\"when", \"and"))

    given("create a gameObject", () => {
      let (s, g) = contribute.contents.createGameObjectFunc(. gameObjectState.contents)

      gameObjectState := s
      gameObject := g
    })

    \"when"("clone 2 gameObjects", () => {
      let (_, c) = _cloneGameObject(
        ~gameObjectState=gameObjectState.contents,
        ~contribute=contribute.contents,
        ~gameObject=gameObject.contents,
        ~count=2,
        (),
      )

      clonedGameObjects := c
    })

    then("get 2 cloned gameObjects should return created ones", () => {
      clonedGameObjects.contents->expect == [[gameObject.contents + 1, gameObject.contents + 2]]
    })
  })

  test(."clone transform", ({given, \"and", \"when", then}) => {
    let gameObject1 = ref(Obj.magic(1))
    let transform1 = ref(Obj.magic(3))
    let clonedTransform1 = 11
    let clonedTransform2 = 12
    let sandbox = ref(Obj.magic(1))
    let getTransformFuncStub = ref(Obj.magic(1))
    let cloneTransformFuncStub = ref(Obj.magic(1))
    let addTransformFuncStub = ref(Obj.magic(1))

    _getContributeAndCreateAState((given, \"and"))

    given("prepare sandbox", () => {
      sandbox := createSandbox()
    })

    \"and"("create transform state", () => {
      transformState := Obj.magic(100)
    })

    \"and"("create a gameObject as gameObject1", () => {
      let (s, g1) = contribute.contents.createGameObjectFunc(. gameObjectState.contents)

      gameObjectState := s
      gameObject1 := g1
    })

    \"and"("create a transforms as transform1", () => {
      transform1 := 100
    })

    \"and"("add transform1 to gameObject1", () => {
      ()
    })

    \"when"("clone 2 gameObjects", () => {
      getTransformFuncStub := createEmptyStubWithJsObjSandbox(sandbox)
      cloneTransformFuncStub := createEmptyStubWithJsObjSandbox(sandbox)
      addTransformFuncStub := createEmptyStubWithJsObjSandbox(sandbox)

      getTransformFuncStub.contents
      ->Obj.magic
      ->onCall(0, _)
      ->returns(transform1.contents, _)
      ->ignore

      cloneTransformFuncStub.contents
      ->Obj.magic
      ->onCall(0, _)
      ->returns((transformState.contents, [clonedTransform1, clonedTransform2]), _)
      ->ignore

      let ((gs, ts, _, _), _) = _cloneGameObject(
        ~gameObjectState=gameObjectState.contents,
        ~transformState=transformState.contents,
        ~contribute=contribute.contents,
        ~gameObject=gameObject1.contents,
        ~getTransformFunc=getTransformFuncStub.contents,
        ~cloneTransformFunc=cloneTransformFuncStub.contents,
        ~addTransformFunc=addTransformFuncStub.contents,
        ~count=2,
        (),
      )

      gameObjectState := gs
      transformState := ts->Obj.magic
    })

    then("should clone 2 transforms as clonedTransforms", () => {
      (
        getTransformFuncStub.contents->Obj.magic->getCallCount,
        getTransformFuncStub.contents
        ->Obj.magic
        ->getCall(0, _)
        ->SinonTool.calledWithArg2(matchAny, gameObject1.contents),
        cloneTransformFuncStub.contents->Obj.magic->getCallCount,
        cloneTransformFuncStub.contents
        ->Obj.magic
        ->getCall(0, _)
        ->SinonTool.calledWithArg4(matchAny, [0, 1], (), transform1.contents),
      )->expect == (1, true, 1, true)
    })

    \"and"(
      "get 2 cloned gameObjects' transform should return [clonedTransforms[0], clonedTransforms[1]]",
      () => {
        let clonedGameObject1 = gameObject1.contents + 1
        let clonedGameObject2 = gameObject1.contents + 2

        (
          addTransformFuncStub.contents->Obj.magic->getCallCount,
          addTransformFuncStub.contents
          ->Obj.magic
          ->getCall(0, _)
          ->SinonTool.calledWithArg3(matchAny, clonedGameObject1, clonedTransform1),
          addTransformFuncStub.contents
          ->Obj.magic
          ->getCall(1, _)
          ->SinonTool.calledWithArg3(matchAny, clonedGameObject2, clonedTransform2),
        )->expect == (2, true, true)
      },
    )
  })

  test(."clone pbrMaterial", ({given, \"and", \"when", then}) => {
    let gameObject1 = ref(Obj.magic(1))
    let pbrMaterial1 = ref(Obj.magic(3))
    let clonedPBRMaterial1 = 11
    let clonedPBRMaterial2 = 12
    let isShareMaterial = true
    let sandbox = ref(Obj.magic(1))
    let getPBRMaterialFuncStub = ref(Obj.magic(1))
    let clonePBRMaterialFuncStub = ref(Obj.magic(1))
    let addPBRMaterialFuncStub = ref(Obj.magic(1))

    _getContributeAndCreateAState((given, \"and"))

    given("prepare sandbox", () => {
      sandbox := createSandbox()
    })

    \"and"("create pbrMaterial state", () => {
      pbrMaterialState := Obj.magic(100)
    })

    \"and"("create a gameObject as gameObject1", () => {
      let (s, g1) = contribute.contents.createGameObjectFunc(. gameObjectState.contents)

      gameObjectState := s
      gameObject1 := g1
    })

    \"and"("create a pbrMaterials as pbrMaterial1", () => {
      pbrMaterial1 := 100
    })

    \"and"("add pbrMaterial1 to gameObject1", () => {
      ()
    })

    \"when"("clone 2 gameObjects", () => {
      getPBRMaterialFuncStub := createEmptyStubWithJsObjSandbox(sandbox)
      clonePBRMaterialFuncStub := createEmptyStubWithJsObjSandbox(sandbox)
      addPBRMaterialFuncStub := createEmptyStubWithJsObjSandbox(sandbox)

      getPBRMaterialFuncStub.contents
      ->Obj.magic
      ->onCall(0, _)
      ->returns(pbrMaterial1.contents, _)
      ->ignore

      clonePBRMaterialFuncStub.contents
      ->Obj.magic
      ->onCall(0, _)
      ->returns((pbrMaterialState.contents, [clonedPBRMaterial1, clonedPBRMaterial2]), _)
      ->ignore

      let ((gs, ts, _, _), _) = _cloneGameObject(
        ~gameObjectState=gameObjectState.contents,
        ~pbrMaterialState=pbrMaterialState.contents,
        ~contribute=contribute.contents,
        ~gameObject=gameObject1.contents,
        ~isShareMaterial,
        ~getPBRMaterialFunc=getPBRMaterialFuncStub.contents,
        ~clonePBRMaterialFunc=clonePBRMaterialFuncStub.contents,
        ~addPBRMaterialFunc=addPBRMaterialFuncStub.contents,
        ~count=2,
        (),
      )

      gameObjectState := gs
      pbrMaterialState := ts->Obj.magic
    })

    then("should clone 2 pbrMaterials as clonedPBRMaterials with config", () => {
      (
        getPBRMaterialFuncStub.contents->Obj.magic->getCallCount,
        getPBRMaterialFuncStub.contents
        ->Obj.magic
        ->getCall(0, _)
        ->SinonTool.calledWithArg2(matchAny, gameObject1.contents),
        clonePBRMaterialFuncStub.contents->Obj.magic->getCallCount,
        clonePBRMaterialFuncStub.contents
        ->Obj.magic
        ->getCall(0, _)
        ->SinonTool.calledWithArg4(
          matchAny,
          [0, 1],
          ({isShare: isShareMaterial}: Meta3dComponentPbrmaterialProtocol.Index.cloneConfig),
          pbrMaterial1.contents,
        ),
      )->expect == (1, true, 1, true)
    })

    \"and"(
      "get 2 cloned gameObjects' pbrMaterial should return [clonedPBRMaterials[0], clonedPBRMaterials[1]]",
      () => {
        let clonedGameObject1 = gameObject1.contents + 1
        let clonedGameObject2 = gameObject1.contents + 2

        (
          addPBRMaterialFuncStub.contents->Obj.magic->getCallCount,
          addPBRMaterialFuncStub.contents
          ->Obj.magic
          ->getCall(0, _)
          ->SinonTool.calledWithArg3(matchAny, clonedGameObject1, clonedPBRMaterial1),
          addPBRMaterialFuncStub.contents
          ->Obj.magic
          ->getCall(1, _)
          ->SinonTool.calledWithArg3(matchAny, clonedGameObject2, clonedPBRMaterial2),
        )->expect == (2, true, true)
      },
    )
  })

  test(."clone geometry", ({given, \"and", \"when", then}) => {
    let gameObject1 = ref(Obj.magic(1))
    let geometry1 = ref(Obj.magic(3))
    let clonedGeometry1 = 11
    let clonedGeometry2 = 12
    let sandbox = ref(Obj.magic(1))
    let getGeometryFuncStub = ref(Obj.magic(1))
    let cloneGeometryFuncStub = ref(Obj.magic(1))
    let addGeometryFuncStub = ref(Obj.magic(1))

    _getContributeAndCreateAState((given, \"and"))

    given("prepare sandbox", () => {
      sandbox := createSandbox()
    })

    \"and"("create geometry state", () => {
      geometryState := Obj.magic(100)
    })

    \"and"("create a gameObject as gameObject1", () => {
      let (s, g1) = contribute.contents.createGameObjectFunc(. gameObjectState.contents)

      gameObjectState := s
      gameObject1 := g1
    })

    \"and"("create a geometrys as geometry1", () => {
      geometry1 := 100
    })

    \"and"("add geometry1 to gameObject1", () => {
      ()
    })

    \"when"("clone 2 gameObjects", () => {
      getGeometryFuncStub := createEmptyStubWithJsObjSandbox(sandbox)
      cloneGeometryFuncStub := createEmptyStubWithJsObjSandbox(sandbox)
      addGeometryFuncStub := createEmptyStubWithJsObjSandbox(sandbox)

      getGeometryFuncStub.contents->Obj.magic->onCall(0, _)->returns(geometry1.contents, _)->ignore

      cloneGeometryFuncStub.contents
      ->Obj.magic
      ->onCall(0, _)
      ->returns((geometryState.contents, [clonedGeometry1, clonedGeometry2]), _)
      ->ignore

      let ((gs, ts, _, _), _) = _cloneGameObject(
        ~gameObjectState=gameObjectState.contents,
        ~geometryState=geometryState.contents,
        ~contribute=contribute.contents,
        ~gameObject=gameObject1.contents,
        ~getGeometryFunc=getGeometryFuncStub.contents,
        ~cloneGeometryFunc=cloneGeometryFuncStub.contents,
        ~addGeometryFunc=addGeometryFuncStub.contents,
        ~count=2,
        (),
      )

      gameObjectState := gs
      geometryState := ts->Obj.magic
    })

    then("should clone 2 geometrys as clonedGeometrys", () => {
      (
        getGeometryFuncStub.contents->Obj.magic->getCallCount,
        getGeometryFuncStub.contents
        ->Obj.magic
        ->getCall(0, _)
        ->SinonTool.calledWithArg2(matchAny, gameObject1.contents),
        cloneGeometryFuncStub.contents->Obj.magic->getCallCount,
        cloneGeometryFuncStub.contents
        ->Obj.magic
        ->getCall(0, _)
        ->SinonTool.calledWithArg4(matchAny, [0, 1], (), geometry1.contents),
      )->expect == (1, true, 1, true)
    })

    \"and"(
      "get 2 cloned gameObjects' geometry should return [clonedGeometrys[0], clonedGeometrys[1]]",
      () => {
        let clonedGameObject1 = gameObject1.contents + 1
        let clonedGameObject2 = gameObject1.contents + 2

        (
          addGeometryFuncStub.contents->Obj.magic->getCallCount,
          addGeometryFuncStub.contents
          ->Obj.magic
          ->getCall(0, _)
          ->SinonTool.calledWithArg3(matchAny, clonedGameObject1, clonedGeometry1),
          addGeometryFuncStub.contents
          ->Obj.magic
          ->getCall(1, _)
          ->SinonTool.calledWithArg3(matchAny, clonedGameObject2, clonedGeometry2),
        )->expect == (2, true, true)
      },
    )
  })

  let _preprareSceneAndClone = (given, \"and", \"when") => {
    given("prepare sandbox", () => {
      sandbox := createSandbox()
    })

    \"and"("create two gameObject as gameObject1, gameObject2", () => {
      let (s, g1) = contribute.contents.createGameObjectFunc(. gameObjectState.contents)
      let (s, g2) = contribute.contents.createGameObjectFunc(. s)

      gameObjectState := s
      gameObject1 := g1
      gameObject2 := g2
    })

    \"and"("create two transforms as transform1, transform2", () => {
      transform1 := 100
      transform2 := 101
    })

    \"and"("add them to gameObjects", () => {
      ()
    })

    \"and"("set transform2's parent to transform1", () => {
      getTransformDataFuncStub := createEmptyStubWithJsObjSandbox(sandbox)

      getTransformDataFuncStub.contents
      ->Obj.magic
      ->onCall(0, _)
      ->returns([transform2.contents]->Js.Nullable.return, _)
      ->ignore
    })

    \"when"("clone 2 gameObjects of gameObject1", () => {
      getTransformFuncStub := createEmptyStubWithJsObjSandbox(sandbox)
      cloneTransformFuncStub := createEmptyStubWithJsObjSandbox(sandbox)
      addTransformFuncStub := createEmptyStubWithJsObjSandbox(sandbox)
      setTransformDataFuncStub := createEmptyStubWithJsObjSandbox(sandbox)
      getTransformGameObjectsFuncStub := createEmptyStubWithJsObjSandbox(sandbox)

      getTransformFuncStub.contents
      ->Obj.magic
      ->onCall(0, _)
      ->returns(transform1.contents, _)
      ->ignore

      cloneTransformFuncStub.contents
      ->Obj.magic
      ->onCall(0, _)
      ->returns((transformState.contents, [clonedTransform1, clonedTransform2]), _)
      ->ignore

      cloneTransformFuncStub.contents
      ->Obj.magic
      ->onCall(1, _)
      ->returns((transformState.contents, [clonedTransform3, clonedTransform4]), _)
      ->ignore

      getTransformGameObjectsFuncStub.contents
      ->Obj.magic
      ->onCall(0, _)
      ->returns((transformState.contents, [gameObject2.contents]), _)
      ->ignore

      let ((gs, ts, _, _), c) = _cloneGameObject(
        ~gameObjectState=gameObjectState.contents,
        ~transformState=transformState.contents,
        ~contribute=contribute.contents,
        ~gameObject=gameObject1.contents,
        ~getTransformFunc=getTransformFuncStub.contents,
        ~cloneTransformFunc=cloneTransformFuncStub.contents,
        ~addTransformFunc=addTransformFuncStub.contents,
        ~getTransformDataFunc=getTransformDataFuncStub.contents,
        ~setTransformDataFunc=setTransformDataFuncStub.contents,
        ~getTransformGameObjectsFunc=getTransformGameObjectsFuncStub.contents,
        ~count=2,
        (),
      )

      gameObjectState := gs
      transformState := ts->Obj.magic
      clonedGameObjects := c
    })
  }

  test(."get all cloned gameObjects(include cloned children)", ({given, \"when", \"and", then}) => {
    _getContributeAndCreateAState((given, \"and"))

    _preprareSceneAndClone(given, \"and", \"when")

    then("get cloned gameObjects should include cloned children gameObjects", () => {
      (
        getTransformFuncStub.contents->Obj.magic->getCallCount,
        getTransformFuncStub.contents
        ->Obj.magic
        ->getCall(0, _)
        ->SinonTool.calledWithArg2(matchAny, gameObject1.contents),
        cloneTransformFuncStub.contents->Obj.magic->getCallCount,
        cloneTransformFuncStub.contents
        ->Obj.magic
        ->getCall(0, _)
        ->SinonTool.calledWithArg4(matchAny, [0, 1], (), transform1.contents),
        cloneTransformFuncStub.contents
        ->Obj.magic
        ->getCall(1, _)
        ->SinonTool.calledWithArg4(matchAny, [0, 1], (), transform2.contents),
        getTransformGameObjectsFuncStub.contents->Obj.magic->getCallCount,
        getTransformGameObjectsFuncStub.contents
        ->Obj.magic
        ->getCall(0, _)
        ->SinonTool.calledWithArg2(matchAny, transform2.contents),
        getTransformDataFuncStub.contents->Obj.magic->getCallCount,
        getTransformDataFuncStub.contents
        ->Obj.magic
        ->getCall(0, _)
        ->SinonTool.calledWithArg3(
          matchAny,
          transform1.contents,
          Meta3dComponentTransformProtocol.Index.dataName.children,
        ),
        getTransformDataFuncStub.contents
        ->Obj.magic
        ->getCall(1, _)
        ->SinonTool.calledWithArg3(
          matchAny,
          transform2.contents,
          Meta3dComponentTransformProtocol.Index.dataName.children,
        ),
      )->expect == (1, true, 2, true, true, 1, true, 2, true, true)
    })
  })

  test(."clone children's components", ({given, \"when", \"and", then}) => {
    _getContributeAndCreateAState((given, \"and"))

    _preprareSceneAndClone(given, \"and", \"when")

    then("should clone 4 transforms as clonedTransforms", () => {
      (
        cloneTransformFuncStub.contents->Obj.magic->getCallCount,
        cloneTransformFuncStub.contents
        ->Obj.magic
        ->getCall(0, _)
        ->SinonTool.calledWithArg4(matchAny, [0, 1], (), transform1.contents),
        cloneTransformFuncStub.contents
        ->Obj.magic
        ->getCall(1, _)
        ->SinonTool.calledWithArg4(matchAny, [0, 1], (), transform2.contents),
      )->expect == (2, true, true)
    })

    \"and"(
      "get 4 cloned gameObjects' transform should return [clonedTransforms[0], clonedTransforms[1], clonedGeometrys[2], [3]]",
      () => {
        (
          addTransformFuncStub.contents->Obj.magic->getCallCount,
          addTransformFuncStub.contents
          ->Obj.magic
          ->getCall(0, _)
          ->SinonTool.calledWithArg3(matchAny, clonedGameObjects.contents[0][0], clonedTransform1),
          addTransformFuncStub.contents
          ->Obj.magic
          ->getCall(1, _)
          ->SinonTool.calledWithArg3(matchAny, clonedGameObjects.contents[0][1], clonedTransform2),
          addTransformFuncStub.contents
          ->Obj.magic
          ->getCall(2, _)
          ->SinonTool.calledWithArg3(matchAny, clonedGameObjects.contents[1][0], clonedTransform3),
          addTransformFuncStub.contents
          ->Obj.magic
          ->getCall(3, _)
          ->SinonTool.calledWithArg3(matchAny, clonedGameObjects.contents[1][1], clonedTransform4),
        )->expect == (4, true, true, true, true)
      },
    )
  })

  test(."set parent", ({given, \"when", \"and", then}) => {
    _getContributeAndCreateAState((given, \"and"))

    _preprareSceneAndClone(given, \"and", \"when")

    then("set cloned transforms' parent", () => {
      (
        setTransformDataFuncStub.contents->Obj.magic->getCallCount,
        setTransformDataFuncStub.contents
        ->Obj.magic
        ->getCall(0, _)
        ->SinonTool.calledWithArg4(
          matchAny,
          clonedTransform3,
          Meta3dComponentTransformProtocol.Index.dataName.parent,
          clonedTransform1,
        ),
        setTransformDataFuncStub.contents
        ->Obj.magic
        ->getCall(1, _)
        ->SinonTool.calledWithArg4(
          matchAny,
          clonedTransform4,
          Meta3dComponentTransformProtocol.Index.dataName.parent,
          clonedTransform2,
        ),
      )->expect == (2, true, true)
    })
  })
})
