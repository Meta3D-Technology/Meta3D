open Meta3dBsJestCucumber
open Cucumber
open Expect
open Operators

open Sinon

let feature = loadFeature("./test/features/component.feature")

defineFeature(feature, test => {
  let contribute = ref(Obj.magic(1))
  let usedContribute: ref<
    Meta3dEngineCoreSceneviewProtocol.RegisterComponentType.usedComponentContribute,
  > = ref(Obj.magic(1))

  let _getAllRegisteredComponentData = () => {
    StateContainer.unsafeGetState().componentContributeData.allComponentContributes
  }

  let _prepareRegister = given => {
    given("prepare register", () => {
      CreateState.createState()->StateContainer.setState
    })
  }

  test(."register one component", ({given, \"when", \"and", then}) => {
    _prepareRegister(given)

    \"when"(
      "register component contribute",
      () => {
        contribute := ComponentTool.buildComponentContribute()

        MainTool.registerComponent(contribute.contents)
      },
    )

    then(
      "should add component contribute",
      () => {
        _getAllRegisteredComponentData()->expect ==
          Meta3dCommonlib.ImmutableHashMap.createEmpty()->Meta3dCommonlib.ImmutableHashMap.set(
            contribute.contents.componentName,
            contribute.contents,
          )
      },
    )
  })

  test(."register the same component twice", ({given, \"when", \"and", then}) => {
    _prepareRegister(given)

    given(
      "open debug",
      () => {
        MainTool.setIsDebug(true)
      },
    )

    \"when"(
      "register component contribute",
      () => {
        contribute := ComponentTool.buildComponentContribute()

        MainTool.registerComponent(contribute.contents)
      },
    )

    \"and"(
      "register component contribute",
      () => {
        ()
      },
    )

    then(
      %re("/^should contract error: \"(.*)\"$/")->Obj.magic,
      arg0 => {
        expect(
          () => {
            MainTool.registerComponent(contribute.contents)
          },
        )->toThrowMessage(arg0->Obj.magic)
      },
    )
  })

  test(."register one component and unregister it", ({given, \"when", \"and", then}) => {
    _prepareRegister(given)

    \"when"(
      "register component contribute",
      () => {
        contribute := ComponentTool.buildComponentContribute()

        MainTool.registerComponent(contribute.contents)
      },
    )

    \"and"(
      "unregister it",
      () => {
        MainTool.unregisterComponent(contribute.contents.componentName)
      },
    )

    then(
      "should not has component contribute",
      () => {
        _getAllRegisteredComponentData()->expect == Meta3dCommonlib.ImmutableHashMap.createEmpty()
      },
    )
  })

  test(."register two components and unregister the first one", ({
    given,
    \"when",
    \"and",
    then,
  }) => {
    let data1 = ref(Obj.magic(1))
    let data2 = ref(Obj.magic(1))

    _prepareRegister(given)

    \"when"(
      "register component1 contribute",
      () => {
        data1 := ComponentTool.buildComponentContribute(~componentName="a1", ())

        MainTool.registerComponent(data1.contents)
      },
    )

    \"and"(
      "register component2 contribute",
      () => {
        data2 := ComponentTool.buildComponentContribute(~componentName="a2", ())

        MainTool.registerComponent(data2.contents)
      },
    )

    \"and"(
      "unregister component1 contribute",
      () => {
        MainTool.unregisterComponent(data1.contents.componentName)
      },
    )

    then(
      "should only has component2 contribute",
      () => {
        _getAllRegisteredComponentData()->expect ==
          Meta3dCommonlib.ImmutableHashMap.createEmpty()->Meta3dCommonlib.ImmutableHashMap.set(
            data2.contents.componentName,
            data2.contents,
          )
      },
    )
  })

  let _prepareComponent = (\"when", \"and", c) => {
    \"when"("register component contribute", () => {
      contribute := c

      MainTool.registerComponent(contribute.contents)
    })

    \"and"("create and set component state", () => {
      MainTool.createAndSetComponentState(c.componentName, Obj.magic(1))
    })
  }

  test(."create component", ({given, \"when", \"and", then}) => {
    let c1 = ref(Obj.magic(1))
    let componentName = "a1"

    _prepareRegister(given)

    _prepareComponent(
      \"when",
      \"and",
      ComponentTool.buildComponentContribute(
        ~componentName,
        ~createStateFunc=(. _) => {
          {
            "maxIndex": 0,
          }->Obj.magic
        },
        ~createComponentFunc=(. state) => {
          let component = JsObjTool.getObjValue(state, "maxIndex")

          (
            {
              "maxIndex": JsObjTool.getObjValue(state, "maxIndex")->succ,
            }->Obj.magic,
            component,
          )
        },
        (),
      ),
    )

    \"when"(
      "create a component as c1",
      () => {
        let (d, component) =
          MainTool.unsafeGetUsedComponentContribute(componentName)->MainTool.createComponent

        c1 := component
        usedContribute := d
      },
    )

    then(
      "c1 should be correct",
      () => {
        c1.contents->expect == 0->Obj.magic
      },
    )

    \"and"(
      "component state is updated",
      () => {
        JsObjTool.getObjValue(usedContribute.contents.state, "maxIndex")->expect == 1
      },
    )
  })

  test(."has component", ({given, \"when", \"and", then}) => {
    let g1 = Obj.magic(10)
    let c1 = ref(Obj.magic(1))
    let componentName = "a1"

    _prepareRegister(given)

    _prepareComponent(
      \"when",
      \"and",
      ComponentTool.buildComponentContribute(
        ~componentName,
        ~createStateFunc=(. _) => {
          {
            "gameObjectMeshRendererMap": Meta3dCommonlib.ImmutableSparseMap.createEmpty(),
          }->Obj.magic
        },
        ~createComponentFunc=(. state) => {
          let component = 1->Obj.magic

          (state, component)
        },
        ~addComponentFunc=(. state, gameObject, component) => {
          {
            "gameObjectMeshRendererMap": JsObjTool.getObjValue(
              state,
              "gameObjectMeshRendererMap",
            )->Meta3dCommonlib.ImmutableSparseMap.set(gameObject->Obj.magic, component->Obj.magic),
          }->Obj.magic
        },
        ~hasComponentFunc=(. state, gameObject) => {
          JsObjTool.getObjValue(
            state,
            "gameObjectMeshRendererMap",
          )->Meta3dCommonlib.ImmutableSparseMap.has(gameObject->Obj.magic)
        },
        (),
      ),
    )

    given(
      "create a gameObject as g1",
      () => {
        ()
      },
    )

    \"and"(
      "create a component as c1",
      () => {
        let (d, component) =
          MainTool.unsafeGetUsedComponentContribute(componentName)->MainTool.createComponent

        c1 := component
        usedContribute := d
      },
    )

    \"and"(
      "add c1 to g1",
      () => {
        usedContribute := usedContribute.contents->MainTool.addComponent(g1, c1.contents)
      },
    )

    then(
      "g1 should has c1",
      () => {
        usedContribute.contents->MainTool.hasComponent(g1)->expect == true
      },
    )
  })

  test(."remove component", ({given, \"when", \"and", then}) => {
    let g1 = Obj.magic(10)
    let c1 = ref(Obj.magic(1))
    let componentName = "a1"

    _prepareRegister(given)

    _prepareComponent(
      \"when",
      \"and",
      ComponentTool.buildComponentContribute(
        ~componentName,
        ~createStateFunc=(. _) => {
          {
            "gameObjectMeshRendererMap": Meta3dCommonlib.ImmutableSparseMap.createEmpty(),
          }->Obj.magic
        },
        ~createComponentFunc=(. state) => {
          let component = 1->Obj.magic

          (state, component)
        },
        ~addComponentFunc=(. state, gameObject, component) => {
          {
            "gameObjectMeshRendererMap": JsObjTool.getObjValue(
              state,
              "gameObjectMeshRendererMap",
            )->Meta3dCommonlib.ImmutableSparseMap.set(gameObject->Obj.magic, component->Obj.magic),
          }->Obj.magic
        },
        ~removeComponentFunc=(. state, gameObject, component) => {
          {
            "gameObjectMeshRendererMap": JsObjTool.getObjValue(
              state,
              "gameObjectMeshRendererMap",
            )->Meta3dCommonlib.ImmutableSparseMap.remove(gameObject->Obj.magic),
          }->Obj.magic
        },
        ~hasComponentFunc=(. state, gameObject) => {
          JsObjTool.getObjValue(
            state,
            "gameObjectMeshRendererMap",
          )->Meta3dCommonlib.ImmutableSparseMap.has(gameObject->Obj.magic)
        },
        (),
      ),
    )

    given(
      "create a gameObject as g1",
      () => {
        ()
      },
    )

    \"and"(
      "create a component as c1",
      () => {
        let (d, component) =
          MainTool.unsafeGetUsedComponentContribute(componentName)->MainTool.createComponent

        c1 := component
        usedContribute := d
      },
    )

    \"and"(
      "add c1 to g1",
      () => {
        usedContribute := usedContribute.contents->MainTool.addComponent(g1, c1.contents)
      },
    )

    \"when"(
      "remove c1 from g1",
      () => {
        usedContribute := usedContribute.contents->MainTool.removeComponent(g1, c1.contents)
      },
    )

    then(
      "g1 shouldn't has c1",
      () => {
        usedContribute.contents->MainTool.hasComponent(g1)->expect == false
      },
    )
  })

  test(."get component", ({given, \"when", \"and", then}) => {
    let g1 = Obj.magic(10)
    let c1 = ref(Obj.magic(1))
    let componentName = "a1"

    _prepareRegister(given)

    _prepareComponent(
      \"when",
      \"and",
      ComponentTool.buildComponentContribute(
        ~componentName,
        ~createStateFunc=(. _) => {
          {
            "gameObjectMeshRendererMap": Meta3dCommonlib.ImmutableSparseMap.createEmpty(),
          }->Obj.magic
        },
        ~createComponentFunc=(. state) => {
          let component = 1->Obj.magic

          (state, component)
        },
        ~addComponentFunc=(. state, gameObject, component) => {
          {
            "gameObjectMeshRendererMap": JsObjTool.getObjValue(
              state,
              "gameObjectMeshRendererMap",
            )->Meta3dCommonlib.ImmutableSparseMap.set(gameObject->Obj.magic, component->Obj.magic),
          }->Obj.magic
        },
        ~getComponentFunc=(. state, gameObject) => {
          JsObjTool.getObjValue(state, "gameObjectMeshRendererMap")
          ->Meta3dCommonlib.ImmutableSparseMap.get(gameObject->Obj.magic)
          ->Meta3dCommonlib.OptionSt.getExn
          ->Obj.magic
        },
        (),
      ),
    )

    given(
      "create a gameObject as g1",
      () => {
        ()
      },
    )

    \"and"(
      "create a component as c1",
      () => {
        let (d, component) =
          MainTool.unsafeGetUsedComponentContribute(componentName)->MainTool.createComponent

        c1 := component
        usedContribute := d
      },
    )

    \"and"(
      "add c1 to g1",
      () => {
        usedContribute := usedContribute.contents->MainTool.addComponent(g1, c1.contents)
      },
    )

    then(
      "get gameObject's component should return c1",
      () => {
        usedContribute.contents->MainTool.getComponent(g1)->expect ==
          c1.contents->Js.Nullable.return
      },
    )
  })

  test(."get need disposed components", ({given, \"when", \"and", then}) => {
    let c1 = ref(Obj.magic(1))
    let componentName = "a1"

    _prepareRegister(given)

    _prepareComponent(
      \"when",
      \"and",
      ComponentTool.buildComponentContribute(
        ~componentName,
        ~createStateFunc=(. _) => {
          {
            "needDisposeArray": [],
          }->Obj.magic
        },
        ~createComponentFunc=(. state) => {
          let component = 1->Obj.magic

          (state, component)
        },
        ~deferDisposeComponentFunc=(. state, (component, _)) => {
          {
            "needDisposeArray": JsObjTool.getObjValue(
              state,
              "needDisposeArray",
            )->Meta3dCommonlib.ArraySt.push(component),
          }->Obj.magic
        },
        ~getNeedDisposedComponentsFunc=(. state) => {
          JsObjTool.getObjValue(state, "needDisposeArray")
        },
        (),
      ),
    )

    given(
      %re("/^create a component as c(\d+)$/")->Obj.magic,
      arg0 => {
        let (d, component) =
          MainTool.unsafeGetUsedComponentContribute(componentName)->MainTool.createComponent

        c1 := component
        usedContribute := d
      },
    )

    \"and"(
      "defer dispose c1",
      () => {
        usedContribute :=
          MainTool.unsafeGetUsedComponentContribute(componentName)->MainTool.deferDisposeComponent(
            Meta3dCommonlib.DeferDisposeTool.buildDeferDisposeData(c1.contents),
          )
      },
    )

    then(
      "get need disposed components should return [c1]",
      () => {
        usedContribute.contents
        ->MainTool.getNeedDisposedComponents
        ->Obj.magic
        ->Js.Array.includes(c1.contents, _)
        ->expect == true
      },
    )
  })

  test(."defer dispose component", ({given, \"and", \"when", then}) => {
    let c1 = ref(Obj.magic(1))
    let componentName = "a1"

    _prepareRegister(given)

    _prepareComponent(
      \"when",
      \"and",
      ComponentTool.buildComponentContribute(
        ~componentName,
        ~createStateFunc=(. _) => {
          {
            "needDisposeArray": [],
          }->Obj.magic
        },
        ~createComponentFunc=(. state) => {
          let component = 1->Obj.magic

          (state, component)
        },
        ~deferDisposeComponentFunc=(. state, (component, _)) => {
          {
            "needDisposeArray": JsObjTool.getObjValue(
              state,
              "needDisposeArray",
            )->Meta3dCommonlib.ArraySt.push(component),
          }->Obj.magic
        },
        (),
      ),
    )

    given(
      %re("/^create a component as c(\d+)$/")->Obj.magic,
      arg0 => {
        let (d, component) =
          MainTool.unsafeGetUsedComponentContribute(componentName)->MainTool.createComponent

        c1 := component
        usedContribute := d
      },
    )

    \"when"(
      "defer dispose c1",
      () => {
        usedContribute :=
          MainTool.unsafeGetUsedComponentContribute(componentName)->MainTool.deferDisposeComponent(
            Meta3dCommonlib.DeferDisposeTool.buildDeferDisposeData(c1.contents),
          )
      },
    )

    then(
      "mark c1 as need dispose",
      () => {
        JsObjTool.getObjValue(usedContribute.contents.state, "needDisposeArray")
        ->Js.Array.includes(c1.contents, _)
        ->expect == true
      },
    )
  })

  test(."dispose components", ({given, \"and", \"when", then}) => {
    let c1 = ref(Obj.magic(1))
    let componentName = "a1"

    _prepareRegister(given)

    _prepareComponent(
      \"when",
      \"and",
      ComponentTool.buildComponentContribute(
        ~componentName,
        ~createComponentFunc=(. state) => {
          let component = 1->Obj.magic

          (state, component)
        },
        ~createStateFunc=(. _) => {
          {
            "disposedArray": [],
          }->Obj.magic
        },
        ~disposeComponentsFunc=(. state, components) => {
          (
            {
              "disposedArray": JsObjTool.getObjValue(state, "disposedArray")->Js.Array.concat(
                components->Obj.magic,
              ),
            }->Obj.magic,
            Obj.magic(1),
          )
        },
        (),
      ),
    )

    given(
      %re("/^create a component as c(\d+)$/")->Obj.magic,
      arg0 => {
        let (d, component) =
          MainTool.unsafeGetUsedComponentContribute(componentName)->MainTool.createComponent

        c1 := component
        usedContribute := d
      },
    )

    \"when"(
      "dispose [c1]",
      () => {
        usedContribute :=
          MainTool.unsafeGetUsedComponentContribute(componentName)->MainTool.disposeComponents(
            [c1.contents]->Obj.magic,
          )
      },
    )

    then(
      "mark c1 as disposed",
      () => {
        JsObjTool.getObjValue(usedContribute.contents.state, "disposedArray")
        ->Js.Array.includes(c1.contents, _)
        ->expect == true
      },
    )
  })

  test(."get all components", ({given, \"when", \"and", then}) => {
    let g1 = Obj.magic(10)
    let g2 = Obj.magic(11)
    let c1 = ref(Obj.magic(1))
    let c2 = ref(Obj.magic(2))
    let componentName = "a1"

    _prepareRegister(given)

    _prepareComponent(
      \"when",
      \"and",
      ComponentTool.buildComponentContribute(
        ~componentName,
        ~createStateFunc=(. _) => {
          {
            "gameObjectMeshRendererMap": Meta3dCommonlib.ImmutableSparseMap.createEmpty(),
          }->Obj.magic
        },
        ~createComponentFunc=(. state) => {
          let component = 1->Obj.magic

          (state, component)
        },
        ~addComponentFunc=(. state, gameObject, component) => {
          {
            "gameObjectMeshRendererMap": JsObjTool.getObjValue(
              state,
              "gameObjectMeshRendererMap",
            )->Meta3dCommonlib.ImmutableSparseMap.set(gameObject->Obj.magic, component->Obj.magic),
          }->Obj.magic
        },
        ~getAllComponentsFunc=(. state) => {
          JsObjTool.getObjValue(state, "gameObjectMeshRendererMap")
          ->Meta3dCommonlib.ImmutableSparseMap.getValues
          ->Obj.magic
        },
        (),
      ),
    )

    given(
      "create two gameObjects as g1, g2",
      () => {
        ()
      },
    )

    \"and"(
      "create two components as c1, c2",
      () => {
        let (d, component1) =
          MainTool.unsafeGetUsedComponentContribute(componentName)->MainTool.createComponent
        let (d, component2) = d->MainTool.createComponent

        c1 := component1
        c2 := component2
        usedContribute := d
      },
    )

    \"and"(
      "add c1 to g1",
      () => {
        usedContribute := usedContribute.contents->MainTool.addComponent(g1, c1.contents)
      },
    )

    \"and"(
      "add c2 to g2",
      () => {
        usedContribute := usedContribute.contents->MainTool.addComponent(g2, c2.contents)
      },
    )

    then(
      "get all components should return [c1, c2]",
      () => {
        MainTool.getAllComponents(usedContribute.contents)->expect == [c1.contents, c2.contents]
      },
    )
  })

  test(."get component's gameObjects", ({given, \"when", \"and", then}) => {
    let g1 = Obj.magic(10)
    let c1 = ref(Obj.magic(1))
    let componentName = "a1"

    _prepareRegister(given)

    _prepareComponent(
      \"when",
      \"and",
      ComponentTool.buildComponentContribute(
        ~componentName,
        ~createStateFunc=(. _) => {
          {
            "meshRendererGameObjectMap": Meta3dCommonlib.ImmutableSparseMap.createEmpty(),
          }->Obj.magic
        },
        ~createComponentFunc=(. state) => {
          let component = 1->Obj.magic

          (state, component)
        },
        ~addComponentFunc=(. state, gameObject, component) => {
          {
            "meshRendererGameObjectMap": JsObjTool.getObjValue(
              state,
              "meshRendererGameObjectMap",
            )->Meta3dCommonlib.ImmutableSparseMap.set(component->Obj.magic, gameObject->Obj.magic),
          }->Obj.magic
        },
        ~getGameObjectsFunc=(. state, component) => {
          [
            JsObjTool.getObjValue(state, "meshRendererGameObjectMap")
            ->Meta3dCommonlib.ImmutableSparseMap.get(component->Obj.magic)
            ->Meta3dCommonlib.OptionSt.getExn
            ->Obj.magic,
          ]
        },
        (),
      ),
    )

    given(
      "create a gameObject as g1",
      () => {
        ()
      },
    )

    \"and"(
      "create a component as c1",
      () => {
        let (d, component) =
          MainTool.unsafeGetUsedComponentContribute(componentName)->MainTool.createComponent

        c1 := component
        usedContribute := d
      },
    )

    \"and"(
      "add c1 to g1",
      () => {
        usedContribute := usedContribute.contents->MainTool.addComponent(g1, c1.contents)
      },
    )

    then(
      "get c1's gameObjects should return [g1]",
      () => {
        MainTool.getComponentGameObjects(usedContribute.contents, c1.contents)->expect == [g1]
      },
    )
  })

  test(."operate component's data", ({given, \"when", \"and", then}) => {
    let c1 = ref(Obj.magic(1))
    let componentName = "a1"

    _prepareRegister(given)

    _prepareComponent(
      \"when",
      \"and",
      ComponentTool.buildComponentContribute(
        ~componentName,
        ~createStateFunc=(. _) => {
          {
            "maxIndex": 0,
            "isRenderMap": Meta3dCommonlib.ImmutableHashMap.createEmpty(),
          }->Obj.magic
        },
        ~createComponentFunc=(. state) => {
          let component = JsObjTool.getObjValue(state, "maxIndex")

          (
            {
              "maxIndex": JsObjTool.getObjValue(state, "maxIndex")->succ,
              "isRenderMap": JsObjTool.getObjValue(
                state,
                "isRenderMap",
              )->Meta3dCommonlib.ImmutableHashMap.set(component, false),
            }->Obj.magic,
            component,
          )
        },
        ~getComponentDataFunc=(. state, component, dataName) => {
          switch dataName->Obj.magic {
          | "isRender" =>
            JsObjTool.getObjValue(state, "isRenderMap")
            ->Meta3dCommonlib.ImmutableHashMap.get(component->Obj.magic)
            ->Meta3dCommonlib.OptionSt.getExn
          }
        },
        ~setComponentDataFunc=(. state, component, dataName, dataValue) => {
          switch dataName->Obj.magic {
          | "isRender" =>
            {
              "maxIndex": JsObjTool.getObjValue(state, "maxIndex"),
              "isRenderMap": JsObjTool.getObjValue(
                state,
                "isRenderMap",
              )->Meta3dCommonlib.ImmutableHashMap.set(component->Obj.magic, dataValue),
            }->Obj.magic
          }
        },
        (),
      ),
    )

    \"and"(
      "create a component as c1",
      () => {
        let (d, component) =
          MainTool.unsafeGetUsedComponentContribute(componentName)->MainTool.createComponent

        c1 := component
        usedContribute := d
      },
    )

    \"when"(
      "set c1's data1",
      () => {
        usedContribute :=
          usedContribute.contents->MainTool.setComponentData(
            c1.contents,
            "isRender"->Obj.magic,
            true->Obj.magic,
          )
      },
    )

    then(
      "get c1's data1 should the setted data",
      () => {
        MainTool.getComponentData(usedContribute.contents, c1.contents, "isRender"->Obj.magic)
        ->Obj.magic
        ->expect == true
      },
    )
  })
})
