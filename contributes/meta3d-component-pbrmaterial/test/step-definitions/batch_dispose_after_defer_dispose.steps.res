open Meta3dBsJestCucumber
open Cucumber
open Expect
open Operators

let feature = loadFeature("./test/features/batch_dispose_after_defer_dispose.feature")

defineFeature(feature, test => {
  let contribute: ref<
    Meta3dEngineCoreProtocol.ComponentContributeType.componentContribute<
      StateType.state,
      Meta3dComponentPbrmaterialProtocol.Index.config,
      
      Meta3dComponentPbrmaterialProtocol.Index.needDisposedComponents,
      Meta3dComponentPbrmaterialProtocol.Index.batchDisposeData,
      Meta3dComponentPbrmaterialProtocol.Index.cloneConfig,
      Meta3dComponentPbrmaterialProtocol.Index.pbrMaterial,
    >,
  > = ref(Obj.magic(1))
  let state = ref(Obj.magic(1))
  let pbrMaterial1 = ref(Obj.magic(1))
  let pbrMaterial2 = ref(Obj.magic(2))

  let _getContributeAndCreateAState = ((given, \"and")) => {
    given("I get contribute", () => {
      contribute := MainTool.getContribute()
    })

    \"and"("create a state", () => {
      state := StateTool.createState(~contribute=contribute.contents, ())
    })
  }

  test(."if not dispose pbrMaterial from all gameObjects, not dispose pbrMaterial\'s data", ({
    given,
    \"and",
    \"when",
    then,
  }) => {
    let gameObject1 = 10
    let gameObject2 = 11
    let gameObject3 = 12
    let pbrMaterial1 = ref(Obj.magic(1))
    let d1 = [0.5, 1.0, 1.0]

    _getContributeAndCreateAState((given, \"and"))

    given(%re("/^create three gameObjects as g(\d+), g(\d+), g(\d+)$/")->Obj.magic, () => {
      ()
    })

    \"and"("create a pbrMaterial", () => {
      let (s, m) = contribute.contents.createComponentFunc(. state.contents)

      state := s
      pbrMaterial1 := m
    })

    \"and"(%re("/^set pbrMaterial's diffuseColor to d(\d+)$/")->Obj.magic, () => {
      state :=
        contribute.contents.setComponentDataFunc(.
          state.contents,
          pbrMaterial1.contents,
          Meta3dComponentPbrmaterialProtocol.Index.dataName.diffuseColor,
          d1->Obj.magic,
        )
    })

    \"and"(%re("/^add the pbrMaterial to g(\d+)$/")->Obj.magic, () => {
      state :=
        contribute.contents.addComponentFunc(. state.contents, gameObject1, pbrMaterial1.contents)
    })

    \"and"(%re("/^add the pbrMaterial to g(\d+)$/")->Obj.magic, () => {
      state :=
        contribute.contents.addComponentFunc(. state.contents, gameObject2, pbrMaterial1.contents)
    })

    \"and"(%re("/^add the pbrMaterial to g(\d+)$/")->Obj.magic, () => {
      state :=
        contribute.contents.addComponentFunc(. state.contents, gameObject3, pbrMaterial1.contents)
    })

    given(%re("/^defer dispose the pbrMaterial from g(\d+)$/")->Obj.magic, () => {
      state :=
        contribute.contents.deferDisposeComponentFunc(.
          state.contents,
          (pbrMaterial1.contents, gameObject1),
        )
    })

    \"when"("dispose the need disposed pbrMaterials", () => {
      state :=
        contribute.contents.disposeComponentsFunc(.
          state.contents,
          contribute.contents.getNeedDisposedComponentsFunc(. state.contents),
        )
    })

    then(%re("/^get the pbrMaterial's diffuseColor should return d(\d+)$/")->Obj.magic, () => {
      contribute.contents.getComponentDataFunc(.
        state.contents,
        pbrMaterial1.contents,
        Meta3dComponentPbrmaterialProtocol.Index.dataName.diffuseColor,
      )->expect == d1
    })
  })

  test(."else, dispose pbrMaterial\'s data", ({given, \"and", \"when", then}) => {
    let gameObject1 = 10
    let gameObject2 = 11
    let gameObject3 = 12
    let pbrMaterial1 = ref(Obj.magic(1))
    let d1 = [0.5, 1.0, 1.0]

    _getContributeAndCreateAState((given, \"and"))

    given(%re("/^create three gameObjects as g(\d+), g(\d+), g(\d+)$/")->Obj.magic, () => {
      ()
    })

    \"and"("create a pbrMaterial", () => {
      let (s, m) = contribute.contents.createComponentFunc(. state.contents)

      state := s
      pbrMaterial1 := m
    })

    \"and"(%re("/^set pbrMaterial's diffuseColor to d(\d+)$/")->Obj.magic, () => {
      state :=
        contribute.contents.setComponentDataFunc(.
          state.contents,
          pbrMaterial1.contents,
          Meta3dComponentPbrmaterialProtocol.Index.dataName.diffuseColor,
          d1->Obj.magic,
        )
    })

    \"and"(%re("/^add the pbrMaterial to g(\d+)$/")->Obj.magic, () => {
      state :=
        contribute.contents.addComponentFunc(. state.contents, gameObject1, pbrMaterial1.contents)
    })

    \"and"(%re("/^add the pbrMaterial to g(\d+)$/")->Obj.magic, () => {
      state :=
        contribute.contents.addComponentFunc(. state.contents, gameObject2, pbrMaterial1.contents)
    })

    \"and"(%re("/^add the pbrMaterial to g(\d+)$/")->Obj.magic, () => {
      state :=
        contribute.contents.addComponentFunc(. state.contents, gameObject3, pbrMaterial1.contents)
    })

    given("defer dispose the pbrMaterial from g1, g2, g3", () => {
      state :=
        contribute.contents.deferDisposeComponentFunc(.
          state.contents,
          (pbrMaterial1.contents, gameObject1),
        )
      state :=
        contribute.contents.deferDisposeComponentFunc(.
          state.contents,
          (pbrMaterial1.contents, gameObject2),
        )
      state :=
        contribute.contents.deferDisposeComponentFunc(.
          state.contents,
          (pbrMaterial1.contents, gameObject3),
        )
    })

    \"when"("dispose the need disposed pbrMaterials", () => {
      state :=
        contribute.contents.disposeComponentsFunc(.
          state.contents,
          contribute.contents.getNeedDisposedComponentsFunc(. state.contents),
        )
    })

    then("get the pbrMaterial's diffuseColor should return default data", () => {
      contribute.contents.getComponentDataFunc(.
        state.contents,
        pbrMaterial1.contents,
        Meta3dComponentPbrmaterialProtocol.Index.dataName.diffuseColor,
      )
      ->Meta3dCommonlib.NullableTool.getExn
      ->Obj.magic
      ->TypeArrayTool.changeTypeArrayToTuple
      ->expect == TypeArrayTool.getDefaultDiffuseColor(state.contents)
    })
  })

  test(."remove from gameObjectMap, gameObjectPBRMaterialMap", ({given, \"and", \"when", then}) => {
    let gameObject1 = 10
    let pbrMaterial1 = ref(Obj.magic(1))
    let d1 = [0.5, 1.0, 1.0]

    _getContributeAndCreateAState((given, \"and"))

    given("create a gameObject", () => {
      ()
    })

    \"and"("create a pbrMaterial", () => {
      let (s, m) = contribute.contents.createComponentFunc(. state.contents)

      state := s
      pbrMaterial1 := m
    })

    \"and"("add the pbrMaterial to the gameObject", () => {
      state :=
        contribute.contents.addComponentFunc(. state.contents, gameObject1, pbrMaterial1.contents)
    })

    \"and"("defer dispose the pbrMaterial from the gameObject", () => {
      state :=
        contribute.contents.deferDisposeComponentFunc(.
          state.contents,
          (pbrMaterial1.contents, gameObject1),
        )
    })

    \"when"("dispose the need disposed pbrMaterials", () => {
      state :=
        contribute.contents.disposeComponentsFunc(.
          state.contents,
          contribute.contents.getNeedDisposedComponentsFunc(. state.contents),
        )
    })

    then("get the pbrMaterial's gameObjects should return []", () => {
      contribute.contents.getGameObjectsFunc(. state.contents, pbrMaterial1.contents)->expect == []
    })

    \"and"("get the gameObject's pbrMaterial should return empty", () => {
      contribute.contents.getComponentFunc(. state.contents, gameObject1)->expect ==
        Js.Nullable.null
    })
  })

  test(."reset removed one\'s value in diffuseColors", ({given, \"and", \"when", then}) => {
    let gameObject1 = 10
    let gameObject2 = 11
    let pbrMaterial1 = ref(Obj.magic(1))
    let pbrMaterial2 = ref(Obj.magic(2))
    let d1 = [0.5, 1.0, 1.0]
    let d2 = [0.5, 0.5, 1.0]

    _getContributeAndCreateAState((given, \"and"))

    given(%re("/^create two gameObject as g(\d+), g(\d+)$/")->Obj.magic, () => {
      ()
    })

    \"and"(%re("/^create two pbrMaterials as p(\d+), p(\d+)$/")->Obj.magic, () => {
      let (s, m1) = contribute.contents.createComponentFunc(. state.contents)
      let (s, m2) = contribute.contents.createComponentFunc(. s)

      state := s
      pbrMaterial1 := m1
      pbrMaterial2 := m2
    })

    \"and"(%re("/^add p(\d+) to g(\d+)$/")->Obj.magic, () => {
      state :=
        contribute.contents.addComponentFunc(. state.contents, gameObject1, pbrMaterial1.contents)
    })

    \"and"(%re("/^add p(\d+) to g(\d+)$/")->Obj.magic, () => {
      state :=
        contribute.contents.addComponentFunc(. state.contents, gameObject2, pbrMaterial2.contents)
    })

    \"and"(%re("/^set p(\d+)'s diffuseColor to d(\d+)$/")->Obj.magic, () => {
      state :=
        contribute.contents.setComponentDataFunc(.
          state.contents,
          pbrMaterial1.contents,
          Meta3dComponentPbrmaterialProtocol.Index.dataName.diffuseColor,
          d1->Obj.magic,
        )
    })

    \"and"(%re("/^set p(\d+)'s diffuseColor to d(\d+)$/")->Obj.magic, () => {
      state :=
        contribute.contents.setComponentDataFunc(.
          state.contents,
          pbrMaterial2.contents,
          Meta3dComponentPbrmaterialProtocol.Index.dataName.diffuseColor,
          d2->Obj.magic,
        )
    })

    \"and"(%re("/^defer dispose p1 from g(\d+)$/")->Obj.magic, () => {
      state :=
        contribute.contents.deferDisposeComponentFunc(.
          state.contents,
          (pbrMaterial1.contents, gameObject1),
        )
    })

    \"when"("dispose the need disposed pbrMaterials", () => {
      state :=
        contribute.contents.disposeComponentsFunc(.
          state.contents,
          contribute.contents.getNeedDisposedComponentsFunc(. state.contents),
        )
    })

    then(%re("/^get p(\d+)'s diffuseColor should return default data$/")->Obj.magic, () => {
      contribute.contents.getComponentDataFunc(.
        state.contents,
        pbrMaterial1.contents,
        Meta3dComponentPbrmaterialProtocol.Index.dataName.diffuseColor,
      )->expect == TypeArrayTool.getDefaultDiffuseColor(state.contents)
    })

    \"and"(%re("/^get p(\d+)'s diffuseColor should return d(\d+)$/")->Obj.magic, () => {
      contribute.contents.getComponentDataFunc(.
        state.contents,
        pbrMaterial2.contents,
        Meta3dComponentPbrmaterialProtocol.Index.dataName.diffuseColor,
      )->expect == d2
    })
  })

  test(."reset removed one\'s value in speculars", ({given, \"and", \"when", then}) => {
    let gameObject1 = 10
    let gameObject2 = 11
    let pbrMaterial1 = ref(Obj.magic(1))
    let pbrMaterial2 = ref(Obj.magic(2))
    let s1 = 0.5
    let s2 = 1.0

    _getContributeAndCreateAState((given, \"and"))

    given(%re("/^create two gameObject as g(\d+), g(\d+)$/")->Obj.magic, () => {
      ()
    })

    \"and"(%re("/^create two pbrMaterials as p(\d+), p(\d+)$/")->Obj.magic, () => {
      let (s, m1) = contribute.contents.createComponentFunc(. state.contents)
      let (s, m2) = contribute.contents.createComponentFunc(. s)

      state := s
      pbrMaterial1 := m1
      pbrMaterial2 := m2
    })

    \"and"(%re("/^add p(\d+) to g(\d+)$/")->Obj.magic, () => {
      state :=
        contribute.contents.addComponentFunc(. state.contents, gameObject1, pbrMaterial1.contents)
    })

    \"and"(%re("/^add p(\d+) to g(\d+)$/")->Obj.magic, () => {
      state :=
        contribute.contents.addComponentFunc(. state.contents, gameObject2, pbrMaterial2.contents)
    })

    \"and"(%re("/^set p(\d+)'s specular to s(\d+)$/")->Obj.magic, () => {
      state :=
        contribute.contents.setComponentDataFunc(.
          state.contents,
          pbrMaterial1.contents,
          Meta3dComponentPbrmaterialProtocol.Index.dataName.specular,
          s1->Obj.magic,
        )
    })

    \"and"(%re("/^set p(\d+)'s specular to s(\d+)$/")->Obj.magic, () => {
      state :=
        contribute.contents.setComponentDataFunc(.
          state.contents,
          pbrMaterial2.contents,
          Meta3dComponentPbrmaterialProtocol.Index.dataName.specular,
          s2->Obj.magic,
        )
    })

    \"and"(%re("/^defer dispose p1 from g(\d+)$/")->Obj.magic, () => {
      state :=
        contribute.contents.deferDisposeComponentFunc(.
          state.contents,
          (pbrMaterial1.contents, gameObject1),
        )
    })

    \"when"("dispose the need disposed pbrMaterials", () => {
      state :=
        contribute.contents.disposeComponentsFunc(.
          state.contents,
          contribute.contents.getNeedDisposedComponentsFunc(. state.contents),
        )
    })

    then(%re("/^get p(\d+)'s specular should return default data$/")->Obj.magic, () => {
      contribute.contents.getComponentDataFunc(.
        state.contents,
        pbrMaterial1.contents,
        Meta3dComponentPbrmaterialProtocol.Index.dataName.specular,
      )->expect == TypeArrayTool.getDefaultSpecular(state.contents)
    })

    \"and"(%re("/^get p(\d+)'s specular should return s(\d+)$/")->Obj.magic, () => {
      contribute.contents.getComponentDataFunc(.
        state.contents,
        pbrMaterial2.contents,
        Meta3dComponentPbrmaterialProtocol.Index.dataName.specular,
      )->expect == s2
    })
  })

  test(."if has disposed one, use disposed index as new index", ({
    given,
    \"and",
    \"when",
    then,
  }) => {
    let pbrMaterial3 = ref(Obj.magic(1))
    let pbrMaterial4 = ref(Obj.magic(2))

    _getContributeAndCreateAState((given, \"and"))

    given(
      %re("/^create two pbrMaterials as pbrMaterial(\d+), pbrMaterial(\d+)$/")->Obj.magic,
      () => {
        let (s, p1) = contribute.contents.createComponentFunc(. state.contents)
        let (s, p2) = contribute.contents.createComponentFunc(. s)

        state := s
        pbrMaterial1 := p1
        pbrMaterial2 := p2
      },
    )

    \"and"(%re("/^defer dispose pbrMaterial(\d+), pbrMaterial(\d+)$/")->Obj.magic, () => {
      state :=
        contribute.contents.deferDisposeComponentFunc(.
          state.contents,
          pbrMaterial1.contents->Meta3dCommonlib.DeferDisposeTool.buildDeferDisposeData,
        )
      state :=
        contribute.contents.deferDisposeComponentFunc(.
          state.contents,
          pbrMaterial2.contents->Meta3dCommonlib.DeferDisposeTool.buildDeferDisposeData,
        )
    })

    \"and"(%re("/^dispose pbrMaterial(\d+), pbrMaterial(\d+)$/")->Obj.magic, () => {
      state :=
        contribute.contents.disposeComponentsFunc(.
          state.contents,
          Meta3dCommonlib.BatchDisposeTool.buildSharedBatchDisposeData([
            pbrMaterial1.contents,
            pbrMaterial2.contents,
          ]),
        )
    })

    \"when"(
      %re("/^create two pbrMaterials as pbrMaterial(\d+), pbrMaterial(\d+)$/")->Obj.magic,
      () => {
        let (s, p1) = contribute.contents.createComponentFunc(. state.contents)
        let (s, p2) = contribute.contents.createComponentFunc(. s)

        state := s
        pbrMaterial3 := p1
        pbrMaterial4 := p2
      },
    )

    then(%re("/^pbrMaterial(\d+) should equal to pbrMaterial(\d+)$/")->Obj.magic, () => {
      pbrMaterial3->expect == pbrMaterial2
    })

    \"and"(%re("/^pbrMaterial(\d+) should equal to pbrMaterial(\d+)$/")->Obj.magic, () => {
      pbrMaterial4->expect == pbrMaterial1
    })
  })
})
