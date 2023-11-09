open Meta3dBsJestCucumber
open Cucumber
open Expect
open Operators

open Js.Typed_array

let feature = loadFeature("./test/features/batch_dispose_after_defer_dispose.feature")

defineFeature(feature, test => {
  let contribute: ref<
    Meta3dEngineCoreProtocol.ComponentContributeType.componentContribute<
      StateType.state,
      Meta3dComponentGeometryProtocol.Index.config,
      Meta3dComponentGeometryProtocol.Index.needDisposedComponents,
      Meta3dComponentGeometryProtocol.Index.batchDisposeData,
      Meta3dComponentGeometryProtocol.Index.cloneConfig,
      Meta3dComponentGeometryProtocol.Index.geometry,
    >,
  > = ref(Obj.magic(1))
  let state = ref(Obj.magic(1))
  let geometry1 = ref(Obj.magic(1))
  let geometry2 = ref(Obj.magic(2))

  let _getContributeAndCreateAState = ((given, \"and")) => {
    given("I get contribute", () => {
      contribute := MainTool.getContribute()
    })

    \"and"("create a state", () => {
      state := StateTool.createState(~contribute=contribute.contents, ())
    })
  }

  test(."if not dispose geometry from all gameObjects, not dispose geometry\'s data", ({
    given,
    \"and",
    \"when",
    then,
  }) => {
    let gameObject1 = 10
    let gameObject2 = 11
    let gameObject3 = 12
    let geometry1 = ref(Obj.magic(1))
    let v1 = Float32Array.make([1., 2., 3.])

    _getContributeAndCreateAState((given, \"and"))

    given(
      %re("/^create three gameObjects as g(\d+), g(\d+), g(\d+)$/")->Obj.magic,
      () => {
        ()
      },
    )

    \"and"(
      "create a geometry",
      () => {
        let (s, m) = contribute.contents.createComponentFunc(. state.contents)

        state := s
        geometry1 := m
      },
    )

    \"and"(
      %re("/^set geometry's vertices to v(\d+)$/")->Obj.magic,
      () => {
        state :=
          contribute.contents.setComponentDataFunc(.
            state.contents,
            geometry1.contents,
            Meta3dComponentGeometryProtocol.Index.dataName.vertices,
            v1->Obj.magic,
          )
      },
    )

    \"and"(
      %re("/^add the geometry to g(\d+)$/")->Obj.magic,
      () => {
        state :=
          contribute.contents.addComponentFunc(. state.contents, gameObject1, geometry1.contents)
      },
    )

    \"and"(
      %re("/^add the geometry to g(\d+)$/")->Obj.magic,
      () => {
        state :=
          contribute.contents.addComponentFunc(. state.contents, gameObject2, geometry1.contents)
      },
    )

    \"and"(
      %re("/^add the geometry to g(\d+)$/")->Obj.magic,
      () => {
        state :=
          contribute.contents.addComponentFunc(. state.contents, gameObject3, geometry1.contents)
      },
    )

    given(
      %re("/^defer dispose the geometry from g(\d+)$/")->Obj.magic,
      () => {
        state :=
          contribute.contents.deferDisposeComponentFunc(.
            state.contents,
            (geometry1.contents, gameObject1),
          )
      },
    )

    \"when"(
      "dispose the need disposed geometrys",
      () => {
        let (state_, _) = contribute.contents.disposeComponentsFunc(.
          state.contents,
          contribute.contents.getNeedDisposedComponentsFunc(. state.contents),
        )
        state := state_
      },
    )

    then(
      %re("/^get the geometry's vertices should return v(\d+)$/")->Obj.magic,
      () => {
        contribute.contents.getComponentDataFunc(.
          state.contents,
          geometry1.contents,
          Meta3dComponentGeometryProtocol.Index.dataName.vertices,
        )->expect == v1
      },
    )
  })

  test(."else, dispose geometry\'s data", ({given, \"and", \"when", then}) => {
    let gameObject1 = 10
    let gameObject2 = 11
    let gameObject3 = 12
    let geometry1 = ref(Obj.magic(1))
    let v1 = Float32Array.make([1., 2., 3.])

    _getContributeAndCreateAState((given, \"and"))

    given(
      %re("/^create three gameObjects as g(\d+), g(\d+), g(\d+)$/")->Obj.magic,
      () => {
        ()
      },
    )

    \"and"(
      "create a geometry",
      () => {
        let (s, m) = contribute.contents.createComponentFunc(. state.contents)

        state := s
        geometry1 := m
      },
    )

    \"and"(
      %re("/^set geometry's vertices to v(\d+)$/")->Obj.magic,
      () => {
        state :=
          contribute.contents.setComponentDataFunc(.
            state.contents,
            geometry1.contents,
            Meta3dComponentGeometryProtocol.Index.dataName.vertices,
            v1->Obj.magic,
          )
      },
    )

    \"and"(
      %re("/^add the geometry to g(\d+)$/")->Obj.magic,
      () => {
        state :=
          contribute.contents.addComponentFunc(. state.contents, gameObject1, geometry1.contents)
      },
    )

    \"and"(
      %re("/^add the geometry to g(\d+)$/")->Obj.magic,
      () => {
        state :=
          contribute.contents.addComponentFunc(. state.contents, gameObject2, geometry1.contents)
      },
    )

    \"and"(
      %re("/^add the geometry to g(\d+)$/")->Obj.magic,
      () => {
        state :=
          contribute.contents.addComponentFunc(. state.contents, gameObject3, geometry1.contents)
      },
    )

    given(
      "defer dispose the geometry from g1, g2, g3",
      () => {
        state :=
          contribute.contents.deferDisposeComponentFunc(.
            state.contents,
            (geometry1.contents, gameObject1),
          )
        state :=
          contribute.contents.deferDisposeComponentFunc(.
            state.contents,
            (geometry1.contents, gameObject2),
          )
        state :=
          contribute.contents.deferDisposeComponentFunc(.
            state.contents,
            (geometry1.contents, gameObject3),
          )
      },
    )

    \"when"(
      "dispose the need disposed geometrys",
      () => {
        let (state_, _) = contribute.contents.disposeComponentsFunc(.
          state.contents,
          contribute.contents.getNeedDisposedComponentsFunc(. state.contents),
        )
        state := state_
      },
    )

    then(
      "get the geometry's vertices should return []",
      () => {
        contribute.contents.getComponentDataFunc(.
          state.contents,
          geometry1.contents,
          Meta3dComponentGeometryProtocol.Index.dataName.vertices,
        )->expect == Float32Array.make([])
      },
    )
  })

  test(."remove from gameObjectMap, gameObjectGeometryMap", ({given, \"and", \"when", then}) => {
    let gameObject1 = 10
    let geometry1 = ref(Obj.magic(1))
    let v1 = Float32Array.make([1., 2., 3.])

    _getContributeAndCreateAState((given, \"and"))

    given(
      "create a gameObject",
      () => {
        ()
      },
    )

    \"and"(
      "create a geometry",
      () => {
        let (s, m) = contribute.contents.createComponentFunc(. state.contents)

        state := s
        geometry1 := m
      },
    )

    \"and"(
      "add the geometry to the gameObject",
      () => {
        state :=
          contribute.contents.addComponentFunc(. state.contents, gameObject1, geometry1.contents)
      },
    )

    \"and"(
      "defer dispose the geometry from the gameObject",
      () => {
        state :=
          contribute.contents.deferDisposeComponentFunc(.
            state.contents,
            (geometry1.contents, gameObject1),
          )
      },
    )

    \"when"(
      "dispose the need disposed geometrys",
      () => {
        let (state_, _) = contribute.contents.disposeComponentsFunc(.
          state.contents,
          contribute.contents.getNeedDisposedComponentsFunc(. state.contents),
        )
        state := state_
      },
    )

    then(
      "get the geometry's gameObjects should return []",
      () => {
        contribute.contents.getGameObjectsFunc(. state.contents, geometry1.contents)->expect == []
      },
    )

    \"and"(
      "get the gameObject's geometry should return empty",
      () => {
        contribute.contents.getComponentFunc(. state.contents, gameObject1)->expect ==
          Js.Nullable.null
      },
    )
  })

  test(."reset point data's info instead of reset point data directly", ({
    given,
    \"and",
    \"when",
    then,
  }) => {
    let gameObject1 = 10
    let geometry1 = ref(Obj.magic(1))
    let v1 = Float32Array.make([1., 2., 3.])
    let n1 = Float32Array.make([-1., 2., 4.])
    let t1 = Float32Array.make([1., 0.])
    let i1 = Uint32Array.make([3, 1, 2])

    _getContributeAndCreateAState((given, \"and"))

    given(
      "create a gameObject",
      () => {
        ()
      },
    )

    \"and"(
      "create a geometry",
      () => {
        let (s, m) = contribute.contents.createComponentFunc(. state.contents)

        state := s
        geometry1 := m
      },
    )

    \"and"(
      "add the geometry to the gameObject",
      () => {
        state :=
          contribute.contents.addComponentFunc(. state.contents, gameObject1, geometry1.contents)
      },
    )

    \"and"(
      "set the geometry's vertices to v1",
      () => {
        state :=
          contribute.contents.setComponentDataFunc(.
            state.contents,
            geometry1.contents,
            Meta3dComponentGeometryProtocol.Index.dataName.vertices,
            v1->Obj.magic,
          )
      },
    )

    \"and"(
      "set the geometry's normals to n1",
      () => {
        state :=
          contribute.contents.setComponentDataFunc(.
            state.contents,
            geometry1.contents,
            Meta3dComponentGeometryProtocol.Index.dataName.normals,
            n1->Obj.magic,
          )
      },
    )

    \"and"(
      "set the geometry's texCoords to t1",
      () => {
        state :=
          contribute.contents.setComponentDataFunc(.
            state.contents,
            geometry1.contents,
            Meta3dComponentGeometryProtocol.Index.dataName.texCoords,
            t1->Obj.magic,
          )
      },
    )

    \"and"(
      "set the geometry's indices to i1",
      () => {
        state :=
          contribute.contents.setComponentDataFunc(.
            state.contents,
            geometry1.contents,
            Meta3dComponentGeometryProtocol.Index.dataName.indices,
            i1->Obj.magic,
          )
      },
    )

    \"and"(
      "defer dispose the geometry from the gameObject",
      () => {
        state :=
          contribute.contents.deferDisposeComponentFunc(.
            state.contents,
            (geometry1.contents, gameObject1),
          )
      },
    )

    \"when"(
      "dispose the need disposed geometrys",
      () => {
        let (state_, _) = contribute.contents.disposeComponentsFunc(.
          state.contents,
          contribute.contents.getNeedDisposedComponentsFunc(. state.contents),
        )
        state := state_
      },
    )

    then(
      "get the geometry's vertices, normals, texCoords, indices should all return []",
      () => {
        (
          contribute.contents.getComponentDataFunc(.
            state.contents,
            geometry1.contents,
            Meta3dComponentGeometryProtocol.Index.dataName.vertices,
          ),
          contribute.contents.getComponentDataFunc(.
            state.contents,
            geometry1.contents,
            Meta3dComponentGeometryProtocol.Index.dataName.normals,
          ),
          contribute.contents.getComponentDataFunc(.
            state.contents,
            geometry1.contents,
            Meta3dComponentGeometryProtocol.Index.dataName.texCoords,
          ),
          contribute.contents.getComponentDataFunc(.
            state.contents,
            geometry1.contents,
            Meta3dComponentGeometryProtocol.Index.dataName.indices,
          ),
        )->expect ==
          (
            Float32Array.make([]),
            Float32Array.make([]),
            Float32Array.make([]),
            Uint32Array.make([]),
          )
      },
    )
  })

  test(."if has disposed one, use disposed index as new index", ({
    given,
    \"and",
    \"when",
    then,
  }) => {
    let geometry3 = ref(Obj.magic(1))
    let geometry4 = ref(Obj.magic(2))

    _getContributeAndCreateAState((given, \"and"))

    given(
      %re("/^create two geometrys as geometry(\d+), geometry(\d+)$/")->Obj.magic,
      () => {
        let (s, geo1) = contribute.contents.createComponentFunc(. state.contents)
        let (s, geo2) = contribute.contents.createComponentFunc(. s)

        state := s
        geometry1 := geo1
        geometry2 := geo2
      },
    )

    \"and"(
      %re("/^defer dispose geometry(\d+), geometry(\d+)$/")->Obj.magic,
      () => {
        state :=
          contribute.contents.deferDisposeComponentFunc(.
            state.contents,
            geometry1.contents->Meta3dCommonlib.DeferDisposeTool.buildDeferDisposeData,
          )
        state :=
          contribute.contents.deferDisposeComponentFunc(.
            state.contents,
            geometry2.contents->Meta3dCommonlib.DeferDisposeTool.buildDeferDisposeData,
          )
      },
    )

    \"and"(
      %re("/^dispose geometry(\d+), geometry(\d+)$/")->Obj.magic,
      () => {
        let (state_, _) = contribute.contents.disposeComponentsFunc(.
          state.contents,
          Meta3dCommonlib.BatchDisposeTool.buildSharedBatchDisposeData([
            geometry1.contents,
            geometry2.contents,
          ]),
        )
        state := state_
      },
    )

    \"when"(
      %re("/^create two geometrys as geometry(\d+), geometry(\d+)$/")->Obj.magic,
      () => {
        let (s, geo1) = contribute.contents.createComponentFunc(. state.contents)
        let (s, geo2) = contribute.contents.createComponentFunc(. s)

        state := s
        geometry3 := geo1
        geometry4 := geo2
      },
    )

    then(
      %re("/^geometry(\d+) should equal to geometry(\d+)$/")->Obj.magic,
      () => {
        geometry3->expect == geometry2
      },
    )

    \"and"(
      %re("/^geometry(\d+) should equal to geometry(\d+)$/")->Obj.magic,
      () => {
        geometry4->expect == geometry1
      },
    )
  })
})
