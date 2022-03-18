open Meta3dBsJestCucumber
open Cucumber
open Expect
open Operators

let feature = loadFeature("./test/features/batch_dispose_after_defer_dispose.feature")

defineFeature(feature, test => {
  let contribute: ref<
    Meta3dEngineCoreProtocol.ComponentContributeType.componentContribute<
      StateType.state,
      Meta3dComponentBasiccameraviewProtocol.Index.config,
      Meta3dComponentBasiccameraviewProtocol.Index.dataNameType,
      Meta3dComponentBasiccameraviewProtocol.Index.needDisposedComponents,
      Meta3dComponentBasiccameraviewProtocol.Index.batchDisposeData,
      Meta3dComponentBasiccameraviewProtocol.Index.cloneConfig,
      Meta3dComponentBasiccameraviewProtocol.Index.basicCameraView,
    >,
  > = ref(Obj.magic(1))
  let state = ref(Obj.magic(1))
  let basicCameraView1 = ref(Obj.magic(1))
  let basicCameraView2 = ref(Obj.magic(2))

  let _getContributeAndCreateAState = ((given, \"and")) => {
    given("I get contribute", () => {
      contribute := Main.getComponentContribute()
    })

    \"and"("create a state", () => {
      state := StateTool.createState(~contribute=contribute.contents, ())
    })
  }

  test(."remove from isActiveMap", ({given, \"and", \"when", then}) => {
    let basicCameraView3 = ref(Obj.magic(3))

    _getContributeAndCreateAState((given, \"and"))

    \"and"(
      %re(
        "/^create three basicCameraViews as basicCameraView(\d+), basicCameraView(\d+), basicCameraView(\d+)$/"
      )->Obj.magic,
      () => {
        let (s, t1) = contribute.contents.createComponentFunc(. state.contents)
        let (s, t2) = contribute.contents.createComponentFunc(. s)
        let (s, t3) = contribute.contents.createComponentFunc(. s)

        state := s
        basicCameraView1 := t1
        basicCameraView2 := t2
        basicCameraView3 := t3
      },
    )

    \"and"(
      "set basicCameraView1's isActive",
      () => {
      state :=
        contribute.contents.setComponentDataFunc(.
          state.contents,
          basicCameraView1.contents,
          Meta3dComponentBasiccameraviewProtocol.Index.dataName.isActive,
          true-> Obj.magic
        )
      },
    )

    \"and"(%re("/^defer dispose basicCameraView(\d+)$/")->Obj.magic, () => {
      state :=
        contribute.contents.deferDisposeComponentFunc(.
          state.contents,
          basicCameraView1.contents->Meta3dCommonlib.DeferDisposeTool.buildDeferDisposeData,
        )
    })

    \"when"("dispose the need disposed basicCameraViews", () => {
      state :=
        contribute.contents.disposeComponentsFunc(. state.contents, [basicCameraView1.contents])
    })

    then("should remove basicCameraView1 from isActiveMap", () => {
      let {isActiveMap} = state.contents

      isActiveMap->Meta3dCommonlib.MutableSparseMap.has(basicCameraView1.contents)->expect == false
    })
  })

  test(."remove from gameObjectMap, gameObjectBasicCameraViewMap", ({
    given,
    \"and",
    \"when",
    then,
  }) => {
    let gameObject1 = 10
    let basicCameraView1 = ref(Obj.magic(1))
    let d1 = [0.5, 1.0, 1.0]

    _getContributeAndCreateAState((given, \"and"))

    given("create a gameObject", () => {
      ()
    })

    \"and"("create a basicCameraView", () => {
      let (s, m) = contribute.contents.createComponentFunc(. state.contents)

      state := s
      basicCameraView1 := m
    })

    \"and"("add the basicCameraView to the gameObject", () => {
      state :=
        contribute.contents.addComponentFunc(.
          state.contents,
          gameObject1,
          basicCameraView1.contents,
        )
    })

    \"and"("defer dispose the basicCameraView from the gameObject", () => {
      state :=
        contribute.contents.deferDisposeComponentFunc(.
          state.contents,
          (basicCameraView1.contents, gameObject1),
        )
    })

    \"when"("dispose the need disposed basicCameraViews", () => {
      state :=
        contribute.contents.disposeComponentsFunc(.
          state.contents,
          contribute.contents.getNeedDisposedComponentsFunc(. state.contents),
        )
    })

    then("get the basicCameraView's gameObjects should return []", () => {
      contribute.contents.getGameObjectsFunc(.
        state.contents,
        basicCameraView1.contents,
      )->expect == []
    })

    \"and"("get the gameObject's basicCameraView should return empty", () => {
      contribute.contents.getComponentFunc(. state.contents, gameObject1)->expect ==
        Js.Nullable.undefined
    })
  })

  test(."if has disposed one, use disposed index as new index", ({
    given,
    \"and",
    \"when",
    then,
  }) => {
    let basicCameraView3 = ref(Obj.magic(1))
    let basicCameraView4 = ref(Obj.magic(2))

    _getContributeAndCreateAState((given, \"and"))

    given(
      %re(
        "/^create two basicCameraViews as basicCameraView(\d+), basicCameraView(\d+)$/"
      )->Obj.magic,
      () => {
        let (s, t1) = contribute.contents.createComponentFunc(. state.contents)
        let (s, t2) = contribute.contents.createComponentFunc(. s)

        state := s
        basicCameraView1 := t1
        basicCameraView2 := t2
      },
    )

    \"and"(%re("/^defer dispose basicCameraView(\d+), basicCameraView(\d+)$/")->Obj.magic, () => {
      state :=
        contribute.contents.deferDisposeComponentFunc(.
          state.contents,
          basicCameraView1.contents->Meta3dCommonlib.DeferDisposeTool.buildDeferDisposeData,
        )
      state :=
        contribute.contents.deferDisposeComponentFunc(.
          state.contents,
          basicCameraView2.contents->Meta3dCommonlib.DeferDisposeTool.buildDeferDisposeData,
        )
    })

    \"and"(%re("/^dispose basicCameraView(\d+), basicCameraView(\d+)$/")->Obj.magic, () => {
      state :=
        contribute.contents.disposeComponentsFunc(.
          state.contents,
          [basicCameraView1.contents, basicCameraView2.contents],
        )
    })

    \"when"(
      %re(
        "/^create two basicCameraViews as basicCameraView(\d+), basicCameraView(\d+)$/"
      )->Obj.magic,
      () => {
        let (s, t1) = contribute.contents.createComponentFunc(. state.contents)
        let (s, t2) = contribute.contents.createComponentFunc(. s)

        state := s
        basicCameraView3 := t1
        basicCameraView4 := t2
      },
    )

    then(%re("/^basicCameraView(\d+) should equal to basicCameraView(\d+)$/")->Obj.magic, () => {
      basicCameraView3->expect == basicCameraView2
    })

    \"and"(%re("/^basicCameraView(\d+) should equal to basicCameraView(\d+)$/")->Obj.magic, () => {
      basicCameraView4->expect == basicCameraView1
    })
  })
})
