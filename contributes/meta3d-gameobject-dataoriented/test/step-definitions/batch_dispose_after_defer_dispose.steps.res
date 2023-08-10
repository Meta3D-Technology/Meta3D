open Meta3dBsJestCucumber
open Cucumber
open Expect
open Operators

open Sinon

let feature = loadFeature("./test/features/batch_dispose_after_defer_dispose.feature")

defineFeature(feature, test => {
  let sandbox = ref(Obj.magic(1))
  let contribute = ref(Obj.magic(1))
  let gameObjectState = ref(Obj.magic(1))
  let transformState = ref(Obj.magic(1))
  let pbrMaterialState = ref(Obj.magic(1))
  let geometryState = ref(Obj.magic(1))
  let directionLightState = ref(Obj.magic(1))
  let arcballCameraControllerState = ref(Obj.magic(1))
  let basicCameraViewState = ref(Obj.magic(1))
  let perspectiveCameraProjectionState = ref(Obj.magic(1))

  let _getContributeAndCreateAState = ((given, \"and")) => {
    given("I get contribute", () => {
      contribute := MainTool.getContribute()
    })

    \"and"("create a state", () => {
      gameObjectState := StateTool.createState(~contribute=contribute.contents, ())
    })
  }

  test(."dispose transform", ({given, \"and", \"when", then}) => {
    let gameObject1 = ref(Obj.magic(1))
    let gameObject2 = ref(Obj.magic(2))
    let transform1 = ref(Obj.magic(3))
    let transform2 = ref(Obj.magic(4))
    let sandbox = ref(Obj.magic(1))
    let deferDisposeTransformFuncStub = ref(Obj.magic(1))
    let disposeTransformsFuncStub = ref(Obj.magic(1))

    _getContributeAndCreateAState((given, \"and"))

    given(
      "prepare sandbox",
      () => {
        sandbox := createSandbox()
      },
    )

    \"and"(
      "create transform state",
      () => {
        transformState := Obj.magic(100)
      },
    )

    \"and"(
      %re("/^create two gameObjects as gameObject(\d+), gameObject(\d+)$/")->Obj.magic,
      () => {
        let (s, g1) = contribute.contents.createGameObjectFunc(. gameObjectState.contents)
        let (s, g2) = contribute.contents.createGameObjectFunc(. s)

        gameObjectState := s
        gameObject1 := g1
        gameObject2 := g2
      },
    )

    \"and"(
      %re("/^create two transforms as transform(\d+), transform(\d+)$/")->Obj.magic,
      () => {
        transform1 := 100
        transform2 := 101
      },
    )

    \"and"(
      %re("/^add transform(\d+) to gameObject(\d+)$/")->Obj.magic,
      () => {
        ()
      },
    )

    \"and"(
      %re("/^add transform(\d+) to gameObject(\d+)$/")->Obj.magic,
      () => {
        ()
      },
    )

    \"and"(
      %re("/^defer dispose gameObject(\d+)$/")->Obj.magic,
      arg0 => {
        deferDisposeTransformFuncStub := createEmptyStubWithJsObjSandbox(sandbox)

        let (gs, ts, _, _, _, _, _, _) = DisposeTool.deferDisposeGameObject(
          ~gameObjectState=gameObjectState.contents,
          ~contribute=contribute.contents,
          ~gameObject=gameObject1.contents,
          ~transformState=transformState.contents,
          ~transformFuncs=(
            (. _, _) => transform1.contents->Meta3dCommonlib.NullableSt.return,
            deferDisposeTransformFuncStub.contents,
          ),
          (),
        )

        gameObjectState := gs
        transformState := ts->Obj.magic
      },
    )

    \"and"(
      %re("/^defer dispose gameObject(\d+)$/")->Obj.magic,
      arg0 => {
        let (gs, ts, _, _, _, _, _, _) = DisposeTool.deferDisposeGameObject(
          ~gameObjectState=gameObjectState.contents,
          ~contribute=contribute.contents,
          ~gameObject=gameObject2.contents,
          ~transformState=transformState.contents,
          ~transformFuncs=(
            (. _, _) => transform2.contents->Meta3dCommonlib.NullableSt.return,
            deferDisposeTransformFuncStub.contents,
          ),
          (),
        )

        gameObjectState := gs
        transformState := ts->Obj.magic
      },
    )

    \"when"(
      "dispose [gameObject1, gameObject2]",
      () => {
        disposeTransformsFuncStub := createEmptyStubWithJsObjSandbox(sandbox)
        let (gs, ts, _, _, _, _, _, _) = DisposeTool.disposeGameObjects(
          ~gameObjectState=gameObjectState.contents,
          ~contribute=contribute.contents,
          ~gameObjects=[gameObject1.contents, gameObject2.contents],
          ~transformState=transformState.contents,
          ~transformFuncs=(
            (. transformState, gameObject) =>
              Meta3dCommonlib.EqualTool.isEqual(gameObject, gameObject1.contents)
                ? transform1.contents->Js.Nullable.return
                : transform2.contents->Js.Nullable.return,
            disposeTransformsFuncStub.contents,
          ),
          (),
        )

        gameObjectState := gs
        transformState := ts->Obj.magic
      },
    )

    then(
      "should dispose [transform1, transform2]",
      () => {
        (
          deferDisposeTransformFuncStub.contents
          ->Obj.magic
          ->getCall(0, _)
          ->SinonTool.calledWithArg2(matchAny, (transform1.contents, matchAny)),
          deferDisposeTransformFuncStub.contents
          ->Obj.magic
          ->getCall(1, _)
          ->SinonTool.calledWithArg2(matchAny, (transform2.contents, matchAny)),
          disposeTransformsFuncStub.contents
          ->Obj.magic
          ->SinonTool.calledWithArg2(matchAny, [transform1.contents, transform2.contents]),
        )->expect == (true, true, true)
      },
    )
  })

  test(."dispose pbrMaterial which has one gameObject", ({given, \"and", \"when", then}) => {
    let gameObject1 = ref(Obj.magic(1))
    let gameObject2 = ref(Obj.magic(2))
    let pbrMaterial1 = ref(Obj.magic(3))
    let pbrMaterial2 = ref(Obj.magic(4))
    let sandbox = ref(Obj.magic(1))
    let deferDisposePBRMaterialFuncStub = ref(Obj.magic(1))
    let disposePBRMaterialsFuncStub = ref(Obj.magic(1))

    _getContributeAndCreateAState((given, \"and"))

    given(
      "prepare sandbox",
      () => {
        sandbox := createSandbox()
      },
    )

    \"and"(
      "create pbrMaterial state",
      () => {
        pbrMaterialState :=
          {
            "gameObjectPBRMaterialMap": Meta3dCommonlib.MutableSparseMap.createEmpty(),
          }
      },
    )

    \"and"(
      %re("/^create two gameObjects as gameObject(\d+), gameObject(\d+)$/")->Obj.magic,
      () => {
        let (s, g1) = contribute.contents.createGameObjectFunc(. gameObjectState.contents)
        let (s, g2) = contribute.contents.createGameObjectFunc(. s)

        gameObjectState := s
        gameObject1 := g1
        gameObject2 := g2
      },
    )

    \"and"(
      %re("/^create two pbrMaterials as pbrMaterial(\d+), pbrMaterial(\d+)$/")->Obj.magic,
      () => {
        pbrMaterial1 := 100
        pbrMaterial2 := 101
      },
    )

    \"and"(
      %re("/^add pbrMaterial(\d+) to gameObject(\d+)$/")->Obj.magic,
      () => {
        pbrMaterialState.contents["gameObjectPBRMaterialMap"]
        ->Meta3dCommonlib.MutableSparseMap.set(gameObject1.contents, pbrMaterial1.contents)
        ->ignore
      },
    )

    \"and"(
      %re("/^add pbrMaterial(\d+) to gameObject(\d+)$/")->Obj.magic,
      () => {
        pbrMaterialState.contents["gameObjectPBRMaterialMap"]
        ->Meta3dCommonlib.MutableSparseMap.set(gameObject2.contents, pbrMaterial2.contents)
        ->ignore
      },
    )

    \"and"(
      %re("/^defer dispose gameObject(\d+)$/")->Obj.magic,
      arg0 => {
        deferDisposePBRMaterialFuncStub := createEmptyStubWithJsObjSandbox(sandbox)

        let (gs, _, ps, _, _, _, _, _) = DisposeTool.deferDisposeGameObject(
          ~gameObjectState=gameObjectState.contents,
          ~contribute=contribute.contents,
          ~gameObject=gameObject1.contents,
          ~pbrMaterialState=pbrMaterialState.contents,
          ~pbrMaterialFuncs=(
            (. _, _) => pbrMaterial1.contents->Meta3dCommonlib.NullableSt.return,
            deferDisposePBRMaterialFuncStub.contents,
          ),
          (),
        )

        gameObjectState := gs
        pbrMaterialState := ps->Obj.magic
      },
    )

    \"and"(
      %re("/^defer dispose gameObject(\d+)$/")->Obj.magic,
      arg0 => {
        let (gs, _, ps, _, _, _, _, _) = DisposeTool.deferDisposeGameObject(
          ~gameObjectState=gameObjectState.contents,
          ~contribute=contribute.contents,
          ~gameObject=gameObject2.contents,
          ~pbrMaterialState=pbrMaterialState.contents,
          ~pbrMaterialFuncs=(
            (. _, _) => pbrMaterial2.contents->Meta3dCommonlib.NullableSt.return,
            deferDisposePBRMaterialFuncStub.contents,
          ),
          (),
        )

        gameObjectState := gs
        pbrMaterialState := ps->Obj.magic
      },
    )

    \"when"(
      "dispose [gameObject1, gameObject2]",
      () => {
        disposePBRMaterialsFuncStub := createEmptyStubWithJsObjSandbox(sandbox)
        let (gs, _, ps, _, _, _, _, _) = DisposeTool.disposeGameObjects(
          ~gameObjectState=gameObjectState.contents,
          ~contribute=contribute.contents,
          ~gameObjects=[gameObject1.contents, gameObject2.contents],
          ~pbrMaterialState=pbrMaterialState.contents,
          ~pbrMaterialFuncs=(
            (. pbrMaterialState, gameObject) =>
              Meta3dCommonlib.EqualTool.isEqual(gameObject, gameObject1.contents)
                ? pbrMaterial1.contents->Js.Nullable.return
                : pbrMaterial2.contents->Js.Nullable.return,
            disposePBRMaterialsFuncStub.contents,
          ),
          (),
        )

        gameObjectState := gs
        pbrMaterialState := ps->Obj.magic
      },
    )

    then(
      "should dispose [[pbrMaterial1, gameObject1], [pbrMaterial2, gameObject2]]",
      () => {
        (
          deferDisposePBRMaterialFuncStub.contents
          ->Obj.magic
          ->getCall(0, _)
          ->SinonTool.calledWithArg2(matchAny, (pbrMaterial1.contents, matchAny)),
          deferDisposePBRMaterialFuncStub.contents
          ->Obj.magic
          ->getCall(1, _)
          ->SinonTool.calledWithArg2(matchAny, (pbrMaterial2.contents, matchAny)),
          disposePBRMaterialsFuncStub.contents
          ->Obj.magic
          ->SinonTool.calledWithArg2(
            matchAny,
            Meta3dCommonlib.MutableSparseMap.createEmpty()
            ->Meta3dCommonlib.MutableSparseMap.set(pbrMaterial1.contents, [gameObject1.contents])
            ->Meta3dCommonlib.MutableSparseMap.set(pbrMaterial2.contents, [gameObject2.contents]),
          ),
        )->expect == (true, true, true)
      },
    )
  })

  test(."dispose pbrMaterial which has two gameObjects with its all gameObjects", ({
    given,
    \"and",
    \"when",
    then,
  }) => {
    let gameObject1 = ref(Obj.magic(1))
    let gameObject2 = ref(Obj.magic(2))
    let gameObject3 = ref(Obj.magic(2))
    let pbrMaterial1 = ref(Obj.magic(3))
    let pbrMaterial2 = ref(Obj.magic(4))
    let sandbox = ref(Obj.magic(1))
    let deferDisposePBRMaterialFuncStub = ref(Obj.magic(1))
    let disposePBRMaterialsFuncStub = ref(Obj.magic(1))

    _getContributeAndCreateAState((given, \"and"))

    given(
      "prepare sandbox",
      () => {
        sandbox := createSandbox()
      },
    )

    \"and"(
      "create pbrMaterial state",
      () => {
        pbrMaterialState :=
          {
            "gameObjectPBRMaterialMap": Meta3dCommonlib.MutableSparseMap.createEmpty(),
          }
      },
    )

    \"and"(
      "create three gameObjects as gameObject1, gameObject2, gameObject3",
      () => {
        let (s, g1) = contribute.contents.createGameObjectFunc(. gameObjectState.contents)
        let (s, g2) = contribute.contents.createGameObjectFunc(. s)
        let (s, g3) = contribute.contents.createGameObjectFunc(. s)

        gameObjectState := s
        gameObject1 := g1
        gameObject2 := g2
        gameObject3 := g3
      },
    )

    \"and"(
      %re("/^create two pbrMaterials as pbrMaterial(\d+), pbrMaterial(\d+)$/")->Obj.magic,
      () => {
        pbrMaterial1 := 100
        pbrMaterial2 := 101
      },
    )

    \"and"(
      %re("/^add pbrMaterial(\d+) to gameObject(\d+)$/")->Obj.magic,
      () => {
        pbrMaterialState.contents["gameObjectPBRMaterialMap"]
        ->Meta3dCommonlib.MutableSparseMap.set(gameObject1.contents, pbrMaterial1.contents)
        ->ignore
      },
    )

    \"and"(
      %re("/^add pbrMaterial(\d+) to gameObject(\d+)$/")->Obj.magic,
      () => {
        pbrMaterialState.contents["gameObjectPBRMaterialMap"]
        ->Meta3dCommonlib.MutableSparseMap.set(gameObject2.contents, pbrMaterial2.contents)
        ->ignore
      },
    )

    \"and"(
      %re("/^add pbrMaterial(\d+) to gameObject(\d+)$/")->Obj.magic,
      () => {
        pbrMaterialState.contents["gameObjectPBRMaterialMap"]
        ->Meta3dCommonlib.MutableSparseMap.set(gameObject3.contents, pbrMaterial2.contents)
        ->ignore
      },
    )

    \"and"(
      %re("/^defer dispose gameObject(\d+)$/")->Obj.magic,
      arg0 => {
        deferDisposePBRMaterialFuncStub := createEmptyStubWithJsObjSandbox(sandbox)

        let (gs, _, ps, _, _, _, _, _) = DisposeTool.deferDisposeGameObject(
          ~gameObjectState=gameObjectState.contents,
          ~contribute=contribute.contents,
          ~gameObject=gameObject1.contents,
          ~pbrMaterialState=pbrMaterialState.contents,
          ~pbrMaterialFuncs=(
            (. _, _) => pbrMaterial1.contents->Meta3dCommonlib.NullableSt.return,
            deferDisposePBRMaterialFuncStub.contents,
          ),
          (),
        )

        gameObjectState := gs
        pbrMaterialState := ps->Obj.magic
      },
    )

    \"and"(
      %re("/^defer dispose gameObject(\d+)$/")->Obj.magic,
      arg0 => {
        let (gs, _, ps, _, _, _, _, _) = DisposeTool.deferDisposeGameObject(
          ~gameObjectState=gameObjectState.contents,
          ~contribute=contribute.contents,
          ~gameObject=gameObject2.contents,
          ~pbrMaterialState=pbrMaterialState.contents,
          ~pbrMaterialFuncs=(
            (. _, _) => pbrMaterial2.contents->Meta3dCommonlib.NullableSt.return,
            deferDisposePBRMaterialFuncStub.contents,
          ),
          (),
        )

        gameObjectState := gs
        pbrMaterialState := ps->Obj.magic
      },
    )

    \"and"(
      %re("/^defer dispose gameObject(\d+)$/")->Obj.magic,
      arg0 => {
        let (gs, _, ps, _, _, _, _, _) = DisposeTool.deferDisposeGameObject(
          ~gameObjectState=gameObjectState.contents,
          ~contribute=contribute.contents,
          ~gameObject=gameObject3.contents,
          ~pbrMaterialState=pbrMaterialState.contents,
          ~pbrMaterialFuncs=(
            (. _, _) => pbrMaterial2.contents->Meta3dCommonlib.NullableSt.return,
            deferDisposePBRMaterialFuncStub.contents,
          ),
          (),
        )

        gameObjectState := gs
        pbrMaterialState := ps->Obj.magic
      },
    )

    \"when"(
      "dispose [gameObject1, gameObject2, gameObject3]",
      () => {
        disposePBRMaterialsFuncStub := createEmptyStubWithJsObjSandbox(sandbox)
        let (gs, _, ps, _, _, _, _, _) = DisposeTool.disposeGameObjects(
          ~gameObjectState=gameObjectState.contents,
          ~contribute=contribute.contents,
          ~gameObjects=[gameObject1.contents, gameObject2.contents, gameObject3.contents],
          ~pbrMaterialState=pbrMaterialState.contents,
          ~pbrMaterialFuncs=(
            (. pbrMaterialState, gameObject) =>
              Meta3dCommonlib.EqualTool.isEqual(gameObject, gameObject1.contents)
                ? pbrMaterial1.contents->Js.Nullable.return
                : Meta3dCommonlib.EqualTool.isEqual(gameObject, gameObject2.contents)
                ? pbrMaterial2.contents->Js.Nullable.return
                : pbrMaterial2.contents->Js.Nullable.return,
            disposePBRMaterialsFuncStub.contents,
          ),
          (),
        )

        gameObjectState := gs
        pbrMaterialState := ps->Obj.magic
      },
    )

    then(
      "should dispose [[pbrMaterial1, gameObject1], [pbrMaterial2, gameObject2, gameObject3]]",
      () => {
        (
          deferDisposePBRMaterialFuncStub.contents
          ->Obj.magic
          ->getCall(0, _)
          ->SinonTool.calledWithArg2(matchAny, (pbrMaterial1.contents, gameObject1.contents)),
          deferDisposePBRMaterialFuncStub.contents
          ->Obj.magic
          ->getCall(1, _)
          ->SinonTool.calledWithArg2(matchAny, (pbrMaterial2.contents, gameObject2.contents)),
          deferDisposePBRMaterialFuncStub.contents
          ->Obj.magic
          ->getCall(2, _)
          ->SinonTool.calledWithArg2(matchAny, (pbrMaterial2.contents, gameObject3.contents)),
          disposePBRMaterialsFuncStub.contents
          ->Obj.magic
          ->SinonTool.calledWithArg2(
            matchAny,
            Meta3dCommonlib.MutableSparseMap.createEmpty()
            ->Meta3dCommonlib.MutableSparseMap.set(pbrMaterial1.contents, [gameObject1.contents])
            ->Meta3dCommonlib.MutableSparseMap.set(
              pbrMaterial2.contents,
              [gameObject2.contents, gameObject3.contents],
            ),
          ),
        )->expect == (true, true, true, true)
      },
    )
  })

  test(."dispose pbrMaterial which has two gameObjects not with its all gameObjects", ({
    given,
    \"and",
    \"when",
    then,
  }) => {
    let gameObject1 = ref(Obj.magic(1))
    let gameObject2 = ref(Obj.magic(2))
    let gameObject3 = ref(Obj.magic(2))
    let pbrMaterial1 = ref(Obj.magic(3))
    let pbrMaterial2 = ref(Obj.magic(4))
    let sandbox = ref(Obj.magic(1))
    let deferDisposePBRMaterialFuncStub = ref(Obj.magic(1))
    let disposePBRMaterialsFuncStub = ref(Obj.magic(1))

    _getContributeAndCreateAState((given, \"and"))

    given(
      "prepare sandbox",
      () => {
        sandbox := createSandbox()
      },
    )

    \"and"(
      "create pbrMaterial state",
      () => {
        pbrMaterialState :=
          {
            "gameObjectPBRMaterialMap": Meta3dCommonlib.MutableSparseMap.createEmpty(),
          }
      },
    )

    \"and"(
      "create three gameObjects as gameObject1, gameObject2, gameObject3",
      () => {
        let (s, g1) = contribute.contents.createGameObjectFunc(. gameObjectState.contents)
        let (s, g2) = contribute.contents.createGameObjectFunc(. s)
        let (s, g3) = contribute.contents.createGameObjectFunc(. s)

        gameObjectState := s
        gameObject1 := g1
        gameObject2 := g2
        gameObject3 := g3
      },
    )

    \"and"(
      %re("/^create two pbrMaterials as pbrMaterial(\d+), pbrMaterial(\d+)$/")->Obj.magic,
      () => {
        pbrMaterial1 := 100
        pbrMaterial2 := 101
      },
    )

    \"and"(
      %re("/^add pbrMaterial(\d+) to gameObject(\d+)$/")->Obj.magic,
      () => {
        pbrMaterialState.contents["gameObjectPBRMaterialMap"]
        ->Meta3dCommonlib.MutableSparseMap.set(gameObject1.contents, pbrMaterial1.contents)
        ->ignore
      },
    )

    \"and"(
      %re("/^add pbrMaterial(\d+) to gameObject(\d+)$/")->Obj.magic,
      () => {
        pbrMaterialState.contents["gameObjectPBRMaterialMap"]
        ->Meta3dCommonlib.MutableSparseMap.set(gameObject2.contents, pbrMaterial2.contents)
        ->ignore
      },
    )

    \"and"(
      %re("/^add pbrMaterial(\d+) to gameObject(\d+)$/")->Obj.magic,
      () => {
        pbrMaterialState.contents["gameObjectPBRMaterialMap"]
        ->Meta3dCommonlib.MutableSparseMap.set(gameObject3.contents, pbrMaterial2.contents)
        ->ignore
      },
    )

    \"and"(
      %re("/^defer dispose gameObject(\d+)$/")->Obj.magic,
      arg0 => {
        deferDisposePBRMaterialFuncStub := createEmptyStubWithJsObjSandbox(sandbox)

        let (gs, _, ps, _, _, _, _, _) = DisposeTool.deferDisposeGameObject(
          ~gameObjectState=gameObjectState.contents,
          ~contribute=contribute.contents,
          ~gameObject=gameObject1.contents,
          ~pbrMaterialState=pbrMaterialState.contents,
          ~pbrMaterialFuncs=(
            (. _, _) => pbrMaterial1.contents->Meta3dCommonlib.NullableSt.return,
            deferDisposePBRMaterialFuncStub.contents,
          ),
          (),
        )

        gameObjectState := gs
        pbrMaterialState := ps->Obj.magic
      },
    )

    \"and"(
      %re("/^defer dispose gameObject(\d+)$/")->Obj.magic,
      arg0 => {
        let (gs, _, ps, _, _, _, _, _) = DisposeTool.deferDisposeGameObject(
          ~gameObjectState=gameObjectState.contents,
          ~contribute=contribute.contents,
          ~gameObject=gameObject2.contents,
          ~pbrMaterialState=pbrMaterialState.contents,
          ~pbrMaterialFuncs=(
            (. _, _) => pbrMaterial2.contents->Meta3dCommonlib.NullableSt.return,
            deferDisposePBRMaterialFuncStub.contents,
          ),
          (),
        )

        gameObjectState := gs
        pbrMaterialState := ps->Obj.magic
      },
    )

    \"when"(
      "dispose [gameObject1, gameObject2]",
      () => {
        disposePBRMaterialsFuncStub := createEmptyStubWithJsObjSandbox(sandbox)
        let (gs, _, ps, _, _, _, _, _) = DisposeTool.disposeGameObjects(
          ~gameObjectState=gameObjectState.contents,
          ~contribute=contribute.contents,
          ~gameObjects=[gameObject1.contents, gameObject2.contents],
          ~pbrMaterialState=pbrMaterialState.contents,
          ~pbrMaterialFuncs=(
            (. pbrMaterialState, gameObject) =>
              Meta3dCommonlib.EqualTool.isEqual(gameObject, gameObject1.contents)
                ? pbrMaterial1.contents->Js.Nullable.return
                : pbrMaterial2.contents->Js.Nullable.return,
            disposePBRMaterialsFuncStub.contents,
          ),
          (),
        )

        gameObjectState := gs
        pbrMaterialState := ps->Obj.magic
      },
    )

    then(
      "should dispose [[pbrMaterial1, gameObject1], [pbrMaterial2, gameObject2]]",
      () => {
        (
          deferDisposePBRMaterialFuncStub.contents
          ->Obj.magic
          ->getCall(0, _)
          ->SinonTool.calledWithArg2(matchAny, (pbrMaterial1.contents, gameObject1.contents)),
          deferDisposePBRMaterialFuncStub.contents
          ->Obj.magic
          ->getCall(1, _)
          ->SinonTool.calledWithArg2(matchAny, (pbrMaterial2.contents, gameObject2.contents)),
          deferDisposePBRMaterialFuncStub.contents->Obj.magic->getCallCount,
          disposePBRMaterialsFuncStub.contents
          ->Obj.magic
          ->SinonTool.calledWithArg2(
            matchAny,
            Meta3dCommonlib.MutableSparseMap.createEmpty()
            ->Meta3dCommonlib.MutableSparseMap.set(pbrMaterial1.contents, [gameObject1.contents])
            ->Meta3dCommonlib.MutableSparseMap.set(pbrMaterial2.contents, [gameObject2.contents]),
          ),
        )->expect == (true, true, 2, true)
      },
    )
  })

  test(."dispose geometry which has one gameObject", ({given, \"and", \"when", then}) => {
    let gameObject1 = ref(Obj.magic(1))
    let gameObject2 = ref(Obj.magic(2))
    let geometry1 = ref(Obj.magic(3))
    let geometry2 = ref(Obj.magic(4))
    let sandbox = ref(Obj.magic(1))
    let deferDisposeGeometryFuncStub = ref(Obj.magic(1))
    let disposeGeometrysFuncStub = ref(Obj.magic(1))

    _getContributeAndCreateAState((given, \"and"))

    given(
      "prepare sandbox",
      () => {
        sandbox := createSandbox()
      },
    )

    \"and"(
      "create geometry state",
      () => {
        geometryState :=
          {
            "gameObjectGeometryMap": Meta3dCommonlib.MutableSparseMap.createEmpty(),
          }
      },
    )

    \"and"(
      %re("/^create two gameObjects as gameObject(\d+), gameObject(\d+)$/")->Obj.magic,
      () => {
        let (s, g1) = contribute.contents.createGameObjectFunc(. gameObjectState.contents)
        let (s, g2) = contribute.contents.createGameObjectFunc(. s)

        gameObjectState := s
        gameObject1 := g1
        gameObject2 := g2
      },
    )

    \"and"(
      %re("/^create two geometrys as geometry(\d+), geometry(\d+)$/")->Obj.magic,
      () => {
        geometry1 := 100
        geometry2 := 101
      },
    )

    \"and"(
      %re("/^add geometry(\d+) to gameObject(\d+)$/")->Obj.magic,
      () => {
        geometryState.contents["gameObjectGeometryMap"]
        ->Meta3dCommonlib.MutableSparseMap.set(gameObject1.contents, geometry1.contents)
        ->ignore
      },
    )

    \"and"(
      %re("/^add geometry(\d+) to gameObject(\d+)$/")->Obj.magic,
      () => {
        geometryState.contents["gameObjectGeometryMap"]
        ->Meta3dCommonlib.MutableSparseMap.set(gameObject2.contents, geometry2.contents)
        ->ignore
      },
    )

    \"and"(
      %re("/^defer dispose gameObject(\d+)$/")->Obj.magic,
      arg0 => {
        deferDisposeGeometryFuncStub := createEmptyStubWithJsObjSandbox(sandbox)

        let (gs, _, _, geos, _, _, _, _) = DisposeTool.deferDisposeGameObject(
          ~gameObjectState=gameObjectState.contents,
          ~contribute=contribute.contents,
          ~gameObject=gameObject1.contents,
          ~geometryState=geometryState.contents,
          ~geometryFuncs=(
            (. _, _) => geometry1.contents->Meta3dCommonlib.NullableSt.return,
            deferDisposeGeometryFuncStub.contents,
          ),
          (),
        )

        gameObjectState := gs
        geometryState := geos->Obj.magic
      },
    )

    \"and"(
      %re("/^defer dispose gameObject(\d+)$/")->Obj.magic,
      arg0 => {
        let (gs, _, ps, _, _, _, _, _) = DisposeTool.deferDisposeGameObject(
          ~gameObjectState=gameObjectState.contents,
          ~contribute=contribute.contents,
          ~gameObject=gameObject2.contents,
          ~geometryState=geometryState.contents,
          ~geometryFuncs=(
            (. _, _) => geometry2.contents->Meta3dCommonlib.NullableSt.return,
            deferDisposeGeometryFuncStub.contents,
          ),
          (),
        )

        gameObjectState := gs
        geometryState := ps->Obj.magic
      },
    )

    \"when"(
      "dispose [gameObject1, gameObject2]",
      () => {
        disposeGeometrysFuncStub := createEmptyStubWithJsObjSandbox(sandbox)
        let (gs, _, _, geos, _, _, _, _) = DisposeTool.disposeGameObjects(
          ~gameObjectState=gameObjectState.contents,
          ~contribute=contribute.contents,
          ~gameObjects=[gameObject1.contents, gameObject2.contents],
          ~geometryState=geometryState.contents,
          ~geometryFuncs=(
            (. geometryState, gameObject) =>
              Meta3dCommonlib.EqualTool.isEqual(gameObject, gameObject1.contents)
                ? geometry1.contents->Js.Nullable.return
                : geometry2.contents->Js.Nullable.return,
            disposeGeometrysFuncStub.contents,
          ),
          (),
        )

        gameObjectState := gs
        geometryState := geos->Obj.magic
      },
    )

    then(
      "should dispose [[geometry1, gameObject1], [geometry2, gameObject2]]",
      () => {
        (
          deferDisposeGeometryFuncStub.contents
          ->Obj.magic
          ->getCall(0, _)
          ->SinonTool.calledWithArg2(matchAny, (geometry1.contents, matchAny)),
          deferDisposeGeometryFuncStub.contents
          ->Obj.magic
          ->getCall(1, _)
          ->SinonTool.calledWithArg2(matchAny, (geometry2.contents, matchAny)),
          disposeGeometrysFuncStub.contents
          ->Obj.magic
          ->SinonTool.calledWithArg2(
            matchAny,
            Meta3dCommonlib.MutableSparseMap.createEmpty()
            ->Meta3dCommonlib.MutableSparseMap.set(geometry1.contents, [gameObject1.contents])
            ->Meta3dCommonlib.MutableSparseMap.set(geometry2.contents, [gameObject2.contents]),
          ),
        )->expect == (true, true, true)
      },
    )
  })

  test(."dispose geometry which has two gameObjects with its all gameObjects", ({
    given,
    \"and",
    \"when",
    then,
  }) => {
    let gameObject1 = ref(Obj.magic(1))
    let gameObject2 = ref(Obj.magic(2))
    let gameObject3 = ref(Obj.magic(2))
    let geometry1 = ref(Obj.magic(3))
    let geometry2 = ref(Obj.magic(4))
    let sandbox = ref(Obj.magic(1))
    let deferDisposeGeometryFuncStub = ref(Obj.magic(1))
    let disposeGeometrysFuncStub = ref(Obj.magic(1))

    _getContributeAndCreateAState((given, \"and"))

    given(
      "prepare sandbox",
      () => {
        sandbox := createSandbox()
      },
    )

    \"and"(
      "create geometry state",
      () => {
        geometryState :=
          {
            "gameObjectGeometryMap": Meta3dCommonlib.MutableSparseMap.createEmpty(),
          }
      },
    )

    \"and"(
      "create three gameObjects as gameObject1, gameObject2, gameObject3",
      () => {
        let (s, g1) = contribute.contents.createGameObjectFunc(. gameObjectState.contents)
        let (s, g2) = contribute.contents.createGameObjectFunc(. s)
        let (s, g3) = contribute.contents.createGameObjectFunc(. s)

        gameObjectState := s
        gameObject1 := g1
        gameObject2 := g2
        gameObject3 := g3
      },
    )

    \"and"(
      %re("/^create two geometrys as geometry(\d+), geometry(\d+)$/")->Obj.magic,
      () => {
        geometry1 := 100
        geometry2 := 101
      },
    )

    \"and"(
      %re("/^add geometry(\d+) to gameObject(\d+)$/")->Obj.magic,
      () => {
        geometryState.contents["gameObjectGeometryMap"]
        ->Meta3dCommonlib.MutableSparseMap.set(gameObject1.contents, geometry1.contents)
        ->ignore
      },
    )

    \"and"(
      %re("/^add geometry(\d+) to gameObject(\d+)$/")->Obj.magic,
      () => {
        geometryState.contents["gameObjectGeometryMap"]
        ->Meta3dCommonlib.MutableSparseMap.set(gameObject2.contents, geometry2.contents)
        ->ignore
      },
    )

    \"and"(
      %re("/^add geometry(\d+) to gameObject(\d+)$/")->Obj.magic,
      () => {
        geometryState.contents["gameObjectGeometryMap"]
        ->Meta3dCommonlib.MutableSparseMap.set(gameObject3.contents, geometry2.contents)
        ->ignore
      },
    )

    \"and"(
      %re("/^defer dispose gameObject(\d+)$/")->Obj.magic,
      arg0 => {
        deferDisposeGeometryFuncStub := createEmptyStubWithJsObjSandbox(sandbox)

        let (gs, _, _, geos, _, _, _, _) = DisposeTool.deferDisposeGameObject(
          ~gameObjectState=gameObjectState.contents,
          ~contribute=contribute.contents,
          ~gameObject=gameObject1.contents,
          ~geometryState=geometryState.contents,
          ~geometryFuncs=(
            (. _, _) => geometry1.contents->Meta3dCommonlib.NullableSt.return,
            deferDisposeGeometryFuncStub.contents,
          ),
          (),
        )

        gameObjectState := gs
        geometryState := geos->Obj.magic
      },
    )

    \"and"(
      %re("/^defer dispose gameObject(\d+)$/")->Obj.magic,
      arg0 => {
        let (gs, _, _, geos, _, _, _, _) = DisposeTool.deferDisposeGameObject(
          ~gameObjectState=gameObjectState.contents,
          ~contribute=contribute.contents,
          ~gameObject=gameObject2.contents,
          ~geometryState=geometryState.contents,
          ~geometryFuncs=(
            (. _, _) => geometry2.contents->Meta3dCommonlib.NullableSt.return,
            deferDisposeGeometryFuncStub.contents,
          ),
          (),
        )

        gameObjectState := gs
        geometryState := geos->Obj.magic
      },
    )

    \"and"(
      %re("/^defer dispose gameObject(\d+)$/")->Obj.magic,
      arg0 => {
        let (gs, _, _, geos, _, _, _, _) = DisposeTool.deferDisposeGameObject(
          ~gameObjectState=gameObjectState.contents,
          ~contribute=contribute.contents,
          ~gameObject=gameObject3.contents,
          ~geometryState=geometryState.contents,
          ~geometryFuncs=(
            (. _, _) => geometry2.contents->Meta3dCommonlib.NullableSt.return,
            deferDisposeGeometryFuncStub.contents,
          ),
          (),
        )

        gameObjectState := gs
        geometryState := geos->Obj.magic
      },
    )

    \"when"(
      "dispose [gameObject1, gameObject2, gameObject3]",
      () => {
        disposeGeometrysFuncStub := createEmptyStubWithJsObjSandbox(sandbox)
        let (gs, _, _, geos, _, _, _, _) = DisposeTool.disposeGameObjects(
          ~gameObjectState=gameObjectState.contents,
          ~contribute=contribute.contents,
          ~gameObjects=[gameObject1.contents, gameObject2.contents, gameObject3.contents],
          ~geometryState=geometryState.contents,
          ~geometryFuncs=(
            (. geometryState, gameObject) =>
              Meta3dCommonlib.EqualTool.isEqual(gameObject, gameObject1.contents)
                ? geometry1.contents->Js.Nullable.return
                : Meta3dCommonlib.EqualTool.isEqual(gameObject, gameObject2.contents)
                ? geometry2.contents->Js.Nullable.return
                : geometry2.contents->Js.Nullable.return,
            disposeGeometrysFuncStub.contents,
          ),
          (),
        )

        gameObjectState := gs
        geometryState := geos->Obj.magic
      },
    )

    then(
      "should dispose [[geometry1, gameObject1], [geometry2, gameObject2, gameObject3]]",
      () => {
        (
          deferDisposeGeometryFuncStub.contents
          ->Obj.magic
          ->getCall(0, _)
          ->SinonTool.calledWithArg2(matchAny, (geometry1.contents, gameObject1.contents)),
          deferDisposeGeometryFuncStub.contents
          ->Obj.magic
          ->getCall(1, _)
          ->SinonTool.calledWithArg2(matchAny, (geometry2.contents, gameObject2.contents)),
          deferDisposeGeometryFuncStub.contents
          ->Obj.magic
          ->getCall(2, _)
          ->SinonTool.calledWithArg2(matchAny, (geometry2.contents, gameObject3.contents)),
          disposeGeometrysFuncStub.contents
          ->Obj.magic
          ->SinonTool.calledWithArg2(
            matchAny,
            Meta3dCommonlib.MutableSparseMap.createEmpty()
            ->Meta3dCommonlib.MutableSparseMap.set(geometry1.contents, [gameObject1.contents])
            ->Meta3dCommonlib.MutableSparseMap.set(
              geometry2.contents,
              [gameObject2.contents, gameObject3.contents],
            ),
          ),
        )->expect == (true, true, true, true)
      },
    )
  })

  test(."dispose geometry which has two gameObjects not with its all gameObjects", ({
    given,
    \"and",
    \"when",
    then,
  }) => {
    let gameObject1 = ref(Obj.magic(1))
    let gameObject2 = ref(Obj.magic(2))
    let gameObject3 = ref(Obj.magic(2))
    let geometry1 = ref(Obj.magic(3))
    let geometry2 = ref(Obj.magic(4))
    let sandbox = ref(Obj.magic(1))
    let deferDisposeGeometryFuncStub = ref(Obj.magic(1))
    let disposeGeometrysFuncStub = ref(Obj.magic(1))

    _getContributeAndCreateAState((given, \"and"))

    given(
      "prepare sandbox",
      () => {
        sandbox := createSandbox()
      },
    )

    \"and"(
      "create geometry state",
      () => {
        geometryState :=
          {
            "gameObjectGeometryMap": Meta3dCommonlib.MutableSparseMap.createEmpty(),
          }
      },
    )

    \"and"(
      "create three gameObjects as gameObject1, gameObject2, gameObject3",
      () => {
        let (s, g1) = contribute.contents.createGameObjectFunc(. gameObjectState.contents)
        let (s, g2) = contribute.contents.createGameObjectFunc(. s)
        let (s, g3) = contribute.contents.createGameObjectFunc(. s)

        gameObjectState := s
        gameObject1 := g1
        gameObject2 := g2
        gameObject3 := g3
      },
    )

    \"and"(
      %re("/^create two geometrys as geometry(\d+), geometry(\d+)$/")->Obj.magic,
      () => {
        geometry1 := 100
        geometry2 := 101
      },
    )

    \"and"(
      %re("/^add geometry(\d+) to gameObject(\d+)$/")->Obj.magic,
      () => {
        geometryState.contents["gameObjectGeometryMap"]
        ->Meta3dCommonlib.MutableSparseMap.set(gameObject1.contents, geometry1.contents)
        ->ignore
      },
    )

    \"and"(
      %re("/^add geometry(\d+) to gameObject(\d+)$/")->Obj.magic,
      () => {
        geometryState.contents["gameObjectGeometryMap"]
        ->Meta3dCommonlib.MutableSparseMap.set(gameObject2.contents, geometry2.contents)
        ->ignore
      },
    )

    \"and"(
      %re("/^add geometry(\d+) to gameObject(\d+)$/")->Obj.magic,
      () => {
        geometryState.contents["gameObjectGeometryMap"]
        ->Meta3dCommonlib.MutableSparseMap.set(gameObject3.contents, geometry2.contents)
        ->ignore
      },
    )

    \"and"(
      %re("/^defer dispose gameObject(\d+)$/")->Obj.magic,
      arg0 => {
        deferDisposeGeometryFuncStub := createEmptyStubWithJsObjSandbox(sandbox)

        let (gs, _, _, geos, _, _, _, _) = DisposeTool.deferDisposeGameObject(
          ~gameObjectState=gameObjectState.contents,
          ~contribute=contribute.contents,
          ~gameObject=gameObject1.contents,
          ~geometryState=geometryState.contents,
          ~geometryFuncs=(
            (. _, _) => geometry1.contents->Meta3dCommonlib.NullableSt.return,
            deferDisposeGeometryFuncStub.contents,
          ),
          (),
        )

        gameObjectState := gs
        geometryState := geos->Obj.magic
      },
    )

    \"and"(
      %re("/^defer dispose gameObject(\d+)$/")->Obj.magic,
      arg0 => {
        let (gs, _, _, geos, _, _, _, _) = DisposeTool.deferDisposeGameObject(
          ~gameObjectState=gameObjectState.contents,
          ~contribute=contribute.contents,
          ~gameObject=gameObject2.contents,
          ~geometryState=geometryState.contents,
          ~geometryFuncs=(
            (. _, _) => geometry2.contents->Meta3dCommonlib.NullableSt.return,
            deferDisposeGeometryFuncStub.contents,
          ),
          (),
        )

        gameObjectState := gs
        geometryState := geos->Obj.magic
      },
    )

    \"when"(
      "dispose [gameObject1, gameObject2]",
      () => {
        disposeGeometrysFuncStub := createEmptyStubWithJsObjSandbox(sandbox)
        let (gs, _, _, geos, _, _, _, _) = DisposeTool.disposeGameObjects(
          ~gameObjectState=gameObjectState.contents,
          ~contribute=contribute.contents,
          ~gameObjects=[gameObject1.contents, gameObject2.contents],
          ~geometryState=geometryState.contents,
          ~geometryFuncs=(
            (. geometryState, gameObject) =>
              Meta3dCommonlib.EqualTool.isEqual(gameObject, gameObject1.contents)
                ? geometry1.contents->Js.Nullable.return
                : geometry2.contents->Js.Nullable.return,
            disposeGeometrysFuncStub.contents,
          ),
          (),
        )

        gameObjectState := gs
        geometryState := geos->Obj.magic
      },
    )

    then(
      "should dispose [[geometry1, gameObject1], [geometry2, gameObject2]]",
      () => {
        (
          deferDisposeGeometryFuncStub.contents
          ->Obj.magic
          ->getCall(0, _)
          ->SinonTool.calledWithArg2(matchAny, (geometry1.contents, gameObject1.contents)),
          deferDisposeGeometryFuncStub.contents
          ->Obj.magic
          ->getCall(1, _)
          ->SinonTool.calledWithArg2(matchAny, (geometry2.contents, gameObject2.contents)),
          deferDisposeGeometryFuncStub.contents->Obj.magic->getCallCount,
          disposeGeometrysFuncStub.contents
          ->Obj.magic
          ->SinonTool.calledWithArg2(
            matchAny,
            Meta3dCommonlib.MutableSparseMap.createEmpty()
            ->Meta3dCommonlib.MutableSparseMap.set(geometry1.contents, [gameObject1.contents])
            ->Meta3dCommonlib.MutableSparseMap.set(geometry2.contents, [gameObject2.contents]),
          ),
        )->expect == (true, true, 2, true)
      },
    )
  })

  test(."dispose directionLight", ({given, \"and", \"when", then}) => {
    let gameObject1 = ref(Obj.magic(1))
    let gameObject2 = ref(Obj.magic(2))
    let directionLight1 = ref(Obj.magic(3))
    let directionLight2 = ref(Obj.magic(4))
    let sandbox = ref(Obj.magic(1))
    let deferDisposeDirectionLightFuncStub = ref(Obj.magic(1))
    let disposeDirectionLightsFuncStub = ref(Obj.magic(1))

    _getContributeAndCreateAState((given, \"and"))

    given(
      "prepare sandbox",
      () => {
        sandbox := createSandbox()
      },
    )

    \"and"(
      "create directionLight state",
      () => {
        directionLightState := Obj.magic(100)
      },
    )

    \"and"(
      %re("/^create two gameObjects as gameObject(\d+), gameObject(\d+)$/")->Obj.magic,
      () => {
        let (s, g1) = contribute.contents.createGameObjectFunc(. gameObjectState.contents)
        let (s, g2) = contribute.contents.createGameObjectFunc(. s)

        gameObjectState := s
        gameObject1 := g1
        gameObject2 := g2
      },
    )

    \"and"(
      %re("/^create two directionLights as directionLight(\d+), directionLight(\d+)$/")->Obj.magic,
      () => {
        directionLight1 := 100
        directionLight2 := 101
      },
    )

    \"and"(
      %re("/^add directionLight(\d+) to gameObject(\d+)$/")->Obj.magic,
      () => {
        ()
      },
    )

    \"and"(
      %re("/^add directionLight(\d+) to gameObject(\d+)$/")->Obj.magic,
      () => {
        ()
      },
    )

    \"and"(
      %re("/^defer dispose gameObject(\d+)$/")->Obj.magic,
      arg0 => {
        deferDisposeDirectionLightFuncStub := createEmptyStubWithJsObjSandbox(sandbox)

        let (gs, ts, _, _, _, _, _, _) = DisposeTool.deferDisposeGameObject(
          ~gameObjectState=gameObjectState.contents,
          ~contribute=contribute.contents,
          ~gameObject=gameObject1.contents,
          ~directionLightState=directionLightState.contents,
          ~directionLightFuncs=(
            (. _, _) => directionLight1.contents->Meta3dCommonlib.NullableSt.return,
            deferDisposeDirectionLightFuncStub.contents,
          ),
          (),
        )

        gameObjectState := gs
        directionLightState := ts->Obj.magic
      },
    )

    \"and"(
      %re("/^defer dispose gameObject(\d+)$/")->Obj.magic,
      arg0 => {
        let (gs, ts, _, _, _, _, _, _) = DisposeTool.deferDisposeGameObject(
          ~gameObjectState=gameObjectState.contents,
          ~contribute=contribute.contents,
          ~gameObject=gameObject2.contents,
          ~directionLightState=directionLightState.contents,
          ~directionLightFuncs=(
            (. _, _) => directionLight2.contents->Meta3dCommonlib.NullableSt.return,
            deferDisposeDirectionLightFuncStub.contents,
          ),
          (),
        )

        gameObjectState := gs
        directionLightState := ts->Obj.magic
      },
    )

    \"when"(
      "dispose [gameObject1, gameObject2]",
      () => {
        disposeDirectionLightsFuncStub := createEmptyStubWithJsObjSandbox(sandbox)
        let (gs, ts, _, _, _, _, _, _) = DisposeTool.disposeGameObjects(
          ~gameObjectState=gameObjectState.contents,
          ~contribute=contribute.contents,
          ~gameObjects=[gameObject1.contents, gameObject2.contents],
          ~directionLightState=directionLightState.contents,
          ~directionLightFuncs=(
            (. directionLightState, gameObject) =>
              Meta3dCommonlib.EqualTool.isEqual(gameObject, gameObject1.contents)
                ? directionLight1.contents->Js.Nullable.return
                : directionLight2.contents->Js.Nullable.return,
            disposeDirectionLightsFuncStub.contents,
          ),
          (),
        )

        gameObjectState := gs
        directionLightState := ts->Obj.magic
      },
    )

    then(
      "should dispose [directionLight1, directionLight2]",
      () => {
        (
          deferDisposeDirectionLightFuncStub.contents
          ->Obj.magic
          ->getCall(0, _)
          ->SinonTool.calledWithArg2(matchAny, (directionLight1.contents, matchAny)),
          deferDisposeDirectionLightFuncStub.contents
          ->Obj.magic
          ->getCall(1, _)
          ->SinonTool.calledWithArg2(matchAny, (directionLight2.contents, matchAny)),
          disposeDirectionLightsFuncStub.contents
          ->Obj.magic
          ->SinonTool.calledWithArg2(
            matchAny,
            [directionLight1.contents, directionLight2.contents],
          ),
        )->expect == (true, true, true)
      },
    )
  })

  test(."dispose arcballCameraController", ({given, \"and", \"when", then}) => {
    let gameObject1 = ref(Obj.magic(1))
    let gameObject2 = ref(Obj.magic(2))
    let arcballCameraController1 = ref(Obj.magic(3))
    let arcballCameraController2 = ref(Obj.magic(4))
    let sandbox = ref(Obj.magic(1))
    let deferDisposeArcballCameraControllerFuncStub = ref(Obj.magic(1))
    let disposeArcballCameraControllersFuncStub = ref(Obj.magic(1))

    _getContributeAndCreateAState((given, \"and"))

    given(
      "prepare sandbox",
      () => {
        sandbox := createSandbox()
      },
    )

    \"and"(
      "create arcballCameraController state",
      () => {
        arcballCameraControllerState := Obj.magic(100)
      },
    )

    \"and"(
      %re("/^create two gameObjects as gameObject(\d+), gameObject(\d+)$/")->Obj.magic,
      () => {
        let (s, g1) = contribute.contents.createGameObjectFunc(. gameObjectState.contents)
        let (s, g2) = contribute.contents.createGameObjectFunc(. s)

        gameObjectState := s
        gameObject1 := g1
        gameObject2 := g2
      },
    )

    \"and"(
      %re(
        "/^create two arcballCameraControllers as arcballCameraController(\d+), arcballCameraController(\d+)$/"
      )->Obj.magic,
      () => {
        arcballCameraController1 := 100
        arcballCameraController2 := 101
      },
    )

    \"and"(
      %re("/^add arcballCameraController(\d+) to gameObject(\d+)$/")->Obj.magic,
      () => {
        ()
      },
    )

    \"and"(
      %re("/^add arcballCameraController(\d+) to gameObject(\d+)$/")->Obj.magic,
      () => {
        ()
      },
    )

    \"and"(
      %re("/^defer dispose gameObject(\d+)$/")->Obj.magic,
      arg0 => {
        deferDisposeArcballCameraControllerFuncStub := createEmptyStubWithJsObjSandbox(sandbox)

        let (gs, ts, _, _, _, _, _, _) = DisposeTool.deferDisposeGameObject(
          ~gameObjectState=gameObjectState.contents,
          ~contribute=contribute.contents,
          ~gameObject=gameObject1.contents,
          ~arcballCameraControllerState=arcballCameraControllerState.contents,
          ~arcballCameraControllerFuncs=(
            (. _, _) => arcballCameraController1.contents->Meta3dCommonlib.NullableSt.return,
            deferDisposeArcballCameraControllerFuncStub.contents,
          ),
          (),
        )

        gameObjectState := gs
        arcballCameraControllerState := ts->Obj.magic
      },
    )

    \"and"(
      %re("/^defer dispose gameObject(\d+)$/")->Obj.magic,
      arg0 => {
        let (gs, ts, _, _, _, _, _, _) = DisposeTool.deferDisposeGameObject(
          ~gameObjectState=gameObjectState.contents,
          ~contribute=contribute.contents,
          ~gameObject=gameObject2.contents,
          ~arcballCameraControllerState=arcballCameraControllerState.contents,
          ~arcballCameraControllerFuncs=(
            (. _, _) => arcballCameraController2.contents->Meta3dCommonlib.NullableSt.return,
            deferDisposeArcballCameraControllerFuncStub.contents,
          ),
          (),
        )

        gameObjectState := gs
        arcballCameraControllerState := ts->Obj.magic
      },
    )

    \"when"(
      "dispose [gameObject1, gameObject2]",
      () => {
        disposeArcballCameraControllersFuncStub := createEmptyStubWithJsObjSandbox(sandbox)
        let (gs, ts, _, _, _, _, _, _) = DisposeTool.disposeGameObjects(
          ~gameObjectState=gameObjectState.contents,
          ~contribute=contribute.contents,
          ~gameObjects=[gameObject1.contents, gameObject2.contents],
          ~arcballCameraControllerState=arcballCameraControllerState.contents,
          ~arcballCameraControllerFuncs=(
            (. arcballCameraControllerState, gameObject) =>
              Meta3dCommonlib.EqualTool.isEqual(gameObject, gameObject1.contents)
                ? arcballCameraController1.contents->Js.Nullable.return
                : arcballCameraController2.contents->Js.Nullable.return,
            disposeArcballCameraControllersFuncStub.contents,
          ),
          (),
        )

        gameObjectState := gs
        arcballCameraControllerState := ts->Obj.magic
      },
    )

    then(
      "should dispose [arcballCameraController1, arcballCameraController2]",
      () => {
        (
          deferDisposeArcballCameraControllerFuncStub.contents
          ->Obj.magic
          ->getCall(0, _)
          ->SinonTool.calledWithArg2(matchAny, (arcballCameraController1.contents, matchAny)),
          deferDisposeArcballCameraControllerFuncStub.contents
          ->Obj.magic
          ->getCall(1, _)
          ->SinonTool.calledWithArg2(matchAny, (arcballCameraController2.contents, matchAny)),
          disposeArcballCameraControllersFuncStub.contents
          ->Obj.magic
          ->SinonTool.calledWithArg2(
            matchAny,
            [arcballCameraController1.contents, arcballCameraController2.contents],
          ),
        )->expect == (true, true, true)
      },
    )
  })

  test(."dispose basicCameraView", ({given, \"and", \"when", then}) => {
    let gameObject1 = ref(Obj.magic(1))
    let gameObject2 = ref(Obj.magic(2))
    let basicCameraView1 = ref(Obj.magic(3))
    let basicCameraView2 = ref(Obj.magic(4))
    let sandbox = ref(Obj.magic(1))
    let deferDisposeBasicCameraViewFuncStub = ref(Obj.magic(1))
    let disposeBasicCameraViewsFuncStub = ref(Obj.magic(1))

    _getContributeAndCreateAState((given, \"and"))

    given(
      "prepare sandbox",
      () => {
        sandbox := createSandbox()
      },
    )

    \"and"(
      "create basicCameraView state",
      () => {
        basicCameraViewState := Obj.magic(100)
      },
    )

    \"and"(
      %re("/^create two gameObjects as gameObject(\d+), gameObject(\d+)$/")->Obj.magic,
      () => {
        let (s, g1) = contribute.contents.createGameObjectFunc(. gameObjectState.contents)
        let (s, g2) = contribute.contents.createGameObjectFunc(. s)

        gameObjectState := s
        gameObject1 := g1
        gameObject2 := g2
      },
    )

    \"and"(
      %re(
        "/^create two basicCameraViews as basicCameraView(\d+), basicCameraView(\d+)$/"
      )->Obj.magic,
      () => {
        basicCameraView1 := 100
        basicCameraView2 := 101
      },
    )

    \"and"(
      %re("/^add basicCameraView(\d+) to gameObject(\d+)$/")->Obj.magic,
      () => {
        ()
      },
    )

    \"and"(
      %re("/^add basicCameraView(\d+) to gameObject(\d+)$/")->Obj.magic,
      () => {
        ()
      },
    )

    \"and"(
      %re("/^defer dispose gameObject(\d+)$/")->Obj.magic,
      arg0 => {
        deferDisposeBasicCameraViewFuncStub := createEmptyStubWithJsObjSandbox(sandbox)

        let (gs, ts, _, _, _, _, _, _) = DisposeTool.deferDisposeGameObject(
          ~gameObjectState=gameObjectState.contents,
          ~contribute=contribute.contents,
          ~gameObject=gameObject1.contents,
          ~basicCameraViewState=basicCameraViewState.contents,
          ~basicCameraViewFuncs=(
            (. _, _) => basicCameraView1.contents->Meta3dCommonlib.NullableSt.return,
            deferDisposeBasicCameraViewFuncStub.contents,
          ),
          (),
        )

        gameObjectState := gs
        basicCameraViewState := ts->Obj.magic
      },
    )

    \"and"(
      %re("/^defer dispose gameObject(\d+)$/")->Obj.magic,
      arg0 => {
        let (gs, ts, _, _, _, _, _, _) = DisposeTool.deferDisposeGameObject(
          ~gameObjectState=gameObjectState.contents,
          ~contribute=contribute.contents,
          ~gameObject=gameObject2.contents,
          ~basicCameraViewState=basicCameraViewState.contents,
          ~basicCameraViewFuncs=(
            (. _, _) => basicCameraView2.contents->Meta3dCommonlib.NullableSt.return,
            deferDisposeBasicCameraViewFuncStub.contents,
          ),
          (),
        )

        gameObjectState := gs
        basicCameraViewState := ts->Obj.magic
      },
    )

    \"when"(
      "dispose [gameObject1, gameObject2]",
      () => {
        disposeBasicCameraViewsFuncStub := createEmptyStubWithJsObjSandbox(sandbox)
        let (gs, ts, _, _, _, _, _, _) = DisposeTool.disposeGameObjects(
          ~gameObjectState=gameObjectState.contents,
          ~contribute=contribute.contents,
          ~gameObjects=[gameObject1.contents, gameObject2.contents],
          ~basicCameraViewState=basicCameraViewState.contents,
          ~basicCameraViewFuncs=(
            (. basicCameraViewState, gameObject) =>
              Meta3dCommonlib.EqualTool.isEqual(gameObject, gameObject1.contents)
                ? basicCameraView1.contents->Js.Nullable.return
                : basicCameraView2.contents->Js.Nullable.return,
            disposeBasicCameraViewsFuncStub.contents,
          ),
          (),
        )

        gameObjectState := gs
        basicCameraViewState := ts->Obj.magic
      },
    )

    then(
      "should dispose [basicCameraView1, basicCameraView2]",
      () => {
        (
          deferDisposeBasicCameraViewFuncStub.contents
          ->Obj.magic
          ->getCall(0, _)
          ->SinonTool.calledWithArg2(matchAny, (basicCameraView1.contents, matchAny)),
          deferDisposeBasicCameraViewFuncStub.contents
          ->Obj.magic
          ->getCall(1, _)
          ->SinonTool.calledWithArg2(matchAny, (basicCameraView2.contents, matchAny)),
          disposeBasicCameraViewsFuncStub.contents
          ->Obj.magic
          ->SinonTool.calledWithArg2(
            matchAny,
            [basicCameraView1.contents, basicCameraView2.contents],
          ),
        )->expect == (true, true, true)
      },
    )
  })

  test(."dispose perspectiveCameraProjection", ({given, \"and", \"when", then}) => {
    let gameObject1 = ref(Obj.magic(1))
    let gameObject2 = ref(Obj.magic(2))
    let perspectiveCameraProjection1 = ref(Obj.magic(3))
    let perspectiveCameraProjection2 = ref(Obj.magic(4))
    let sandbox = ref(Obj.magic(1))
    let deferDisposePerspectiveCameraProjectionFuncStub = ref(Obj.magic(1))
    let disposePerspectiveCameraProjectionsFuncStub = ref(Obj.magic(1))

    _getContributeAndCreateAState((given, \"and"))

    given(
      "prepare sandbox",
      () => {
        sandbox := createSandbox()
      },
    )

    \"and"(
      "create perspectiveCameraProjection state",
      () => {
        perspectiveCameraProjectionState := Obj.magic(100)
      },
    )

    \"and"(
      %re("/^create two gameObjects as gameObject(\d+), gameObject(\d+)$/")->Obj.magic,
      () => {
        let (s, g1) = contribute.contents.createGameObjectFunc(. gameObjectState.contents)
        let (s, g2) = contribute.contents.createGameObjectFunc(. s)

        gameObjectState := s
        gameObject1 := g1
        gameObject2 := g2
      },
    )

    \"and"(
      %re(
        "/^create two perspectiveCameraProjections as perspectiveCameraProjection(\d+), perspectiveCameraProjection(\d+)$/"
      )->Obj.magic,
      () => {
        perspectiveCameraProjection1 := 100
        perspectiveCameraProjection2 := 101
      },
    )

    \"and"(
      %re("/^add perspectiveCameraProjection(\d+) to gameObject(\d+)$/")->Obj.magic,
      () => {
        ()
      },
    )

    \"and"(
      %re("/^add perspectiveCameraProjection(\d+) to gameObject(\d+)$/")->Obj.magic,
      () => {
        ()
      },
    )

    \"and"(
      %re("/^defer dispose gameObject(\d+)$/")->Obj.magic,
      arg0 => {
        deferDisposePerspectiveCameraProjectionFuncStub := createEmptyStubWithJsObjSandbox(sandbox)

        let (gs, ts, _, _, _, _, _, _) = DisposeTool.deferDisposeGameObject(
          ~gameObjectState=gameObjectState.contents,
          ~contribute=contribute.contents,
          ~gameObject=gameObject1.contents,
          ~perspectiveCameraProjectionState=perspectiveCameraProjectionState.contents,
          ~perspectiveCameraProjectionFuncs=(
            (. _, _) => perspectiveCameraProjection1.contents->Meta3dCommonlib.NullableSt.return,
            deferDisposePerspectiveCameraProjectionFuncStub.contents,
          ),
          (),
        )

        gameObjectState := gs
        perspectiveCameraProjectionState := ts->Obj.magic
      },
    )

    \"and"(
      %re("/^defer dispose gameObject(\d+)$/")->Obj.magic,
      arg0 => {
        let (gs, ts, _, _, _, _, _, _) = DisposeTool.deferDisposeGameObject(
          ~gameObjectState=gameObjectState.contents,
          ~contribute=contribute.contents,
          ~gameObject=gameObject2.contents,
          ~perspectiveCameraProjectionState=perspectiveCameraProjectionState.contents,
          ~perspectiveCameraProjectionFuncs=(
            (. _, _) => perspectiveCameraProjection2.contents->Meta3dCommonlib.NullableSt.return,
            deferDisposePerspectiveCameraProjectionFuncStub.contents,
          ),
          (),
        )

        gameObjectState := gs
        perspectiveCameraProjectionState := ts->Obj.magic
      },
    )

    \"when"(
      "dispose [gameObject1, gameObject2]",
      () => {
        disposePerspectiveCameraProjectionsFuncStub := createEmptyStubWithJsObjSandbox(sandbox)
        let (gs, ts, _, _, _, _, _, _) = DisposeTool.disposeGameObjects(
          ~gameObjectState=gameObjectState.contents,
          ~contribute=contribute.contents,
          ~gameObjects=[gameObject1.contents, gameObject2.contents],
          ~perspectiveCameraProjectionState=perspectiveCameraProjectionState.contents,
          ~perspectiveCameraProjectionFuncs=(
            (. perspectiveCameraProjectionState, gameObject) =>
              Meta3dCommonlib.EqualTool.isEqual(gameObject, gameObject1.contents)
                ? perspectiveCameraProjection1.contents->Js.Nullable.return
                : perspectiveCameraProjection2.contents->Js.Nullable.return,
            disposePerspectiveCameraProjectionsFuncStub.contents,
          ),
          (),
        )

        gameObjectState := gs
        perspectiveCameraProjectionState := ts->Obj.magic
      },
    )

    then(
      "should dispose [perspectiveCameraProjection1, perspectiveCameraProjection2]",
      () => {
        (
          deferDisposePerspectiveCameraProjectionFuncStub.contents
          ->Obj.magic
          ->getCall(0, _)
          ->SinonTool.calledWithArg2(matchAny, (perspectiveCameraProjection1.contents, matchAny)),
          deferDisposePerspectiveCameraProjectionFuncStub.contents
          ->Obj.magic
          ->getCall(1, _)
          ->SinonTool.calledWithArg2(matchAny, (perspectiveCameraProjection2.contents, matchAny)),
          disposePerspectiveCameraProjectionsFuncStub.contents
          ->Obj.magic
          ->SinonTool.calledWithArg2(
            matchAny,
            [perspectiveCameraProjection1.contents, perspectiveCameraProjection2.contents],
          ),
        )->expect == (true, true, true)
      },
    )
  })

  test(."should remove disposed gameObjects from needDisposedGameObjects", ({
    given,
    \"and",
    \"when",
    then,
  }) => {
    let gameObject1 = ref(Obj.magic(1))
    let gameObject2 = ref(Obj.magic(2))
    let sandbox = ref(Obj.magic(1))

    _getContributeAndCreateAState((given, \"and"))

    given(
      "prepare sandbox",
      () => {
        sandbox := createSandbox()
      },
    )

    // \"and"("create transform state", () => {
    //   transformState := Obj.magic(100)
    // })

    \"and"(
      %re("/^create two gameObjects as gameObject(\d+), gameObject(\d+)$/")->Obj.magic,
      () => {
        let (s, g1) = contribute.contents.createGameObjectFunc(. gameObjectState.contents)
        let (s, g2) = contribute.contents.createGameObjectFunc(. s)

        gameObjectState := s
        gameObject1 := g1
        gameObject2 := g2
      },
    )

    \"and"(
      %re("/^defer dispose gameObject(\d+)$/")->Obj.magic,
      arg0 => {
        let (gs, ts, _, _, _, _, _, _) = DisposeTool.deferDisposeGameObject(
          ~gameObjectState=gameObjectState.contents,
          ~contribute=contribute.contents,
          ~gameObject=gameObject1.contents,
          // ~transformState=transformState.contents,
          ~transformFuncs=(
            createEmptyStubWithJsObjSandbox(sandbox),
            createEmptyStubWithJsObjSandbox(sandbox),
          ),
          (),
        )

        gameObjectState := gs
        // transformState := ts->Obj.magic
      },
    )

    \"and"(
      %re("/^defer dispose gameObject(\d+)$/")->Obj.magic,
      arg0 => {
        let (gs, ts, _, _, _, _, _, _) = DisposeTool.deferDisposeGameObject(
          ~gameObjectState=gameObjectState.contents,
          ~contribute=contribute.contents,
          ~gameObject=gameObject2.contents,
          // ~transformState=transformState.contents,
          ~transformFuncs=(
            createEmptyStubWithJsObjSandbox(sandbox),
            createEmptyStubWithJsObjSandbox(sandbox),
          ),
          (),
        )

        gameObjectState := gs
        // transformState := ts->Obj.magic
      },
    )

    \"when"(
      "dispose gameObject1",
      () => {
        let (gs, ts, _, _, _, _, _, _) = DisposeTool.disposeGameObjects(
          ~gameObjectState=gameObjectState.contents,
          ~contribute=contribute.contents,
          ~gameObjects=[gameObject1.contents],
          // ~transformState=transformState.contents,
          ~transformFuncs=(
            createEmptyStubWithJsObjSandbox(sandbox),
            createEmptyStubWithJsObjSandbox(sandbox),
          ),
          (),
        )

        gameObjectState := gs
        // transformState := ts->Obj.magic
      },
    )

    then(
      "get need disposed gameObjects should return [gameObject2]",
      () => {
        contribute.contents.getNeedDisposedGameObjectsFunc(. gameObjectState.contents)->expect == [
            gameObject2.contents,
          ]
      },
    )
  })

  test(."get all gameObjects should exclude defer disposed and disposed gameObjects", ({
    given,
    \"and",
    \"when",
    then,
  }) => {
    let gameObject1 = ref(Obj.magic(1))
    let gameObject2 = ref(Obj.magic(2))
    let sandbox = ref(Obj.magic(1))

    _getContributeAndCreateAState((given, \"and"))

    given(
      "prepare sandbox",
      () => {
        sandbox := createSandbox()
      },
    )

    \"and"(
      %re("/^create two gameObjects as gameObject(\d+), gameObject(\d+)$/")->Obj.magic,
      () => {
        let (s, g1) = contribute.contents.createGameObjectFunc(. gameObjectState.contents)
        let (s, g2) = contribute.contents.createGameObjectFunc(. s)

        gameObjectState := s
        gameObject1 := g1
        gameObject2 := g2
      },
    )

    \"and"(
      %re("/^defer dispose gameObject(\d+)$/")->Obj.magic,
      arg0 => {
        let (gs, ts, _, _, _, _, _, _) = DisposeTool.deferDisposeGameObject(
          ~gameObjectState=gameObjectState.contents,
          ~contribute=contribute.contents,
          ~gameObject=gameObject1.contents,
          ~transformFuncs=(
            createEmptyStubWithJsObjSandbox(sandbox),
            createEmptyStubWithJsObjSandbox(sandbox),
          ),
          (),
        )

        gameObjectState := gs
      },
    )

    \"and"(
      %re("/^defer dispose gameObject(\d+)$/")->Obj.magic,
      arg0 => {
        let (gs, ts, _, _, _, _, _, _) = DisposeTool.deferDisposeGameObject(
          ~gameObjectState=gameObjectState.contents,
          ~contribute=contribute.contents,
          ~gameObject=gameObject2.contents,
          ~transformFuncs=(
            createEmptyStubWithJsObjSandbox(sandbox),
            createEmptyStubWithJsObjSandbox(sandbox),
          ),
          (),
        )

        gameObjectState := gs
      },
    )

    \"when"(
      "dispose gameObject1",
      () => {
        let (gs, ts, _, _, _, _, _, _) = DisposeTool.disposeGameObjects(
          ~gameObjectState=gameObjectState.contents,
          ~contribute=contribute.contents,
          ~gameObjects=[gameObject1.contents],
          ~transformFuncs=(
            createEmptyStubWithJsObjSandbox(sandbox),
            createEmptyStubWithJsObjSandbox(sandbox),
          ),
          (),
        )

        gameObjectState := gs
      },
    )

    then(
      "get all gameObjects should return []",
      () => {
        contribute.contents.getAllGameObjectsFunc(. gameObjectState.contents)->expect == []
      },
    )
  })
})
