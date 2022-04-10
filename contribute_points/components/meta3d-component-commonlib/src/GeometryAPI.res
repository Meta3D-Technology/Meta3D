let createTriangleGeometry = CreateTriangleGeometryService.create

let createSphereGeometry = CreateSphereGeometryService.create

let createPlaneGeometry = CreatePlaneGeometryService.create

let computeTangents = TangentsGeometryService.computeTangents

let getDisposedGeometrys = (usedComponentContribute, engineCoreService:Meta3dEngineCoreProtocol.ServiceType.service, geometryDataMap) => {
  let gameObjectsMap = 
  engineCoreService.getComponentData(
    usedComponentContribute,
    -1->Obj.magic,
    Meta3dComponentGeometryProtocol.Index.dataName.gameObjectsMap->Obj.magic,
  )
  ->Meta3dCommonlib.NullableSt.getExn
  ->Obj.magic

  geometryDataMap
  ->Meta3dCommonlib.MutableSparseMap.reducei((. disposedComponents, gameObjects, geometry) => {
    Meta3dCommonlib.DisposeSharedComponentUtils.isComponentHasGameObject(
      gameObjectsMap,
      geometry,
      gameObjects,
    )
      ? disposedComponents
      : disposedComponents->Meta3dCommonlib.ArraySt.push(geometry)
  }, [])
}
