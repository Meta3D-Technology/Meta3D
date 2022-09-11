open Meta3dBsJestCucumber
open Cucumber
open Expect
open Operators

open Js.Typed_array

let feature = loadFeature("./test/features/geometry_api.feature")

defineFeature(feature, test => {
  let contribute: ref<Meta3dEngineCoreProtocol.RegisterComponentType.usedComponentContribute> = ref(
    Obj.magic(1),
  )
  let geometryComponentName = "Geometry"

  let _prepare = (given, \"and") => {
    BackgroundTool.prepare(
      given,
      \"and",
      "geometry",
      geometryComponentName,
      Meta3dComponentGeometry.Main.getContribute,
      (
        {
          isDebug: false,
          geometryCount: 2,
          geometryPointCount: 10,
        }: Meta3dComponentGeometryProtocol.Index.config
      ),
    )
  }

  test(."createTriangleGeometry", ({given, \"when", \"and", then}) => {
    let geometry = ref(Obj.magic(-1))

    _prepare(given, \"and")

    \"when"("create a triangle geometry", () => {
      contribute := MainTool.unsafeGetUsedComponentContribute(geometryComponentName)

      let (d, g) = Main.createTriangleGeometry(contribute.contents, MainTool.getExtensionService())

      contribute := d
      geometry := g->VOTypeConvert.geometryToComponent
    })

    then("its vertex data should be correct", () => {
      MainTool.getComponentData(
        contribute.contents,
        geometry.contents,
        Meta3dComponentGeometryProtocol.Index.dataName.vertices->Obj.magic,
      )
      ->Meta3dCommonlib.NullableTool.getExn
      ->expect == Float32Array.make([0.0, 0.5, 0., -0.5, -0.5, 0., 0.5, -0.5, 0.])
      MainTool.getComponentData(
        contribute.contents,
        geometry.contents,
        Meta3dComponentGeometryProtocol.Index.dataName.texCoords->Obj.magic,
      )
      ->Meta3dCommonlib.NullableTool.getExn
      ->expect == Float32Array.make([0.5, 1., 0., 0., 1., 0.])
      MainTool.getComponentData(
        contribute.contents,
        geometry.contents,
        Meta3dComponentGeometryProtocol.Index.dataName.normals->Obj.magic,
      )
      ->Meta3dCommonlib.NullableTool.getExn
      ->expect == Float32Array.make([0., 0., 1., 0., 0., 1., 0., 0., 1.])
      MainTool.getComponentData(
        contribute.contents,
        geometry.contents,
        Meta3dComponentGeometryProtocol.Index.dataName.indices->Obj.magic,
      )
      ->Meta3dCommonlib.NullableTool.getExn
      ->expect == Uint32Array.make([0, 1, 2])
    })
  })

  test(."computeTangents", ({given, \"when", \"and", then}) => {
    let geometry = ref(Obj.magic(-1))
    let tangents = ref(Float32Array.make([]))

    _prepare(given, \"and")

    \"when"(%re("/^create a sphere geometry with (.*), (.*)$/")->Obj.magic, () => {
      contribute := MainTool.unsafeGetUsedComponentContribute(geometryComponentName)

      let arguments =
        %external(arguments)->Meta3dCommonlib.NumberTool.getExnAndConvertArgumentsToNumber

      let (d, g) = Main.createSphereGeometry(
        contribute.contents,
        MainTool.getExtensionService(),
        arguments[0]->Obj.magic,
        arguments[1]->Obj.magic,
      )

      contribute := d
      geometry := g->VOTypeConvert.geometryToComponent
    })

    \"and"("compute the geometry's tangents", () => {
      tangents :=
        Main.computeTangents(
          MainTool.getComponentData(
            contribute.contents,
            geometry.contents,
            Meta3dComponentGeometryProtocol.Index.dataName.vertices->Obj.magic,
          )
          ->Meta3dCommonlib.NullableTool.getExn
          ->Obj.magic,
          MainTool.getComponentData(
            contribute.contents,
            geometry.contents,
            Meta3dComponentGeometryProtocol.Index.dataName.texCoords->Obj.magic,
          )
          ->Meta3dCommonlib.NullableTool.getExn
          ->Obj.magic,
          MainTool.getComponentData(
            contribute.contents,
            geometry.contents,
            Meta3dComponentGeometryProtocol.Index.dataName.normals->Obj.magic,
          )
          ->Meta3dCommonlib.NullableTool.getExn
          ->Obj.magic,
          MainTool.getComponentData(
            contribute.contents,
            geometry.contents,
            Meta3dComponentGeometryProtocol.Index.dataName.indices->Obj.magic,
          )
          ->Meta3dCommonlib.NullableTool.getExn
          ->Obj.magic,
        )
    })

    then("it shouldn't has NaN", () => {
      tangents.contents->expect ==
        Float32Array.make([
          0.,
          0.,
          0.,
          1.,
          0.,
          -6.123234262925839e-17,
          -1.,
          0.,
          1.8369702788777518e-16,
          -1.,
          -8.164312350567786e-17,
          -2.0410780876419464e-17,
          4.898587410340671e-16,
          -2.999519808315976e-32,
          1.,
          1.,
          8.164312350567786e-17,
          -2.6534016462834284e-16,
          1.,
          4.898587410340671e-16,
          -6.123234262925839e-17,
          -1.,
          4.898587410340671e-16,
          1.8369702788777518e-16,
          -1.,
          -4.898587410340671e-16,
          1.4802974102831747e-16,
        ])
    })
  })

  test(."createSphereGeometry", ({given, \"when", \"and", then}) => {
    let geometry = ref(Obj.magic(-1))

    _prepare(given, \"and")

    \"when"(%re("/^create a sphere geometry with (.*), (.*)$/")->Obj.magic, () => {
      contribute := MainTool.unsafeGetUsedComponentContribute(geometryComponentName)

      let arguments =
        %external(arguments)->Meta3dCommonlib.NumberTool.getExnAndConvertArgumentsToNumber

      let (d, g) = Main.createSphereGeometry(
        contribute.contents,
        MainTool.getExtensionService(),
        arguments[0]->Obj.magic,
        arguments[1]->Obj.magic,
      )

      contribute := d
      geometry := g->VOTypeConvert.geometryToComponent
    })

    then("its vertex data should be correct", () => {
      MainTool.getComponentData(
        contribute.contents,
        geometry.contents,
        Meta3dComponentGeometryProtocol.Index.dataName.vertices->Obj.magic,
      )
      ->Meta3dCommonlib.NullableTool.getExn
      ->expect ==
        Float32Array.make([
          0.,
          0.5,
          0.,
          -0.,
          0.5,
          0.,
          0.,
          0.5,
          -0.,
          0.5,
          3.0616171314629196e-17,
          0.,
          -0.5,
          3.0616171314629196e-17,
          6.123234262925839e-17,
          0.5,
          3.0616171314629196e-17,
          -1.2246468525851679e-16,
          6.123234262925839e-17,
          -0.5,
          0.,
          -6.123234262925839e-17,
          -0.5,
          7.498798786105971e-33,
          6.123234262925839e-17,
          -0.5,
          -1.4997597572211942e-32,
        ])
      MainTool.getComponentData(
        contribute.contents,
        geometry.contents,
        Meta3dComponentGeometryProtocol.Index.dataName.texCoords->Obj.magic,
      )
      ->Meta3dCommonlib.NullableTool.getExn
      ->expect ==
        Float32Array.make([
          1.,
          1.,
          0.5,
          1.,
          0.,
          1.,
          1.,
          0.5,
          0.5,
          0.5,
          0.,
          0.5,
          1.,
          0.,
          0.5,
          0.,
          0.,
          0.,
        ])
      MainTool.getComponentData(
        contribute.contents,
        geometry.contents,
        Meta3dComponentGeometryProtocol.Index.dataName.normals->Obj.magic,
      )
      ->Meta3dCommonlib.NullableTool.getExn
      ->expect ==
        Float32Array.make([
          0.,
          0.5,
          0.,
          -0.,
          0.5,
          0.,
          0.,
          0.5,
          -0.,
          0.5,
          3.0616171314629196e-17,
          0.,
          -0.5,
          3.0616171314629196e-17,
          6.123234262925839e-17,
          0.5,
          3.0616171314629196e-17,
          -1.2246468525851679e-16,
          6.123234262925839e-17,
          -0.5,
          0.,
          -6.123234262925839e-17,
          -0.5,
          7.498798786105971e-33,
          6.123234262925839e-17,
          -0.5,
          -1.4997597572211942e-32,
        ])
      MainTool.getComponentData(
        contribute.contents,
        geometry.contents,
        Meta3dComponentGeometryProtocol.Index.dataName.indices->Obj.magic,
      )
      ->Meta3dCommonlib.NullableTool.getExn
      ->expect ==
        Uint32Array.make([1, 3, 0, 1, 4, 3, 2, 4, 1, 2, 5, 4, 4, 6, 3, 4, 7, 6, 5, 7, 4, 5, 8, 7])
    })
  })

  test(."createPlaneGeometry", ({given, \"when", \"and", then}) => {
    let geometry = ref(Obj.magic(-1))

    _prepare(given, \"and")

    \"and"(%re("/^create a plane geometry with (.*), (.*), (.*), (.*)$/")->Obj.magic, () => {
      contribute := MainTool.unsafeGetUsedComponentContribute(geometryComponentName)

      let arguments =
        %external(arguments)->Meta3dCommonlib.NumberTool.getExnAndConvertArgumentsToNumber

      let (d, g) = Main.createPlaneGeometry(
        contribute.contents,
        MainTool.getExtensionService(),
        arguments[0],
        arguments[1],
        arguments[2],
        arguments[3],
      )

      contribute := d
      geometry := g->VOTypeConvert.geometryToComponent
    })

    then("its vertex data should be correct", () => {
      MainTool.getComponentData(
        contribute.contents,
        geometry.contents,
        Meta3dComponentGeometryProtocol.Index.dataName.vertices->Obj.magic,
      )
      ->Meta3dCommonlib.NullableTool.getExn
      ->expect ==
        Float32Array.make([
          -5.,
          2.5,
          0.,
          0.,
          2.5,
          0.,
          5.,
          2.5,
          0.,
          -5.,
          -0.,
          0.,
          0.,
          -0.,
          0.,
          5.,
          -0.,
          0.,
          -5.,
          -2.5,
          0.,
          0.,
          -2.5,
          0.,
          5.,
          -2.5,
          0.,
        ])
      MainTool.getComponentData(
        contribute.contents,
        geometry.contents,
        Meta3dComponentGeometryProtocol.Index.dataName.texCoords->Obj.magic,
      )
      ->Meta3dCommonlib.NullableTool.getExn
      ->expect ==
        Float32Array.make([
          0.,
          1.,
          0.5,
          1.,
          1.,
          1.,
          0.,
          0.5,
          0.5,
          0.5,
          1.,
          0.5,
          0.,
          0.,
          0.5,
          0.,
          1.,
          0.,
        ])
      MainTool.getComponentData(
        contribute.contents,
        geometry.contents,
        Meta3dComponentGeometryProtocol.Index.dataName.normals->Obj.magic,
      )
      ->Meta3dCommonlib.NullableTool.getExn
      ->expect ==
        Float32Array.make([
          0.,
          0.,
          1.,
          0.,
          0.,
          1.,
          0.,
          0.,
          1.,
          0.,
          0.,
          1.,
          0.,
          0.,
          1.,
          0.,
          0.,
          1.,
          0.,
          0.,
          1.,
          0.,
          0.,
          1.,
          0.,
          0.,
          1.,
        ])
      MainTool.getComponentData(
        contribute.contents,
        geometry.contents,
        Meta3dComponentGeometryProtocol.Index.dataName.indices->Obj.magic,
      )
      ->Meta3dCommonlib.NullableTool.getExn
      ->expect ==
        Uint32Array.make([0, 3, 1, 3, 4, 1, 1, 4, 2, 4, 5, 2, 3, 6, 4, 6, 7, 4, 4, 7, 5, 7, 8, 5])
    })
  })
})
