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
      Meta3dComponentPbrmaterialProtocol.Index.dataNameType,
      Meta3dComponentPbrmaterialProtocol.Index.needDisposedComponents,
      Meta3dComponentPbrmaterialProtocol.Index.deferDisposeData,
      Meta3dComponentPbrmaterialProtocol.Index.batchDisposeData,
      Meta3dComponentPbrmaterialProtocol.Index.pbrMaterial,
    >,
  > = ref(Obj.magic(1))
  let state = ref(Obj.magic(1))
  let pbrMaterial1 = ref(Obj.magic(1))
  let pbrMaterial2 = ref(Obj.magic(2))

  let _getContributeAndCreateAState = ((given, \"and")) => {
    given("I get contribute", () => {
      contribute := Main.getComponentContribute()
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

    \"when"("dispose the pbrMaterial", () => {
      state :=
        contribute.contents.disposeComponentsFunc(.
          state.contents,
          contribute.contents.getNeedDisposedComponentsFunc(. state.contents),
        )
    })

    then(%re("/^get pbrMaterial's diffuseColor should return d(\d+)$/")->Obj.magic, () => {
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

    \"when"("dispose the pbrMaterial", () => {
      state :=
        contribute.contents.disposeComponentsFunc(.
          state.contents,
          contribute.contents.getNeedDisposedComponentsFunc(. state.contents),
        )
    })

    then("get pbrMaterial's diffuseColor should return default data", () => {
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

  //   test(."reset removed one\'s value in diffuseColors", ({given, \"and", \"when", then}) => {
  //     given("I get contribute", () => {
  //       ()
  //     })

  //     \"and"("create a state", () => {
  //       ()
  //     })

  //     given(%re("/^create two gameObject as g(\d+), g(\d+)$/")->Obj.magic, () => {
  //       ()
  //     })

  //     \"and"(%re("/^create two pbrMaterials as p(\d+), p(\d+)$/")->Obj.magic, () => {
  //       ()
  //     })

  //     \"and"(%re("/^add p(\d+) to g(\d+)$/")->Obj.magic, () => {
  //       ()
  //     })

  //     \"and"(%re("/^add p(\d+) to g(\d+)$/")->Obj.magic, () => {
  //       ()
  //     })

  //     \"and"(%re("/^set p(\d+)'s diffuseColor to d(\d+)$/")->Obj.magic, () => {
  //       ()
  //     })

  //     \"and"(%re("/^set p(\d+)'s diffuseColor to d(\d+)$/")->Obj.magic, () => {
  //       ()
  //     })

  //     \"and"(%re("/^defer dispose p(\d+) from g(\d+)$/")->Obj.magic, () => {
  //       ()
  //     })

  //     \"when"(%re("/^dispose p(\d+) from g(\d+)$/")->Obj.magic, () => {
  //       ()
  //     })

  //     then(%re("/^get p(\d+)'s diffuseColor should return default data$/")->Obj.magic, () => {
  //       ()
  //     })

  //     \"and"(%re("/^get p(\d+)'s diffuseColor should return d(\d+)$/")->Obj.magic, () => {
  //       ()
  //     })
  //     ()
  //   })

  //   test(."reset removed one\'s value in speculars", ({given, \"and", \"when", then}) => {
  //     given("I get contribute", () => {
  //       ()
  //     })

  //     \"and"("create a state", () => {
  //       ()
  //     })

  //     given(%re("/^create two gameObject as g(\d+), g(\d+)$/")->Obj.magic, () => {
  //       ()
  //     })

  //     \"and"(%re("/^create two pbrMaterials as p(\d+), p(\d+)$/")->Obj.magic, () => {
  //       ()
  //     })

  //     \"and"(%re("/^add p(\d+) to g(\d+)$/")->Obj.magic, () => {
  //       ()
  //     })

  //     \"and"(%re("/^add p(\d+) to g(\d+)$/")->Obj.magic, () => {
  //       ()
  //     })

  //     \"and"(%re("/^set p(\d+)'s specular to s(\d+)$/")->Obj.magic, () => {
  //       ()
  //     })

  //     \"and"(%re("/^set p(\d+)'s specular to s(\d+)$/")->Obj.magic, () => {
  //       ()
  //     })

  //     \"and"(%re("/^defer dispose p(\d+) from g(\d+)$/")->Obj.magic, () => {
  //       ()
  //     })

  //     \"when"(%re("/^dispose p(\d+) from g(\d+)$/")->Obj.magic, () => {
  //       ()
  //     })

  //     then(%re("/^get p(\d+)'s specular should return default data$/")->Obj.magic, () => {
  //       ()
  //     })

  //     \"and"(%re("/^get p(\d+)'s specular should return s(\d+)$/")->Obj.magic, () => {
  //       ()
  //     })
  //     ()
  //   })
})
