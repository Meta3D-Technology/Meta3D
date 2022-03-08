open Meta3dBsJestCucumber
open Cucumber
open Expect
open Operators

open Sinon

let feature = loadFeature("./test/features/batch_dispose_after_defer_dispose.feature")

defineFeature(feature, test => {
  let contribute = ref(Obj.magic(1))
  let state = ref(Obj.magic(1))
  let transformState = ref(Obj.magic(1))

  let _createState = (~isDebug=false, ()) => {
    StateTool.createState(~contribute=contribute.contents, ~isDebug, ())
  }

  let _getContributeAndCreateAState = ((given, \"and")) => {
    given("I get contribute", () => {
      contribute := Main.getGameObjectContribute()
    })

    \"and"("create a state", () => {
      state := StateTool.createState(~contribute=contribute.contents, ())
    })
  }

  test(."dispose transform", ({given, \"and", \"when", then}) => {
    let gameObject1 = ref(Obj.magic(1))
    let gameObject2 = ref(Obj.magic(2))
    let transform1 = ref(Obj.magic(3))
    let transform2 = ref(Obj.magic(4))
    let sandbox = ref(Obj.magic(1))
    let batchDisposeTransformsFuncStub = ref(Obj.magic(1))

    _getContributeAndCreateAState((given, \"and"))

    given("prepare sandbox", () => {
      sandbox := createSandbox()
    })

    \"and"("create transform state", () => {
      transformState :=
        {
          "gameObjectTransformMap": Meta3dCommonlib.MutableSparseMap.createEmpty(),
        }
    })

    \"and"(%re("/^create two gameObjects as gameObject(\d+), gameObject(\d+)$/")->Obj.magic, () => {
      let (s, g1) = contribute.contents.createGameObjectFunc(. state.contents)
      let (s, g2) = contribute.contents.createGameObjectFunc(. s)

      state := s
      gameObject1 := g1
      gameObject2 := g2
    })

    \"and"(%re("/^create two transforms as transform(\d+), transform(\d+)$/")->Obj.magic, () => {
      transform1 := 100
      transform2 := 101
    })

    \"and"(%re("/^add transform(\d+) to gameObject(\d+)$/")->Obj.magic, () => {
      transformState.contents["gameObjectTransformMap"]
      ->Meta3dCommonlib.MutableSparseMap.set(gameObject1.contents, transform1.contents)
      ->ignore
    })

    \"and"(%re("/^add transform(\d+) to gameObject(\d+)$/")->Obj.magic, () => {
      transformState.contents["gameObjectTransformMap"]
      ->Meta3dCommonlib.MutableSparseMap.set(gameObject2.contents, transform2.contents)
      ->ignore
    })

    \"and"(%re("/^defer dispose gameObject(\d+)$/")->Obj.magic, arg0 => {
      state :=
        contribute.contents.deferDisposeGameObjectFunc(. state.contents, gameObject1.contents)
    })

    \"when"(%re("/^dispose gameObject(\d+)$/")->Obj.magic, arg0 => {
      batchDisposeTransformsFuncStub := createEmptyStubWithJsObjSandbox(sandbox)
      let (gs, ts) = contribute.contents.batchDisposeGameObjectsFunc(.
        (state.contents, transformState.contents->Obj.magic),
        batchDisposeTransformsFuncStub.contents,
        [gameObject1.contents],
      )

      state := gs
      transformState := ts->Obj.magic
    })

    then(%re("/^should dispose transform(\d+)$/")->Obj.magic, arg0 => {
      batchDisposeTransformsFuncStub.contents
      ->Obj.magic
      ->SinonTool.calledWithArg2(matchAny, [transform1.contents])
      ->expect == true
    })
  })
})
