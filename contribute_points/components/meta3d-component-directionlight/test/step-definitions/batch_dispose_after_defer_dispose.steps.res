open Meta3dBsJestCucumber
open Cucumber
open Expect
open Operators

let feature = loadFeature("./test/features/batch_dispose_after_defer_dispose.feature")

defineFeature(feature, test => {
  let contribute: ref<
    Meta3dEngineCoreProtocol.ComponentContributeType.componentContribute<
      StateType.state,
      Meta3dComponentDirectionlightProtocol.Index.config,
      
      Meta3dComponentDirectionlightProtocol.Index.needDisposedComponents,
      Meta3dComponentDirectionlightProtocol.Index.batchDisposeData,
      Meta3dComponentDirectionlightProtocol.Index.cloneConfig,
      Meta3dComponentDirectionlightProtocol.Index.directionLight,
    >,
  > = ref(Obj.magic(1))
  let state = ref(Obj.magic(1))
  let directionLight1 = ref(Obj.magic(1))
  let directionLight2 = ref(Obj.magic(2))

  let _getContributeAndCreateAState = ((given, \"and")) => {
    given("I get contribute", () => {
      contribute := Main.getComponentContribute()
    })

    \"and"("create a state", () => {
      state := StateTool.createState(~contribute=contribute.contents, ())
    })
  }

  test(."remove from gameObjectMap, gameObjectDirectionLightMap", ({
    given,
    \"and",
    \"when",
    then,
  }) => {
    let gameObject1 = 10
    let directionLight1 = ref(Obj.magic(1))
    let d1 = [0.5, 1.0, 1.0]

    _getContributeAndCreateAState((given, \"and"))

    given("create a gameObject", () => {
      ()
    })

    \"and"("create a directionLight", () => {
      let (s, m) = contribute.contents.createComponentFunc(. state.contents)

      state := s
      directionLight1 := m
    })

    \"and"("add the directionLight to the gameObject", () => {
      state :=
        contribute.contents.addComponentFunc(.
          state.contents,
          gameObject1,
          directionLight1.contents,
        )
    })

    \"and"("defer dispose the directionLight from the gameObject", () => {
      state :=
        contribute.contents.deferDisposeComponentFunc(.
          state.contents,
          (directionLight1.contents, gameObject1),
        )
    })

    \"when"("dispose the need disposed directionLights", () => {
      state :=
        contribute.contents.disposeComponentsFunc(.
          state.contents,
          contribute.contents.getNeedDisposedComponentsFunc(. state.contents),
        )
    })

    then("get the directionLight's gameObjects should return []", () => {
      contribute.contents.getGameObjectsFunc(.
        state.contents,
        directionLight1.contents,
      )->expect == []
    })

    \"and"("get the gameObject's directionLight should return empty", () => {
      contribute.contents.getComponentFunc(. state.contents, gameObject1)->expect ==
        Js.Nullable.undefined
    })
  })

  test(."reset removed one\'s value in colors", ({given, \"and", \"when", then}) => {
    let c1 = [1., 1., 0.5]
    let c2 = [0., 0., 0.5]

    _getContributeAndCreateAState((given, \"and"))

    given(
      %re("/^create two directionLights as directionLight(\d+), directionLight(\d+)$/")->Obj.magic,
      () => {
        let (s, t1) = contribute.contents.createComponentFunc(. state.contents)
        let (s, t2) = contribute.contents.createComponentFunc(. s)

        state := s
        directionLight1 := t1
        directionLight2 := t2
      },
    )

    \"and"(%re("/^set directionLight(\d+)'s color to c(\d+)$/")->Obj.magic, () => {
      state :=
        contribute.contents.setComponentDataFunc(.
          state.contents,
          directionLight1.contents,
          Meta3dComponentDirectionlightProtocol.Index.dataName.color,
          c1->Obj.magic,
        )
    })

    \"and"(%re("/^set directionLight(\d+)'s color to c(\d+)$/")->Obj.magic, () => {
      state :=
        contribute.contents.setComponentDataFunc(.
          state.contents,
          directionLight2.contents,
          Meta3dComponentDirectionlightProtocol.Index.dataName.color,
          c2->Obj.magic,
        )
    })

    \"and"(%re("/^defer dispose directionLight(\d+)$/")->Obj.magic, () => {
      state :=
        contribute.contents.deferDisposeComponentFunc(.
          state.contents,
          directionLight1.contents->Meta3dCommonlib.DeferDisposeTool.buildDeferDisposeData,
        )
    })

    \"when"("dispose the need disposed directionLights", () => {
      state :=
        contribute.contents.disposeComponentsFunc(.
          state.contents,
          contribute.contents.getNeedDisposedComponentsFunc(. state.contents),
        )
    })

    then(%re("/^get directionLight(\d+)'s color should return default data$/")->Obj.magic, () => {
      contribute.contents.getComponentDataFunc(.
        state.contents,
        directionLight1.contents,
        Meta3dComponentDirectionlightProtocol.Index.dataName.color,
      )
      ->Meta3dCommonlib.NullableTool.getExn
      ->Obj.magic
      ->expect == TypeArrayTool.getDefaultColor()
    })

    \"and"(%re("/^get directionLight(\d+)'s color should return c(\d+)$/")->Obj.magic, () => {
      contribute.contents.getComponentDataFunc(.
        state.contents,
        directionLight2.contents,
        Meta3dComponentDirectionlightProtocol.Index.dataName.color,
      )
      ->Meta3dCommonlib.NullableTool.getExn
      ->Obj.magic
      ->expect == c2
    })
  })

  test(."reset removed one\'s value in intensities", ({given, \"and", \"when", then}) => {
    let i1 = 1.5
    let i2 = 2.

    _getContributeAndCreateAState((given, \"and"))

    given(
      %re("/^create two directionLights as directionLight(\d+), directionLight(\d+)$/")->Obj.magic,
      () => {
        let (s, t1) = contribute.contents.createComponentFunc(. state.contents)
        let (s, t2) = contribute.contents.createComponentFunc(. s)

        state := s
        directionLight1 := t1
        directionLight2 := t2
      },
    )

    \"and"(%re("/^set directionLight(\d+)'s intensity to i(\d+)$/")->Obj.magic, () => {
      state :=
        contribute.contents.setComponentDataFunc(.
          state.contents,
          directionLight1.contents,
          Meta3dComponentDirectionlightProtocol.Index.dataName.intensity,
          i1->Obj.magic,
        )
    })

    \"and"(%re("/^set directionLight(\d+)'s intensity to i(\d+)$/")->Obj.magic, () => {
      state :=
        contribute.contents.setComponentDataFunc(.
          state.contents,
          directionLight2.contents,
          Meta3dComponentDirectionlightProtocol.Index.dataName.intensity,
          i2->Obj.magic,
        )
    })

    \"and"(%re("/^defer dispose directionLight(\d+)$/")->Obj.magic, () => {
      state :=
        contribute.contents.deferDisposeComponentFunc(.
          state.contents,
          directionLight1.contents->Meta3dCommonlib.DeferDisposeTool.buildDeferDisposeData,
        )
    })

    \"when"("dispose the need disposed directionLights", () => {
      state :=
        contribute.contents.disposeComponentsFunc(.
          state.contents,
          contribute.contents.getNeedDisposedComponentsFunc(. state.contents),
        )
    })

    then(
      %re("/^get directionLight(\d+)'s intensity should return default data$/")->Obj.magic,
      () => {
        contribute.contents.getComponentDataFunc(.
          state.contents,
          directionLight1.contents,
          Meta3dComponentDirectionlightProtocol.Index.dataName.intensity,
        )
        ->Meta3dCommonlib.NullableTool.getExn
        ->Obj.magic
        ->expect == TypeArrayTool.getDefaultIntensity()
      },
    )

    \"and"(%re("/^get directionLight(\d+)'s intensity should return i(\d+)$/")->Obj.magic, () => {
      contribute.contents.getComponentDataFunc(.
        state.contents,
        directionLight2.contents,
        Meta3dComponentDirectionlightProtocol.Index.dataName.intensity,
      )
      ->Meta3dCommonlib.NullableTool.getExn
      ->Obj.magic
      ->expect == i2
    })
  })

  test(."if has disposed one, use disposed index as new index", ({
    given,
    \"and",
    \"when",
    then,
  }) => {
    let directionLight3 = ref(Obj.magic(1))
    let directionLight4 = ref(Obj.magic(2))

    _getContributeAndCreateAState((given, \"and"))

    given(
      %re("/^create two directionLights as directionLight(\d+), directionLight(\d+)$/")->Obj.magic,
      () => {
        let (s, t1) = contribute.contents.createComponentFunc(. state.contents)
        let (s, t2) = contribute.contents.createComponentFunc(. s)

        state := s
        directionLight1 := t1
        directionLight2 := t2
      },
    )

    \"and"(%re("/^defer dispose directionLight(\d+), directionLight(\d+)$/")->Obj.magic, () => {
      state :=
        contribute.contents.deferDisposeComponentFunc(.
          state.contents,
          directionLight1.contents->Meta3dCommonlib.DeferDisposeTool.buildDeferDisposeData,
        )
      state :=
        contribute.contents.deferDisposeComponentFunc(.
          state.contents,
          directionLight2.contents->Meta3dCommonlib.DeferDisposeTool.buildDeferDisposeData,
        )
    })

    \"and"(%re("/^dispose directionLight(\d+), directionLight(\d+)$/")->Obj.magic, () => {
      state :=
        contribute.contents.disposeComponentsFunc(.
          state.contents,
          [directionLight1.contents, directionLight2.contents],
        )
    })

    \"when"(
      %re("/^create two directionLights as directionLight(\d+), directionLight(\d+)$/")->Obj.magic,
      () => {
        let (s, t1) = contribute.contents.createComponentFunc(. state.contents)
        let (s, t2) = contribute.contents.createComponentFunc(. s)

        state := s
        directionLight3 := t1
        directionLight4 := t2
      },
    )

    then(%re("/^directionLight(\d+) should equal to directionLight(\d+)$/")->Obj.magic, () => {
      directionLight3->expect == directionLight2
    })

    \"and"(%re("/^directionLight(\d+) should equal to directionLight(\d+)$/")->Obj.magic, () => {
      directionLight4->expect == directionLight1
    })
  })
})
