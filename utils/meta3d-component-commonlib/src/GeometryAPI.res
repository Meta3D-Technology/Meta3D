let createTriangleGeometry = CreateTriangleGeometryService.create

let createSphereGeometry = CreateSphereGeometryService.create

let createPlaneGeometry = CreatePlaneGeometryService.create

let computeTangents = TangentsGeometryService.computeTangents

// let isActuallyDispose = (
//   state: Meta3dComponentGeometryProtocol.Index.state,
//   geometry,
//   gameObjects,
// ) => {
//   !Meta3dCommonlib.DisposeSharedComponentUtils.isComponentHasGameObject(
//     Meta3dCommonlib.ArrayMapUtils.batchRemoveValueArr(
//       state.gameObjectsMap->Meta3dCommonlib.MutableSparseMap.copy,
//       geometry,
//       gameObjects,
//     ),
//     geometry,
//     gameObjects,
//   )
// }
