external transformToComponent: Meta3dComponentTransformProtocol.Index.transform => Meta3dEngineCoreSceneviewProtocol.ComponentType.component =
  "%identity"

external geometryToComponent: Meta3dComponentGeometryProtocol.Index.geometry => Meta3dEngineCoreSceneviewProtocol.ComponentType.component =
  "%identity"

external componentToGeometry: Meta3dEngineCoreSceneviewProtocol.ComponentType.component => Meta3dComponentGeometryProtocol.Index.geometry =
  "%identity"

external directionLightToComponent: Meta3dComponentDirectionlightProtocol.Index.directionLight => Meta3dEngineCoreSceneviewProtocol.ComponentType.component =
  "%identity"

external basicCameraViewToComponent: Meta3dComponentBasiccameraviewProtocol.Index.basicCameraView => Meta3dEngineCoreSceneviewProtocol.ComponentType.component =
  "%identity"

external componentToBasicCameraView: Meta3dEngineCoreSceneviewProtocol.ComponentType.component => Meta3dComponentBasiccameraviewProtocol.Index.basicCameraView =
  "%identity"

external perspectiveCameraProjectionToComponent: Meta3dComponentPerspectivecameraprojectionProtocol.Index.perspectiveCameraProjection => Meta3dEngineCoreSceneviewProtocol.ComponentType.component =
  "%identity"
