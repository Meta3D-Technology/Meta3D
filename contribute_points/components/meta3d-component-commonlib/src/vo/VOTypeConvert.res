external transformToComponent: Meta3dComponentTransformProtocol.Index.transform => Meta3dEngineCoreProtocol.ComponentType.component =
  "%identity"

external geometryToComponent: Meta3dComponentGeometryProtocol.Index.geometry => Meta3dEngineCoreProtocol.ComponentType.component =
  "%identity"

external componentToGeometry: Meta3dEngineCoreProtocol.ComponentType.component => Meta3dComponentGeometryProtocol.Index.geometry =
  "%identity"

external directionLightToComponent: Meta3dComponentDirectionlightProtocol.Index.directionLight => Meta3dEngineCoreProtocol.ComponentType.component =
  "%identity"

external basicCameraViewToComponent: Meta3dComponentBasiccameraviewProtocol.Index.basicCameraView => Meta3dEngineCoreProtocol.ComponentType.component =
  "%identity"

external componentToBasicCameraView: Meta3dEngineCoreProtocol.ComponentType.component => Meta3dComponentBasiccameraviewProtocol.Index.basicCameraView =
  "%identity"

external perspectiveCameraProjectionToComponent: Meta3dComponentPerspectivecameraprojectionProtocol.Index.perspectiveCameraProjection => Meta3dEngineCoreProtocol.ComponentType.component =
  "%identity"
