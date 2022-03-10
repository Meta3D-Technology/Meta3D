open Meta3dBsJestCucumber
open Cucumber
open Expect
open Operators

open StateType

open Js.Typed_array

let feature = loadFeature("./test/features/get_contribute.feature")

defineFeature(feature, test => {
  let contribute: ref<
    Meta3dEngineCoreProtocol.ComponentContributeType.componentContribute<
      StateType.state,
      Meta3dComponentGeometryProtocol.Index.config,
      Meta3dComponentGeometryProtocol.Index.dataNameType,
      Meta3dComponentGeometryProtocol.Index.geometry,
    >,
  > = ref(Obj.magic(1))
  let state = ref(Obj.magic(1))
  let config: ref<Meta3dComponentGeometryProtocol.Index.config> = ref(Obj.magic(1))

  let _createState = (~isDebug=false, ~geometryPointCount=10, ~geometryCount=10, ()) => {
    contribute.contents.createStateFunc(. {
      isDebug: isDebug,
      geometryPointCount: geometryPointCount,
      geometryCount: geometryCount,
    })
  }

  test(."componentName", ({\"when", then}) => {
    \"when"("I get contribute", () => {
      contribute := Main.getComponentContribute()
    })

    then(%re("/^componentName should be \"(.*)\"$/")->Obj.magic, arg0 => {
      contribute.contents.componentName->expect == arg0
    })
  })

  test(."set config", ({\"when", \"and", then}) => {
    let geometryPointCount = 100
    let geometryCount = 10

    \"when"("I get contribute", () => {
      contribute := Main.getComponentContribute()
    })

    \"and"("create a state with config", () => {
      state := _createState(~isDebug=true, ~geometryPointCount, ~geometryCount, ())
    })

    then("the config is setted", () => {
      (
        ConfigTool.getIsDebug(state.contents),
        ConfigTool.getGeometryPointCount(state.contents),
        ConfigTool.getGeometryCount(state.contents),
      )->expect == (true, geometryPointCount, geometryCount)
    })
  })

  test(."create dataoriented data", ({\"when", \"and", then}) => {
    let geometryPointCount = 20
    let geometryCount = 10

    \"when"("I get contribute", () => {
      contribute := Main.getComponentContribute()
    })

    \"and"("create a state with geometryPointCount, geometryCount", () => {
      state := _createState(~geometryPointCount, ~geometryCount, ())
    })

    then("dataoriented data is created based on geometryPointCount, geometryCount", () => {
      state.contents.vertices->Js.Typed_array.Float32Array.length->expect == geometryPointCount * 3
      state.contents.indicesInfos->Js.Typed_array.Uint32Array.length->expect == geometryCount * 2
    })
  })

  test(."create a geometry", ({\"when", \"and", then}) => {
    \"when"("I get contribute", () => {
      contribute := Main.getComponentContribute()
    })

    \"and"("create a state", () => {
      state := _createState()
    })

    then("createComponentFunc should create a geometry", () => {
      let (state, geometry) = contribute.contents.createComponentFunc(. state.contents)

      state.maxIndex->expect == 1
      geometry->expect == 0
    })
  })

  test(."add a geometry to a gameObject", ({given, \"when", \"and", then}) => {
    let gameObject = 10->GameObjectTypeConvertUtils.intToGameObject
    let geometry = ref(Obj.magic(1))

    given("create a gameObject", () => {
      ()
    })

    \"when"("I get contribute", () => {
      contribute := Main.getComponentContribute()
    })

    \"and"("create a state", () => {
      state := _createState()
    })

    \"and"("create a geometry", () => {
      let (s, g) = contribute.contents.createComponentFunc(. state.contents)

      state := s
      geometry := g
    })

    \"and"("add the geometry to the gameObject", () => {
      state := contribute.contents.addComponentFunc(. state.contents, gameObject, geometry.contents)
    })

    then("get the gameObject's geometry should be the added one", () => {
      contribute.contents.getComponentFunc(. state.contents, gameObject)
      ->Meta3dCommonlib.NullableTool.getExn
      ->expect == geometry.contents
    })
  })

  test(."add a geometry to a gameObject which alreay has one", ({given, \"when", \"and", then}) => {
    let gameObject = 10->GameObjectTypeConvertUtils.intToGameObject
    let geometryl1 = ref(Obj.magic(1))
    let geometryl2 = ref(Obj.magic(1))

    given("create a gameObject", () => {
      ()
    })

    \"when"("I get contribute", () => {
      contribute := Main.getComponentContribute()
    })

    \"and"("create a state", () => {
      state := _createState()
    })

    \"and"("create two geometries", () => {
      let (s, g1) = contribute.contents.createComponentFunc(. state.contents)
      let (s, g2) = contribute.contents.createComponentFunc(. s)

      state := s
      geometryl1 := g1
      geometryl2 := g2
    })

    \"and"("add the first geometry to the gameObject", () => {
      state := contribute.contents.addComponentFunc(. state.contents, gameObject, geometryl1.contents)
    })

    \"and"("add the second geometry to the gameObject", () => {
      state := contribute.contents.addComponentFunc(. state.contents, gameObject, geometryl2.contents)
    })

    then("get the gameObject's geometry should be the second one", () => {
      contribute.contents.getComponentFunc(. state.contents, gameObject)
      ->Meta3dCommonlib.NullableTool.getExn
      ->expect == geometryl2.contents
    })
  })

  test(."remove a geometry from a gameObject", ({given, \"when", \"and", then}) => {
    let gameObject = 10->GameObjectTypeConvertUtils.intToGameObject
    let geometry = ref(Obj.magic(1))

    given("create a gameObject", () => {
      ()
    })

    \"when"("I get contribute", () => {
      contribute := Main.getComponentContribute()
    })

    \"and"("create a state", () => {
      state := _createState()
    })

    \"and"("create a geometry", () => {
      let (s, m) = contribute.contents.createComponentFunc(. state.contents)

      state := s
      geometry := m
    })

    \"and"("add the geometry to the gameObject", () => {
      state :=
        contribute.contents.addComponentFunc(. state.contents, gameObject, geometry.contents)
    })

    \"and"("remove the geometry from the gameObject", () => {
      state :=
        contribute.contents.removeComponentFunc(. state.contents, gameObject, geometry.contents)
    })

    then("the gameObject shouldn't has the geometry", () => {
      contribute.contents.hasComponentFunc(. state.contents, gameObject)->expect == false
    })
  })

  test(."remove a geometry which add to two gameObjects from a gameObject", ({given, \"when", \"and", then}) => {
    let gameObject1 = 10->GameObjectTypeConvertUtils.intToGameObject
    let gameObject2 = 11->GameObjectTypeConvertUtils.intToGameObject
    let geometry = ref(Obj.magic(1))

    given("create two gameObject as g1, g2", () => {
      ()
    })

    \"when"("I get contribute", () => {
      contribute := Main.getComponentContribute()
    })

    \"and"("create a state", () => {
      state := _createState()
    })

    \"and"("create a geometry", () => {
      let (s, m) = contribute.contents.createComponentFunc(. state.contents)

      state := s
      geometry := m
    })

    \"and"("add the geometry to g1", () => {
      state :=
        contribute.contents.addComponentFunc(. state.contents, gameObject1, geometry.contents)
    })

    \"and"("add the geometry to g2", () => {
      state :=
        contribute.contents.addComponentFunc(. state.contents, gameObject2, geometry.contents)
    })

    \"and"("remove the geometry from g1", () => {
      state :=
        contribute.contents.removeComponentFunc(. state.contents, gameObject1, geometry.contents)
    })

    then("g1 shouldn't has the geometry", () => {
      contribute.contents.hasComponentFunc(. state.contents, gameObject1)->expect == false
    })

    \"and"("g2 should has the geometry", () => {
      contribute.contents.hasComponentFunc(. state.contents, gameObject2)->expect == true
    })
  })

  test(."get gameObjects' geometrys", ({given, \"when", \"and", then}) => {
    let gameObject1 = 10->GameObjectTypeConvertUtils.intToGameObject
    let gameObject2 = 11->GameObjectTypeConvertUtils.intToGameObject
    let geometry1 = ref(Obj.magic(1))
    let geometry2 = ref(Obj.magic(1))
    let geometry3 = ref(Obj.magic(1))

    given("create two gameObject as g1, g2", () => {
      ()
    })

    \"when"("I get contribute", () => {
      contribute := Main.getComponentContribute()
    })

    \"and"("create a state", () => {
      state := _createState()
    })

    \"and"("create three geometrys as geo1, geo2, geo3", () => {
      let (s, geo1) = contribute.contents.createComponentFunc(. state.contents)
      let (s, geo2) = contribute.contents.createComponentFunc(. s)
      let (s, geo3) = contribute.contents.createComponentFunc(. s)

      state := s
      geometry1 := geo1
      geometry2 := geo2
      geometry3 := geo3
    })

    \"and"("add geo1 to g1", () => {
      state :=
        contribute.contents.addComponentFunc(. state.contents, gameObject1, geometry1.contents)
    })

    \"and"("add geo3 to g2", () => {
      state :=
        contribute.contents.addComponentFunc(. state.contents, gameObject2, geometry3.contents)
    })

    then("get the geometrys of [g1, g2] should return [geo1, geo3]", () => {
      contribute.contents.getComponentsFunc(.
        state.contents,
        [gameObject1, gameObject2],
      )->expect == [geometry1.contents, geometry3.contents]
    })
  })

  test(."get need disposed geometrys", ({given, \"when", \"and", then}) => {
    let geometry1 = ref(Obj.magic(1))
    let geometry2 = ref(Obj.magic(1))
    let geometry3 = ref(Obj.magic(1))

    \"when"("I get contribute", () => {
      contribute := Main.getComponentContribute()
    })

    \"and"("create a state", () => {
      state := _createState()
    })

    \"and"("create three geometrys as geo1, geo2, geo3", () => {
      let (s, geo1) = contribute.contents.createComponentFunc(. state.contents)
      let (s, geo2) = contribute.contents.createComponentFunc(. s)
      let (s, geo3) = contribute.contents.createComponentFunc(. s)

      state := s
      geometry1 := geo1
      geometry2 := geo2
      geometry3 := geo3
    })

    \"and"("defer dispose geo1", () => {
      state := contribute.contents.deferDisposeComponentFunc(. state.contents, geometry1.contents)
    })

    \"and"("defer dispose geo1", () => {
      state := contribute.contents.deferDisposeComponentFunc(. state.contents, geometry1.contents)
    })

    \"and"("defer dispose geo3", () => {
      state := contribute.contents.deferDisposeComponentFunc(. state.contents, geometry3.contents)
    })

    then("get need disposed geometrys should return [geo1, geo3]", () => {
      contribute.contents.getNeedDisposedComponentsFunc(. state.contents)->expect == [
          geometry1.contents,
          geometry3.contents,
        ]
    })
  })

  test(."get all geometries", ({given, \"when", \"and", then}) => {
    let gameObject1 = 10->GameObjectTypeConvertUtils.intToGameObject
    let gameObject2 = 11->GameObjectTypeConvertUtils.intToGameObject
    let geometryl1 = ref(Obj.magic(1))
    let geometryl2 = ref(Obj.magic(1))

    given("create two gameObjects", () => {
      ()
    })

    \"when"("I get contribute", () => {
      contribute := Main.getComponentContribute()
    })

    \"and"("create a state", () => {
      state := _createState()
    })

    \"and"("create two geometries", () => {
      let (s, g1) = contribute.contents.createComponentFunc(. state.contents)
      let (s, g2) = contribute.contents.createComponentFunc(. s)

      state := s
      geometryl1 := g1
      geometryl2 := g2
    })

    \"and"("add them to the gameObjects one by one", () => {
      state := contribute.contents.addComponentFunc(. state.contents, gameObject1, geometryl1.contents)
      state := contribute.contents.addComponentFunc(. state.contents, gameObject2, geometryl2.contents)
    })

    then("getAllComponentsFunc should get the two geometries", () => {
      contribute.contents.getAllComponentsFunc(. state.contents)->expect == [
          geometryl1.contents,
          geometryl2.contents,
        ]
    })
  })

  test(."judge whether a gameObject has a geometry", ({given, \"when", \"and", then}) => {
    let gameObject = 10->GameObjectTypeConvertUtils.intToGameObject
    let geometry = ref(Obj.magic(1))

    given("create a gameObject", () => {
      ()
    })

    \"when"("I get contribute", () => {
      contribute := Main.getComponentContribute()
    })

    \"and"("create a state", () => {
      state := _createState()
    })

    \"and"("create a geometry", () => {
      let (s, g) = contribute.contents.createComponentFunc(. state.contents)

      state := s
      geometry := g
    })

    \"and"("add the geometry to the gameObject", () => {
      state := contribute.contents.addComponentFunc(. state.contents, gameObject, geometry.contents)
    })

    then("hasComponentFunc should return true", () => {
      contribute.contents.hasComponentFunc(. state.contents, gameObject)->expect == true
    })
  })

  test(."get a geometry's gameObjects", ({given, \"when", \"and", then}) => {
    let gameObject1 = 10->GameObjectTypeConvertUtils.intToGameObject
    let gameObject2 = 11->GameObjectTypeConvertUtils.intToGameObject
    let geometry = ref(Obj.magic(1))

    given("create two gameObjects", () => {
      ()
    })

    \"when"("I get contribute", () => {
      contribute := Main.getComponentContribute()
    })

    \"and"("create a state", () => {
      state := _createState()
    })

    \"and"("create a geometry", () => {
      let (s, g) = contribute.contents.createComponentFunc(. state.contents)

      state := s
      geometry := g
    })

    \"and"("add the geometry to the two gameObjects", () => {
      state := contribute.contents.addComponentFunc(. state.contents, gameObject1, geometry.contents)
      state := contribute.contents.addComponentFunc(. state.contents, gameObject2, geometry.contents)
    })

    then("getGameObjectsFunc should return the two gameObjects", () => {
      contribute.contents.getGameObjectsFunc(. state.contents, geometry.contents)->expect == [
          gameObject1,
          gameObject2,
        ]
    })
  })

  test(."get indices's count", ({\"when", \"and", then}) => {
    let geometry = ref(Obj.magic(1))

    \"when"("I get contribute", () => {
      contribute := Main.getComponentContribute()
    })

    \"and"("create a state", () => {
      state := _createState()
    })

    \"and"("create a geometry", () => {
      let (s, g) = contribute.contents.createComponentFunc(. state.contents)

      state := s
      geometry := g
    })

    \"and"(%re("/^set geometry's indices to (.*) , (.*), (.*)$/")->Obj.magic, () => {
      let arguments =
        %external(arguments)->Meta3dCommonlib.NumberTool.getExnAndConvertArgumentsToNumber

      state :=
        contribute.contents.setComponentDataFunc(.
          state.contents,
          geometry.contents,
          Meta3dComponentGeometryProtocol.Index.dataName.indices,
          arguments->Js.Array.slice(~start=0, ~end_=3, _)->Obj.magic,
        )
    })

    then(%re("/^get geometry's indices's count should return (.*)$/")->Obj.magic, arg0 => {
      let arguments =
        %external(arguments)->Meta3dCommonlib.NumberTool.getExnAndConvertArgumentsToNumber

      contribute.contents.getComponentDataFunc(.
        state.contents,
        geometry.contents,
        Meta3dComponentGeometryProtocol.Index.dataName.indicesCount,
      )
      ->Meta3dCommonlib.NullableTool.getExn
      ->expect == arguments[0]
    })
  })

  test(."operate vertices", ({\"when", \"and", then}) => {
    let geometry = ref(Obj.magic(1))
    let vertices1 = Float32Array.make([1., 2., 3.])
    let vertices2 = Float32Array.make([3., 5., 5.])

    \"when"("I get contribute", () => {
      contribute := Main.getComponentContribute()
    })

    \"and"("create a state", () => {
      state := _createState()
    })

    \"and"("create a geometry", () => {
      let (s, g) = contribute.contents.createComponentFunc(. state.contents)

      state := s
      geometry := g
    })

    \"when"("set geometry's vertices", () => {
      state :=
        contribute.contents.setComponentDataFunc(.
          state.contents,
          geometry.contents,
          Meta3dComponentGeometryProtocol.Index.dataName.vertices,
          vertices1->Obj.magic,
        )
      state :=
        contribute.contents.setComponentDataFunc(.
          state.contents,
          geometry.contents,
          Meta3dComponentGeometryProtocol.Index.dataName.vertices,
          vertices2->Obj.magic,
        )
    })

    then("get geometry's vertices should return the setted data", () => {
      contribute.contents.getComponentDataFunc(.
        state.contents,
        geometry.contents,
        Meta3dComponentGeometryProtocol.Index.dataName.vertices,
      )
      ->Meta3dCommonlib.NullableTool.getExn
      ->expect == vertices2
    })
  })

  test(."operate normals", ({\"when", \"and", then}) => {
    let geometry = ref(Obj.magic(1))
    let normals1 = Float32Array.make([1., 2., 3.])
    let normals2 = Float32Array.make([3., 5., 5.])

    \"when"("I get contribute", () => {
      contribute := Main.getComponentContribute()
    })

    \"and"("create a state", () => {
      state := _createState()
    })

    \"and"("create a geometry", () => {
      let (s, g) = contribute.contents.createComponentFunc(. state.contents)

      state := s
      geometry := g
    })

    \"when"("set geometry's normals", () => {
      state :=
        contribute.contents.setComponentDataFunc(.
          state.contents,
          geometry.contents,
          Meta3dComponentGeometryProtocol.Index.dataName.normals,
          normals1->Obj.magic,
        )
      state :=
        contribute.contents.setComponentDataFunc(.
          state.contents,
          geometry.contents,
          Meta3dComponentGeometryProtocol.Index.dataName.normals,
          normals2->Obj.magic,
        )
    })

    then("get geometry's normals should return the setted data", () => {
      contribute.contents.getComponentDataFunc(.
        state.contents,
        geometry.contents,
        Meta3dComponentGeometryProtocol.Index.dataName.normals,
      )
      ->Meta3dCommonlib.NullableTool.getExn
      ->expect == normals2
    })
  })

  test(."operate texCoords", ({\"when", \"and", then}) => {
    let geometry = ref(Obj.magic(1))
    let texCoords1 = Float32Array.make([1., 2.])
    let texCoords2 = Float32Array.make([3., 5.])

    \"when"("I get contribute", () => {
      contribute := Main.getComponentContribute()
    })

    \"and"("create a state", () => {
      state := _createState()
    })

    \"and"("create a geometry", () => {
      let (s, g) = contribute.contents.createComponentFunc(. state.contents)

      state := s
      geometry := g
    })

    \"when"("set geometry's texCoords", () => {
      state :=
        contribute.contents.setComponentDataFunc(.
          state.contents,
          geometry.contents,
          Meta3dComponentGeometryProtocol.Index.dataName.texCoords,
          texCoords1->Obj.magic,
        )
      state :=
        contribute.contents.setComponentDataFunc(.
          state.contents,
          geometry.contents,
          Meta3dComponentGeometryProtocol.Index.dataName.texCoords,
          texCoords2->Obj.magic,
        )
    })

    then("get geometry's texCoords should return the setted data", () => {
      contribute.contents.getComponentDataFunc(.
        state.contents,
        geometry.contents,
        Meta3dComponentGeometryProtocol.Index.dataName.texCoords,
      )
      ->Meta3dCommonlib.NullableTool.getExn
      ->expect == texCoords2
    })
  })

  test(."operate tangents", ({\"when", \"and", then}) => {
    let geometry = ref(Obj.magic(1))
    let tangents1 = Float32Array.make([1., 2., 3.])
    let tangents2 = Float32Array.make([3., 5., 5.])

    \"when"("I get contribute", () => {
      contribute := Main.getComponentContribute()
    })

    \"and"("create a state", () => {
      state := _createState()
    })

    \"and"("create a geometry", () => {
      let (s, g) = contribute.contents.createComponentFunc(. state.contents)

      state := s
      geometry := g
    })

    \"when"("set geometry's tangents", () => {
      state :=
        contribute.contents.setComponentDataFunc(.
          state.contents,
          geometry.contents,
          Meta3dComponentGeometryProtocol.Index.dataName.tangents,
          tangents1->Obj.magic,
        )
      state :=
        contribute.contents.setComponentDataFunc(.
          state.contents,
          geometry.contents,
          Meta3dComponentGeometryProtocol.Index.dataName.tangents,
          tangents2->Obj.magic,
        )
    })

    then("get geometry's tangents should return the setted data", () => {
      contribute.contents.getComponentDataFunc(.
        state.contents,
        geometry.contents,
        Meta3dComponentGeometryProtocol.Index.dataName.tangents,
      )
      ->Meta3dCommonlib.NullableTool.getExn
      ->expect == tangents2
    })
  })

  test(."operate indices", ({\"when", \"and", then}) => {
    let geometry = ref(Obj.magic(1))
    let indices1 = Uint32Array.make([1, 2, 3])

    \"when"("I get contribute", () => {
      contribute := Main.getComponentContribute()
    })

    \"and"("create a state", () => {
      state := _createState()
    })

    \"and"("create a geometry", () => {
      let (s, g) = contribute.contents.createComponentFunc(. state.contents)

      state := s
      geometry := g
    })

    \"when"("set geometry's indices", () => {
      state :=
        contribute.contents.setComponentDataFunc(.
          state.contents,
          geometry.contents,
          Meta3dComponentGeometryProtocol.Index.dataName.indices,
          indices1->Obj.magic,
        )
    })

    then("get geometry's indices should return the setted data", () => {
      contribute.contents.getComponentDataFunc(.
        state.contents,
        geometry.contents,
        Meta3dComponentGeometryProtocol.Index.dataName.indices,
      )
      ->Meta3dCommonlib.NullableTool.getExn
      ->expect == indices1
    })
  })

  test(."not has vertices", ({\"when", \"and", then}) => {
    let geometry = ref(Obj.magic(1))

    \"when"("I get contribute", () => {
      contribute := Main.getComponentContribute()
    })

    \"and"("create a state", () => {
      state := _createState()
    })

    \"and"("create a geometry", () => {
      let (s, g) = contribute.contents.createComponentFunc(. state.contents)

      state := s
      geometry := g
    })

    then("geometry should not has vertices", () => {
      contribute.contents.getComponentDataFunc(.
        state.contents,
        geometry.contents,
        Meta3dComponentGeometryProtocol.Index.dataName.vertices,
      )
      ->Meta3dCommonlib.NullableTool.getExn
      ->Obj.magic
      ->Float32Array.length
      ->expect == 0
    })
  })

  test(."has vertices", ({\"when", \"and", then}) => {
    let geometry = ref(Obj.magic(1))

    \"when"("I get contribute", () => {
      contribute := Main.getComponentContribute()
    })

    \"and"("create a state", () => {
      state := _createState()
    })

    \"and"("create a geometry", () => {
      let (s, g) = contribute.contents.createComponentFunc(. state.contents)

      state := s
      geometry := g
    })

    \"and"("set geometry's vertices", () => {
      state :=
        contribute.contents.setComponentDataFunc(.
          state.contents,
          geometry.contents,
          Meta3dComponentGeometryProtocol.Index.dataName.vertices,
          Float32Array.make([1., 2., 3.])->Obj.magic,
        )
    })

    then("geometry should has vertices", () => {
      contribute.contents.getComponentDataFunc(.
        state.contents,
        geometry.contents,
        Meta3dComponentGeometryProtocol.Index.dataName.vertices,
      )
      ->Meta3dCommonlib.NullableTool.getExn
      ->Obj.magic
      ->Float32Array.length
      ->expect == 3
    })
  })

  test(."has indices", ({\"when", \"and", then}) => {
    let geometry = ref(Obj.magic(1))

    \"when"("I get contribute", () => {
      contribute := Main.getComponentContribute()
    })

    \"and"("create a state", () => {
      state := _createState()
    })

    \"and"("create a geometry", () => {
      let (s, g) = contribute.contents.createComponentFunc(. state.contents)

      state := s
      geometry := g
    })

    \"and"("set geometry's indices", () => {
      state :=
        contribute.contents.setComponentDataFunc(.
          state.contents,
          geometry.contents,
          Meta3dComponentGeometryProtocol.Index.dataName.indices,
          Uint32Array.make([1, 2, 3])->Obj.magic,
        )
    })

    then("geometry should has indices", () => {
      contribute.contents.getComponentDataFunc(.
        state.contents,
        geometry.contents,
        Meta3dComponentGeometryProtocol.Index.dataName.indices,
      )
      ->Meta3dCommonlib.NullableTool.getExn
      ->Obj.magic
      ->Uint32Array.length
      ->expect == 3
    })
  })

  test(."texCoords should in [0.0, 1.0]", ({given, \"when", \"and", then}) => {
    let isDebug = true
    let geometry = ref(Obj.magic(1))

    given("open debug", () => {
      ()
    })

    \"when"("I get contribute", () => {
      contribute := Main.getComponentContribute()
    })

    \"and"("create a state", () => {
      state := _createState(~isDebug, ())
    })

    \"and"("create a geometry", () => {
      let (s, g) = contribute.contents.createComponentFunc(. state.contents)

      state := s
      geometry := g
    })

    then(
      %re(
        "/^set geometry's texCoords to (.*), (.*) which not in range should throw error message: \"(.*)\"$/"
      )->Obj.magic,
      () => {
        let message =
          (
            %external(arguments)
            ->Meta3dCommonlib.OptionSt.getExn
            ->Meta3dCommonlib.ArgumentsTool.getArgumentsArr
          )[2]
        let arguments =
          %external(arguments)->Meta3dCommonlib.NumberTool.getExnAndConvertArgumentsToNumber

        expect(() => {
          state :=
            contribute.contents.setComponentDataFunc(.
              state.contents,
              geometry.contents,
              Meta3dComponentGeometryProtocol.Index.dataName.texCoords,
              arguments->Js.Array.slice(~start=0, ~end_=2, _)->Obj.magic,
            )
        })->toThrowMessage(message)
      },
    )
  })

  test(."set enough vertices", ({given, \"when", \"and", then}) => {
    let isDebug = true
    let geometry = ref(Obj.magic(1))

    given("open debug", () => {
      ()
    })

    \"when"("I get contribute", () => {
      contribute := Main.getComponentContribute()
    })

    \"and"(%re("/^create a state with geometryPointCount:(\d+)$/")->Obj.magic, arg0 => {
      let arguments =
        %external(arguments)->Meta3dCommonlib.NumberTool.getExnAndConvertArgumentsToNumber

      state := _createState(~isDebug, ~geometryPointCount=arguments[0]->Obj.magic, ())
    })

    \"and"("create a geometry", () => {
      let (s, g) = contribute.contents.createComponentFunc(. state.contents)

      state := s
      geometry := g
    })

    then(
      %re("/^set geometry's vertices with (\d+) vertex data should not throw error$/")->Obj.magic,
      arg0 => {
        expect(() => {
          state :=
            contribute.contents.setComponentDataFunc(.
              state.contents,
              geometry.contents,
              Meta3dComponentGeometryProtocol.Index.dataName.vertices,
              Float32Array.make([1., 2., 3., 4., 5., 6.])->Obj.magic,
            )
        })->toNotThrow
      },
    )
  })

  test(."set too many vertices", ({given, \"when", \"and", then}) => {
    let isDebug = true
    let geometry = ref(Obj.magic(1))

    given("open debug", () => {
      ()
    })

    \"when"("I get contribute", () => {
      contribute := Main.getComponentContribute()
    })

    \"and"(%re("/^create a state with geometryPointCount:(\d+)$/")->Obj.magic, arg0 => {
      let arguments =
        %external(arguments)->Meta3dCommonlib.NumberTool.getExnAndConvertArgumentsToNumber

      state := _createState(~isDebug, ~geometryPointCount=arguments[0]->Obj.magic, ())
    })

    \"and"("create a geometry", () => {
      let (s, g) = contribute.contents.createComponentFunc(. state.contents)

      state := s
      geometry := g
    })

    then(
      %re("/^set geometry's vertices with (\d+) vertex data should throw error$/")->Obj.magic,
      arg0 => {
        expect(() => {
          state :=
            contribute.contents.setComponentDataFunc(.
              state.contents,
              geometry.contents,
              Meta3dComponentGeometryProtocol.Index.dataName.vertices,
              Float32Array.make([1., 2., 3., 4., 5., 6., 7., 8., 9.])->Obj.magic,
            )
        })->toThrowMessage("offset is out of bounds")
      },
    )
  })

  test(."set too many indices", ({given, \"when", \"and", then}) => {
    let isDebug = true
    let geometry = ref(Obj.magic(1))

    given("open debug", () => {
      ()
    })

    \"when"("I get contribute", () => {
      contribute := Main.getComponentContribute()
    })

    \"and"(%re("/^create a state with geometryPointCount:(\d+)$/")->Obj.magic, arg0 => {
      let arguments =
        %external(arguments)->Meta3dCommonlib.NumberTool.getExnAndConvertArgumentsToNumber

      state := _createState(~isDebug, ~geometryPointCount=arguments[0]->Obj.magic, ())
    })

    \"and"("create a geometry", () => {
      let (s, g) = contribute.contents.createComponentFunc(. state.contents)

      state := s
      geometry := g
    })

    then(
      %re("/^set geometry's indices with (\d+) indices should throw error$/")->Obj.magic,
      arg0 => {
        expect(() => {
          state :=
            contribute.contents.setComponentDataFunc(.
              state.contents,
              geometry.contents,
              Meta3dComponentGeometryProtocol.Index.dataName.indices,
              Uint32Array.make([1])->Obj.magic,
            )
        })->toThrowMessage("offset is out of bounds")
      },
    )
  })

  test(."create too many geometries", ({given, \"when", \"and", then}) => {
    let isDebug = true
    let geometry = ref(Obj.magic(1))

    given("open debug", () => {
      ()
    })

    \"when"("I get contribute", () => {
      contribute := Main.getComponentContribute()
    })

    \"and"(%re("/^create a state with geometryCount:(\d+)$/")->Obj.magic, arg0 => {
      let arguments =
        %external(arguments)->Meta3dCommonlib.NumberTool.getExnAndConvertArgumentsToNumber

      state := _createState(~isDebug, ~geometryCount=arguments[0]->Obj.magic, ())
    })

    then("create two geometries should contract error", () => {
      let (s, g) = contribute.contents.createComponentFunc(. state.contents)
      expect(() => {
        contribute.contents.createComponentFunc(. s)
      })->toThrowMessage("expect index: 1 <= maxIndex: 0")
    })
  })
})
