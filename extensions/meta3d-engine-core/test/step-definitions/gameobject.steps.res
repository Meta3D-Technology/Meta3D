open Meta3dBsJestCucumber
open Cucumber
open Expect
open Operators

let feature = loadFeature("./test/features/gameobject.feature")

defineFeature(feature, test => {
  let contribute = ref(Obj.magic(1))
  let transformContribute = ref(Obj.magic(1))
  let pbrMaterialContribute = ref(Obj.magic(1))
  let geometryContribute = ref(Obj.magic(1))
  let directionLightContribute = ref(Obj.magic(1))
  let arcballCameraControllerContribute = ref(Obj.magic(1))
  let basicCameraViewContribute = ref(Obj.magic(1))
  let perspectiveCameraProjectionContribute = ref(Obj.magic(1))
  let g1 = ref(Obj.magic(1))
  let t1 = ref(Obj.magic(1))
  let usedTransformContribute: ref<
    Meta3dEngineCoreProtocol.RegisterComponentType.usedComponentContribute,
  > = ref(Obj.magic(1))
  let transformName = Meta3dComponentTransformProtocol.Index.componentName
  let p1 = ref(Obj.magic(1))
  let usedPBRMaterialContribute: ref<
    Meta3dEngineCoreProtocol.RegisterComponentType.usedComponentContribute,
  > = ref(Obj.magic(1))
  let pbrMaterialName = Meta3dComponentPbrmaterialProtocol.Index.componentName
  let geo1 = ref(Obj.magic(1))
  let usedGeometryContribute: ref<
    Meta3dEngineCoreProtocol.RegisterComponentType.usedComponentContribute,
  > = ref(Obj.magic(1))
  let geometryName = Meta3dComponentGeometryProtocol.Index.componentName
  let d1 = ref(Obj.magic(1))
  let usedDirectionLightContribute: ref<
    Meta3dEngineCoreProtocol.RegisterComponentType.usedComponentContribute,
  > = ref(Obj.magic(1))
  let directionLightName = Meta3dComponentDirectionlightProtocol.Index.componentName
  let a1 = ref(Obj.magic(1))
  let usedArcballCameraControllerContribute: ref<
    Meta3dEngineCoreProtocol.RegisterComponentType.usedComponentContribute,
  > = ref(Obj.magic(1))
  let arcballCameraControllerName = Meta3dComponentArcballcameracontrollerProtocol.Index.componentName
  let b2 = ref(Obj.magic(1))
  let usedBasicCameraViewContribute: ref<
    Meta3dEngineCoreProtocol.RegisterComponentType.usedComponentContribute,
  > = ref(Obj.magic(1))
  let basicCameraViewName = Meta3dComponentBasiccameraviewProtocol.Index.componentName
  let pcp1 = ref(Obj.magic(1))
  let usedPerspectiveCameraProjectionContribute: ref<
    Meta3dEngineCoreProtocol.RegisterComponentType.usedComponentContribute,
  > = ref(Obj.magic(1))
  let perspectiveCameraProjectionName = Meta3dComponentPerspectivecameraprojectionProtocol.Index.componentName

  let _buildGameObjectData = (
    ~createStateFunc=(. config) => Obj.magic(1),
    ~createGameObjectFunc=(. state) => (state, Obj.magic(1)),
    ~getAllGameObjectsFunc=(. state) => [],
    ~getNeedDisposedGameObjectsFunc=(. state) => [],
    ~deferDisposeGameObjectFunc=(. state, _, gameObject) => state,
    ~disposeGameObjectsFunc=(. states, _, gameObjects) => states,
    ~cloneGameObjectFunc=(. states, _, _, _, _) => (states, []),
    (),
  ): Meta3dEngineCoreProtocol.GameObjectType.gameObjectContribute => {
    createStateFunc: createStateFunc,
    createGameObjectFunc: createGameObjectFunc,
    getAllGameObjectsFunc: getAllGameObjectsFunc,
    getNeedDisposedGameObjectsFunc: getNeedDisposedGameObjectsFunc,
    deferDisposeGameObjectFunc: deferDisposeGameObjectFunc,
    disposeGameObjectsFunc: disposeGameObjectsFunc,
    cloneGameObjectFunc: cloneGameObjectFunc,
  }

  let _prepare = (given, \"when", \"and", c) => {
    given("prepare register", () => {
      CreateState.createState()->StateContainer.setState
    })

    \"when"("set gameObject contribute", () => {
      contribute := c

      MainTool.setGameObjectContribute(contribute.contents)
    })

    \"and"("create and set the gameObject state", () => {
      MainTool.createAndSetGameObjectState(Obj.magic(1))
    })
  }

  test(."create a gameObject", ({given, \"when", \"and", then}) => {
    _prepare(
      given,
      \"when",
      \"and",
      _buildGameObjectData(
        ~createStateFunc=(. config) => {
          {
            "maxUID": 0,
            "config": config,
          }->Obj.magic
        },
        ~createGameObjectFunc=(. state) => {
          let gameObject = JsObjTool.getObjValue(state, "maxUID")

          (
            {
              "maxUID": JsObjTool.getObjValue(state, "maxUID")->succ,
            }->Obj.magic,
            gameObject,
          )
        },
        ~getAllGameObjectsFunc=(. state) => {
          Meta3dCommonlib.ArraySt.range(0, JsObjTool.getObjValue(state, "maxUID") - 1)->Obj.magic
        },
        (),
      ),
    )

    then("createGameObject should create a gameObject", () => {
      MainTool.createGameObject()->expect == 0
    })
  })

  test(."get all gameObjects", ({given, \"when", \"and", then}) => {
    let allGameObjects = []

    _prepare(
      given,
      \"when",
      \"and",
      _buildGameObjectData(
        ~createStateFunc=(. config) => {
          {
            "maxUID": 0,
            "config": config,
          }->Obj.magic
        },
        ~createGameObjectFunc=(. state) => {
          let gameObject = JsObjTool.getObjValue(state, "maxUID")

          (
            {
              "maxUID": JsObjTool.getObjValue(state, "maxUID")->succ,
            }->Obj.magic,
            gameObject,
          )
        },
        ~getAllGameObjectsFunc=(. state) => {
          Meta3dCommonlib.ArraySt.range(0, JsObjTool.getObjValue(state, "maxUID") - 1)->Obj.magic
        },
        (),
      ),
    )

    \"when"("create two gameObjects", () => {
      allGameObjects
      ->Meta3dCommonlib.ArraySt.push(MainTool.createGameObject())
      ->Meta3dCommonlib.ArraySt.push(MainTool.createGameObject())
      ->ignore
    })

    then("getAllGameObjects should return them", () => {
      MainTool.getAllGameObjects()->expect == allGameObjects
    })
  })

  let _buildComponentContribute = componentName => {
    ComponentTool.buildComponentContribute(
      ~componentName,
      ~createComponentFunc=(. state) => {
        let component = JsObjTool.getObjValue(state, "index")->Obj.magic

        (JsObjTool.setObjValue(state, "index", component + 1), component)
      },
      ~createStateFunc=(. _) => {
        {
          "index": 0,
          "needDisposeArray": [],
          "disposedArray": [],
          "cloneDataArray": [],
        }->Obj.magic
      },
      ~deferDisposeComponentFunc=(. state, (component, _)) => {
        {
          "needDisposeArray": JsObjTool.getObjValue(
            state,
            "needDisposeArray",
          )->Meta3dCommonlib.ArraySt.push(component),
        }->Obj.magic
      },
      ~disposeComponentsFunc=(. state, batchDisposeData) => {
        {
          "disposedArray": JsObjTool.getObjValue(state, "disposedArray")->Js.Array.concat(
            batchDisposeData->Obj.magic,
          ),
        }->Obj.magic
      },
      ~cloneComponentFunc=(. state, countRange, cloneConfig, component) => {
        (
          {
            "cloneDataArray": JsObjTool.getObjValue(state, "cloneDataArray")->Js.Array.concat(
              [(countRange, cloneConfig, component)]->Obj.magic,
            ),
          },
          [],
        )->Obj.magic
      },
      (),
    )
  }

  let _prepareComponentsAndCreate = (\"when", \"and") => {
    let transformC = _buildComponentContribute(transformName)
    let pbrMaterialC = _buildComponentContribute(pbrMaterialName)
    let geometryC = _buildComponentContribute(geometryName)
    let directionLightC = _buildComponentContribute(directionLightName)
    let arcballCameraControllerC = _buildComponentContribute(arcballCameraControllerName)
    let basicCameraViewC = _buildComponentContribute(basicCameraViewName)
    let perspectiveCameraProjectionC = _buildComponentContribute(perspectiveCameraProjectionName)

    \"when"("register transform contribute", () => {
      transformContribute := transformC

      MainTool.registerComponent(transformContribute.contents)
    })

    \"and"("create and set transform state", () => {
      MainTool.createAndSetComponentState(transformC.componentName, Obj.magic(1))
    })

    \"and"("register pbrMaterial contribute", () => {
      pbrMaterialContribute := pbrMaterialC

      MainTool.registerComponent(pbrMaterialContribute.contents)
    })

    \"and"("create and set pbrMaterial state", () => {
      MainTool.createAndSetComponentState(pbrMaterialC.componentName, Obj.magic(1))
    })

    \"and"("register geometry contribute", () => {
      geometryContribute := geometryC

      MainTool.registerComponent(geometryContribute.contents)
    })

    \"and"("create and set geometry state", () => {
      MainTool.createAndSetComponentState(geometryC.componentName, Obj.magic(1))
    })

    \"and"("register arcballCameraController contribute", () => {
      arcballCameraControllerContribute := arcballCameraControllerC

      MainTool.registerComponent(arcballCameraControllerContribute.contents)
    })

    \"and"("create and set arcballCameraController state", () => {
      MainTool.createAndSetComponentState(arcballCameraControllerC.componentName, Obj.magic(1))
    })

    \"and"("register basicCameraView contribute", () => {
      basicCameraViewContribute := basicCameraViewC

      MainTool.registerComponent(basicCameraViewContribute.contents)
    })

    \"and"("create and set basicCameraView state", () => {
      MainTool.createAndSetComponentState(basicCameraViewC.componentName, Obj.magic(1))
    })

    \"and"("register perspectiveCameraProjection contribute", () => {
      perspectiveCameraProjectionContribute := perspectiveCameraProjectionC

      MainTool.registerComponent(perspectiveCameraProjectionContribute.contents)
    })

    \"and"("create and set perspectiveCameraProjection state", () => {
      MainTool.createAndSetComponentState(perspectiveCameraProjectionC.componentName, Obj.magic(1))
    })

    \"and"("register directionLight contribute", () => {
      directionLightContribute := directionLightC

      MainTool.registerComponent(directionLightContribute.contents)
    })

    \"and"("create and set directionLight state", () => {
      MainTool.createAndSetComponentState(directionLightC.componentName, Obj.magic(1))
    })

    \"and"("create a gameObject as g1", () => {
      g1 := MainTool.createGameObject()
    })

    \"and"("create a transform as t1", () => {
      let (d, transform) =
        MainTool.unsafeGetUsedComponentContribute(transformName)->MainTool.createComponent

      t1 := transform
      usedTransformContribute := d
    })

    \"and"("create a pbrMaterial as p1", () => {
      let (d, component) =
        MainTool.unsafeGetUsedComponentContribute(pbrMaterialName)->MainTool.createComponent

      p1 := component
      usedPBRMaterialContribute := d
    })

    \"and"("create a geometry as geo1", () => {
      let (d, component) =
        MainTool.unsafeGetUsedComponentContribute(geometryName)->MainTool.createComponent

      geo1 := component
      usedGeometryContribute := d
    })

    \"and"("create a arcballCameraController as a1", () => {
      let (d, component) =
        MainTool.unsafeGetUsedComponentContribute(
          arcballCameraControllerName,
        )->MainTool.createComponent

      a1 := component
      usedArcballCameraControllerContribute := d
    })

    \"and"("create two basicCameraViews as b1, b2", () => {
      let (d, component1) =
        MainTool.unsafeGetUsedComponentContribute(basicCameraViewName)->MainTool.createComponent
      let (d, component2) = d->MainTool.createComponent

      b2 := component2
      usedBasicCameraViewContribute := d
    })

    \"and"("create a perspectiveCameraProjection as pcp1", () => {
      let (d, component) =
        MainTool.unsafeGetUsedComponentContribute(
          perspectiveCameraProjectionName,
        )->MainTool.createComponent

      pcp1 := component
      usedPerspectiveCameraProjectionContribute := d
    })

    \"and"("create a directionLight as d1", () => {
      let (d, component) =
        MainTool.unsafeGetUsedComponentContribute(directionLightName)->MainTool.createComponent

      d1 := component
      usedDirectionLightContribute := d
    })

    \"and"("add t1 to g1", () => {
      ()
    })

    \"and"("add p1 to g1", () => {
      ()
    })

    \"and"("add geo1 to g1", () => {
      ()
    })

    \"and"("add a1 to g1", () => {
      ()
    })

    \"and"("add b2 to g1", () => {
      ()
    })

    \"and"("add pcp1 to g1", () => {
      ()
    })

    \"and"("add d1 to g1", () => {
      ()
    })
  }

  test(."defer dispose gameObject", ({given, \"and", \"when", then}) => {
    _prepare(
      given,
      \"when",
      \"and",
      _buildGameObjectData(
        ~createStateFunc=(. config) => {
          {
            "needDisposeArray": [],
          }->Obj.magic
        },
        ~createGameObjectFunc=(. state) => {
          (state, 1->Obj.magic)
        },
        ~deferDisposeGameObjectFunc=(.
          (
            gameObjectState,
            transformState,
            pbrMaterialState,
            geometryState,
            directionLightState,
            arcballCameraControllerState,
            basicCameraViewState,
            perspectiveCameraProjectionState,
          ),
          (
            (_, deferDisposeTransformFunc),
            (_, deferDisposePBRMaterialFunc),
            (_, deferDisposeGeometryFunc),
            (_, deferDisposeDirectionLightFunc),
            (_, deferDisposeArcballCameraControllerFunc),
            (_, deferDisposeBasicCameraViewFunc),
            (_, deferDisposePerspectiveCameraProjectionFunc),
          ),
          gameObject,
        ) => {
          let transformState = deferDisposeTransformFunc(.
            transformState,
            Meta3dCommonlib.DeferDisposeTool.buildDeferDisposeData(t1.contents),
          )
          let pbrMaterialState = deferDisposePBRMaterialFunc(.
            pbrMaterialState,
            Meta3dCommonlib.DeferDisposeTool.buildDeferDisposeData(p1.contents),
          )
          let geometryState = deferDisposeGeometryFunc(.
            geometryState,
            Meta3dCommonlib.DeferDisposeTool.buildDeferDisposeData(geo1.contents),
          )
          let directionLightState = deferDisposeDirectionLightFunc(.
            directionLightState,
            Meta3dCommonlib.DeferDisposeTool.buildDeferDisposeData(d1.contents),
          )
          let arcballCameraControllerState = deferDisposeArcballCameraControllerFunc(.
            arcballCameraControllerState,
            Meta3dCommonlib.DeferDisposeTool.buildDeferDisposeData(a1.contents),
          )
          let basicCameraViewState = deferDisposeBasicCameraViewFunc(.
            basicCameraViewState,
            Meta3dCommonlib.DeferDisposeTool.buildDeferDisposeData(b2.contents),
          )
          let perspectiveCameraProjectionState = deferDisposePerspectiveCameraProjectionFunc(.
            perspectiveCameraProjectionState,
            Meta3dCommonlib.DeferDisposeTool.buildDeferDisposeData(pcp1.contents),
          )

          (
            {
              "needDisposeArray": JsObjTool.getObjValue(
                gameObjectState,
                "needDisposeArray",
              )->Meta3dCommonlib.ArraySt.push(gameObject),
            }->Obj.magic,
            transformState,
            pbrMaterialState,
            geometryState,
            directionLightState,
            arcballCameraControllerState,
            basicCameraViewState,
            perspectiveCameraProjectionState,
          )
        },
        (),
      ),
    )

    _prepareComponentsAndCreate(\"when", \"and")

    \"when"("defer dispose g1", () => {
      MainTool.deferDisposeGameObject(g1.contents)
    })

    then("mark g1 as need dispose", () => {
      JsObjTool.getObjValue(MainTool.getGameObjectState(), "needDisposeArray")
      ->Js.Array.includes(g1.contents, _)
      ->expect == true
    })

    \"and"("mark t1 as need dispose", () => {
      JsObjTool.getObjValue(MainTool.getComponentState(transformName), "needDisposeArray")
      ->Js.Array.includes(t1.contents, _)
      ->expect == true
    })

    \"and"("mark p1 as need dispose", () => {
      JsObjTool.getObjValue(MainTool.getComponentState(pbrMaterialName), "needDisposeArray")
      ->Js.Array.includes(p1.contents, _)
      ->expect == true
    })

    \"and"("mark geo1 as need dispose", () => {
      JsObjTool.getObjValue(MainTool.getComponentState(geometryName), "needDisposeArray")
      ->Js.Array.includes(geo1.contents, _)
      ->expect == true
    })

    \"and"("mark a1 as need dispose", () => {
      JsObjTool.getObjValue(
        MainTool.getComponentState(arcballCameraControllerName),
        "needDisposeArray",
      )
      ->Js.Array.includes(a1.contents, _)
      ->expect == true
    })

    \"and"("mark b2 as need dispose", () => {
      JsObjTool.getObjValue(MainTool.getComponentState(basicCameraViewName), "needDisposeArray")
      ->Js.Array.includes(b2.contents, _)
      ->expect == true
    })

    \"and"("mark pcp1 as need dispose", () => {
      JsObjTool.getObjValue(
        MainTool.getComponentState(perspectiveCameraProjectionName),
        "needDisposeArray",
      )
      ->Js.Array.includes(pcp1.contents, _)
      ->expect == true
    })

    \"and"("mark d1 as need dispose", () => {
      JsObjTool.getObjValue(MainTool.getComponentState(directionLightName), "needDisposeArray")
      ->Js.Array.includes(d1.contents, _)
      ->expect == true
    })
  })

  test(."get need disposed gameObjects", ({given, \"when", \"and", then}) => {
    _prepare(
      given,
      \"when",
      \"and",
      _buildGameObjectData(
        ~createStateFunc=(. config) => {
          {
            "needDisposeArray": [],
          }->Obj.magic
        },
        ~createGameObjectFunc=(. state) => {
          (state, 1->Obj.magic)
        },
        ~getNeedDisposedGameObjectsFunc=(. state) => {
          JsObjTool.getObjValue(state, "needDisposeArray")
        },
        ~deferDisposeGameObjectFunc=(.
          (
            gameObjectState,
            transformState,
            pbrMaterialState,
            geometryState,
            directionLightState,
            arcballCameraControllerState,
            basicCameraViewState,
            perspectiveCameraProjectionState,
          ),
          _,
          gameObject,
        ) => {
          (
            {
              "needDisposeArray": JsObjTool.getObjValue(
                gameObjectState,
                "needDisposeArray",
              )->Meta3dCommonlib.ArraySt.push(gameObject),
            }->Obj.magic,
            transformState,
            pbrMaterialState,
            geometryState,
            directionLightState,
            arcballCameraControllerState,
            basicCameraViewState,
            perspectiveCameraProjectionState,
          )
        },
        (),
      ),
    )

    _prepareComponentsAndCreate(\"when", \"and")

    \"when"("defer dispose g1", () => {
      MainTool.deferDisposeGameObject(g1.contents)
    })

    then("get need disposed gameObjects should return them", () => {
      MainTool.getNeedDisposedGameObjects()->expect == [g1.contents]
    })
  })

  test(."dispose gameObjects", ({given, \"and", \"when", then}) => {
    let _buildSharedComponentBatchDisposeData = component => {
      Meta3dCommonlib.MutableSparseMap.createEmpty()->Meta3dCommonlib.MutableSparseMap.set(
        component,
        [],
      )
    }
    let _buildNotSharedComponentBatchDisposeData = component => {
      [component]
    }

    _prepare(
      given,
      \"when",
      \"and",
      _buildGameObjectData(
        ~createStateFunc=(. config) => {
          {
            "disposedArray": [],
          }->Obj.magic
        },
        ~createGameObjectFunc=(. state) => {
          (state, 1->Obj.magic)
        },
        ~disposeGameObjectsFunc=(.
          (
            gameObjectState,
            transformState,
            pbrMaterialState,
            geometryState,
            directionLightState,
            arcballCameraControllerState,
            basicCameraViewState,
            perspectiveCameraProjectionState,
          ),
          (
            (_, disposeTransformsFunc),
            (_, disposePBRMaterialsFunc),
            (_, disposeGeometrysFunc),
            (_, disposeDirectionLightFunc),
            (_, disposeArcballCameraControllerFunc),
            (_, disposeBasicCameraViewFunc),
            (_, disposePerspectiveCameraProjectionFunc),
          ),
          gameObjects,
        ) => {
          let transformState = disposeTransformsFunc(. transformState, [t1.contents])
          let pbrMaterialState = disposePBRMaterialsFunc(.
            pbrMaterialState,
            _buildSharedComponentBatchDisposeData(p1.contents),
          )
          let geometryState = disposeGeometrysFunc(.
            geometryState,
            _buildSharedComponentBatchDisposeData(geo1.contents),
          )
          let directionLightState = disposeDirectionLightFunc(. directionLightState, [d1.contents])
          let arcballCameraControllerState = disposeArcballCameraControllerFunc(.
            arcballCameraControllerState,
            [a1.contents],
          )
          let basicCameraViewState = disposeBasicCameraViewFunc(.
            basicCameraViewState,
            [b2.contents],
          )
          let perspectiveCameraProjectionState = disposePerspectiveCameraProjectionFunc(.
            perspectiveCameraProjectionState,
            [pcp1.contents],
          )

          (
            {
              "disposedArray": JsObjTool.getObjValue(
                gameObjectState,
                "disposedArray",
              )->Js.Array.concat(gameObjects, _),
            }->Obj.magic,
            transformState,
            pbrMaterialState,
            geometryState,
            directionLightState,
            arcballCameraControllerState,
            basicCameraViewState,
            perspectiveCameraProjectionState,
          )
        },
        (),
      ),
    )

    _prepareComponentsAndCreate(\"when", \"and")

    \"when"("dispose [g1]", () => {
      MainTool.disposeGameObjects([g1.contents])
    })

    then("mark g1 as disposed", () => {
      JsObjTool.getObjValue(MainTool.getGameObjectState(), "disposedArray")
      ->Js.Array.includes(g1.contents, _)
      ->expect == true
    })

    \"and"("mark t1 as disposed", () => {
      JsObjTool.getObjValue(MainTool.getComponentState(transformName), "disposedArray")->expect ==
        _buildNotSharedComponentBatchDisposeData(t1.contents)
    })

    \"and"("mark p1 as disposed", () => {
      JsObjTool.getObjValue(MainTool.getComponentState(pbrMaterialName), "disposedArray")->expect ==
        _buildSharedComponentBatchDisposeData(p1.contents)
    })

    \"and"("mark geo1 as disposed", () => {
      JsObjTool.getObjValue(MainTool.getComponentState(geometryName), "disposedArray")->expect ==
        _buildSharedComponentBatchDisposeData(geo1.contents)
    })

    \"and"("mark a1 as disposed", () => {
      JsObjTool.getObjValue(
        MainTool.getComponentState(arcballCameraControllerName),
        "disposedArray",
      )->expect == _buildNotSharedComponentBatchDisposeData(a1.contents)
    })

    \"and"("mark b2 as disposed", () => {
      JsObjTool.getObjValue(
        MainTool.getComponentState(basicCameraViewName),
        "disposedArray",
      )->expect == _buildNotSharedComponentBatchDisposeData(b2.contents)
    })

    \"and"("mark pcp1 as disposed", () => {
      JsObjTool.getObjValue(
        MainTool.getComponentState(perspectiveCameraProjectionName),
        "disposedArray",
      )->expect == _buildNotSharedComponentBatchDisposeData(pcp1.contents)
    })

    \"and"("mark d1 as disposed", () => {
      JsObjTool.getObjValue(
        MainTool.getComponentState(directionLightName),
        "disposedArray",
      )->expect == _buildNotSharedComponentBatchDisposeData(d1.contents)
    })
  })

  test(."clone gameObject", ({given, \"and", \"when", then}) => {
    _prepare(
      given,
      \"when",
      \"and",
      _buildGameObjectData(
        ~createStateFunc=(. config) => {
          {
            "cloneDataArray": [],
          }->Obj.magic
        },
        ~createGameObjectFunc=(. state) => {
          (state, 1->Obj.magic)
        },
        ~cloneGameObjectFunc=(.
          (
            gameObjectState,
            transformState,
            pbrMaterialState,
            geometryState,
            directionLightState,
            arcballCameraControllerState,
            basicCameraViewState,
            perspectiveCameraProjectionState,
          ),
          (
            (_, cloneTransformFunc, _, _, _, _),
            (_, clonePBRMaterialFunc, _),
            (_, cloneGeometryFunc, _),
            (_, cloneDirectionLightFunc, _),
            (_, cloneArcballCameraControllerFunc, _),
            (_, cloneBasicCameraViewFunc, _),
            (_, clonePerspectiveCameraProjectionFunc, _),
          ),
          count,
          cloneConfig,
          sourceGameObject,
        ) => {
          let (transformState, _) = cloneTransformFunc(.
            transformState,
            Meta3dCommonlib.CloneTool.buildCountRange(count),
            (),
            t1.contents,
          )
          let (pbrMaterialState, _) = clonePBRMaterialFunc(.
            pbrMaterialState,
            Meta3dCommonlib.CloneTool.buildCountRange(count),
            (
              {
                isShare: cloneConfig.isShareMaterial,
              }: Meta3dComponentPbrmaterialProtocol.Index.cloneConfig
            ),
            p1.contents,
          )
          let (geometryState, _) = cloneGeometryFunc(.
            geometryState,
            Meta3dCommonlib.CloneTool.buildCountRange(count),
            (),
            geo1.contents,
          )
          let (directionLightState, _) = cloneDirectionLightFunc(.
            directionLightState,
            Meta3dCommonlib.CloneTool.buildCountRange(count),
            (),
            d1.contents,
          )
          let (arcballCameraControllerState, _) = cloneArcballCameraControllerFunc(.
            arcballCameraControllerState,
            Meta3dCommonlib.CloneTool.buildCountRange(count),
            (),
            a1.contents,
          )
          let (basicCameraViewState, _) = cloneBasicCameraViewFunc(.
            basicCameraViewState,
            Meta3dCommonlib.CloneTool.buildCountRange(count),
            (),
            b2.contents,
          )
          let (perspectiveCameraProjectionState, _) = clonePerspectiveCameraProjectionFunc(.
            perspectiveCameraProjectionState,
            Meta3dCommonlib.CloneTool.buildCountRange(count),
            (),
            pcp1.contents,
          )

          (
            (
              {
                "cloneDataArray": JsObjTool.getObjValue(
                  gameObjectState,
                  "cloneDataArray",
                )->Js.Array.concat([sourceGameObject], _),
              }->Obj.magic,
              transformState,
              pbrMaterialState,
              geometryState,
              directionLightState,
              arcballCameraControllerState,
              basicCameraViewState,
              perspectiveCameraProjectionState,
            ),
            [],
          )
        },
        (),
      ),
    )

    _prepareComponentsAndCreate(\"when", \"and")

    \"when"("clone 2 gameObjects of g1", () => {
      MainTool.cloneGameObject(2, {isShareMaterial: true}, g1.contents)->ignore
    })

    then("mark g1 as cloned", () => {
      JsObjTool.getObjValue(MainTool.getGameObjectState(), "cloneDataArray")
      ->Js.Array.includes(g1.contents, _)
      ->expect == true
    })

    \"and"("mark t1 as cloned", () => {
      JsObjTool.getObjValue(MainTool.getComponentState(transformName), "cloneDataArray")
      ->Array.unsafe_get(0)
      ->expect == ([0, 1], (), t1.contents)
    })

    \"and"("mark p1 as cloned", () => {
      JsObjTool.getObjValue(MainTool.getComponentState(pbrMaterialName), "cloneDataArray")
      ->Array.unsafe_get(0)
      ->expect ==
        (
          [0, 1],
          ({isShare: true}: Meta3dComponentPbrmaterialProtocol.Index.cloneConfig),
          p1.contents,
        )
    })

    \"and"("mark geo1 as cloned", () => {
      JsObjTool.getObjValue(MainTool.getComponentState(geometryName), "cloneDataArray")
      ->Array.unsafe_get(0)
      ->expect == ([0, 1], (), geo1.contents)
    })

    \"and"("mark a1 as cloned", () => {
      JsObjTool.getObjValue(
        MainTool.getComponentState(arcballCameraControllerName),
        "cloneDataArray",
      )
      ->Array.unsafe_get(0)
      ->expect == ([0, 1], (), a1.contents)
    })

    \"and"("mark b2 as cloned", () => {
      JsObjTool.getObjValue(MainTool.getComponentState(basicCameraViewName), "cloneDataArray")
      ->Array.unsafe_get(0)
      ->expect == ([0, 1], (), b2.contents)
    })

    \"and"("mark pcp1 as cloned", () => {
      JsObjTool.getObjValue(
        MainTool.getComponentState(perspectiveCameraProjectionName),
        "cloneDataArray",
      )
      ->Array.unsafe_get(0)
      ->expect == ([0, 1], (), pcp1.contents)
    })

    \"and"("mark d1 as cloned", () => {
      JsObjTool.getObjValue(MainTool.getComponentState(directionLightName), "cloneDataArray")
      ->Array.unsafe_get(0)
      ->expect == ([0, 1], (), d1.contents)
    })
  })
})
