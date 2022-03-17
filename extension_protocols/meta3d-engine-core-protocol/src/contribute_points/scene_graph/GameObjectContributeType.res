type gameObject = Meta3dGameobjectProtocol.Index.gameObject

type transform = Meta3dComponentTransformProtocol.Index.transform

type pbrMaterial = Meta3dComponentPbrmaterialProtocol.Index.pbrMaterial

type geometry = Meta3dComponentGeometryProtocol.Index.geometry

type config = Meta3dGameobjectProtocol.Index.config

type createStateFunc<'state> = (. config) => 'state

type createGameObjectFunc<'state> = (. 'state) => ('state, gameObject)

type getNeedDisposedGameObjectsFunc<'state> = (. 'state) => array<gameObject>

type getTransformFunc<'transformState> = ComponentContributeType.getComponentFunc<
  'transformState,
  transform,
>

type getPBRMaterialFunc<'geometryState> = ComponentContributeType.getComponentFunc<
  'geometryState,
  geometry,
>

type getGeometryFunc<'pbrMaterialState> = ComponentContributeType.getComponentFunc<
  'pbrMaterialState,
  pbrMaterial,
>

type deferDisposeTransformFunc<'transformState> = ComponentContributeType.deferDisposeComponentFunc<
  'transformState,
  transform,
>

type deferDisposePBRMaterialFunc<
  'pbrMaterialState,
> = ComponentContributeType.deferDisposeComponentFunc<'pbrMaterialState, pbrMaterial>

type deferDisposeGeometryFunc<'geometryState> = ComponentContributeType.deferDisposeComponentFunc<
  'geometryState,
  geometry,
>

type deferDisposeGameObjectFunc<'state, 'transformState, 'pbrMaterialState, 'geometryState> = (
  . ('state, 'transformState, 'pbrMaterialState, 'geometryState),
  (
    (
      getTransformFunc<'transformState>,
      // (. 'transformState, (transform, gameObject)) => 'transformState,
      deferDisposeTransformFunc<'transformState>,
    ),
    (
      getPBRMaterialFunc<'pbrMaterialState>,
      // (. 'pbrMaterialState, (pbrMaterial, gameObject)) => 'pbrMaterialState,
      deferDisposePBRMaterialFunc<'pbrMaterialState>,
    ),
    (
      getGeometryFunc<'geometryState>,
      // (. 'geometryState, (geometry, gameObject)) => 'geometryState),
      deferDisposeGeometryFunc<'geometryState>,
    ),
  ),
  gameObject,
) => ('state, 'transformState, 'pbrMaterialState, 'geometryState)

type disposeTransformsFunc<'transformState> = ComponentContributeType.disposeComponentsFunc<
  'transformState,
  Meta3dComponentTransformProtocol.Index.batchDisposeData,
>

type disposePBRMaterialsFunc<'pbrMaterialState> = ComponentContributeType.disposeComponentsFunc<
  'pbrMaterialState,
  Meta3dComponentPbrmaterialProtocol.Index.batchDisposeData,
>

type disposeGeometrysFunc<'geometryState> = ComponentContributeType.disposeComponentsFunc<
  'geometryState,
  Meta3dComponentGeometryProtocol.Index.batchDisposeData,
>

type disposeGameObjectsFunc<'state, 'transformState, 'pbrMaterialState, 'geometryState> = (
  . ('state, 'transformState, 'pbrMaterialState, 'geometryState),
  (
    (
      getTransformFunc<'transformState>,
      // (
      //   . 'transformState,
      //   Meta3dComponentTransformProtocol.Index.batchDisposeData,
      // ) => 'transformState,
      disposeTransformsFunc<'transformState>,
    ),
    (
      getPBRMaterialFunc<'pbrMaterialState>,
      // (
      //   . 'pbrMaterialState,
      //   Meta3dComponentPbrmaterialProtocol.Index.batchDisposeData,
      // ) => 'pbrMaterialState,
      disposePBRMaterialsFunc<'pbrMaterialState>,
    ),
    (
      getGeometryFunc<'geometryState>,
      // (. 'geometryState, Meta3dComponentGeometryProtocol.Index.batchDisposeData) => 'geometryState,
      disposeGeometrysFunc<'geometryState>,
    ),
  ),
  array<gameObject>,
) => ('state, 'transformState, 'pbrMaterialState, 'geometryState)

type count = int

type clonedGameObjects = array<array<gameObject>>

type cloneTransformFunc<'transformState> = ComponentContributeType.cloneComponentFunc<
  'transformState,
  Meta3dComponentTransformProtocol.Index.cloneConfig,
  transform,
>

type clonePBRMaterialFunc<'pbrMaterialState> = ComponentContributeType.cloneComponentFunc<
  'pbrMaterialState,
  Meta3dComponentPbrmaterialProtocol.Index.cloneConfig,
  pbrMaterial,
>

type cloneGeometryFunc<'geometryState> = ComponentContributeType.cloneComponentFunc<
  'geometryState,
  Meta3dComponentGeometryProtocol.Index.cloneConfig,
  geometry,
>

type addTransformFunc<'transformState> = ComponentContributeType.addComponentFunc<
  'transformState,
  transform,
>

type getTransformGameObjectsFunc<'transformState> = ComponentContributeType.getGameObjectsFunc<
  'transformState,
  transform,
>

type getTransformDataFunc<'transformState> = ComponentContributeType.getComponentDataFunc<
  'transformState,
  Meta3dComponentTransformProtocol.Index.dataNameType,
  transform,
>

type setTransformDataFunc<'transformState> = ComponentContributeType.setComponentDataFunc<
  'transformState,
  Meta3dComponentTransformProtocol.Index.dataNameType,
  transform,
>

type addPBRMaterialFunc<'pbrMaterialState> = ComponentContributeType.addComponentFunc<
  'pbrMaterialState,
  pbrMaterial,
>

type addGeometryFunc<'geometryState> = ComponentContributeType.addComponentFunc<
  'geometryState,
  geometry,
>

type cloneGameObjectFunc<'state, 'transformState, 'pbrMaterialState, 'geometryState> = (
  . ('state, 'transformState, 'pbrMaterialState, 'geometryState),
  (
    (
      getTransformFunc<'transformState>,
      cloneTransformFunc<'transformState>,
      addTransformFunc<'transformState>,
      getTransformGameObjectsFunc<'transformState>,
      getTransformDataFunc<'transformState>,
      setTransformDataFunc<'transformState>,
    ),
    (
      getPBRMaterialFunc<'pbrMaterialState>,
      clonePBRMaterialFunc<'pbrMaterialState>,
      addPBRMaterialFunc<'pbrMaterialState>,
    ),
    (
      getGeometryFunc<'geometryState>,
      cloneGeometryFunc<'geometryState>,
      addGeometryFunc<'geometryState>,
    ),
  ),
  count,
  Meta3dGameobjectProtocol.Index.cloneConfig,
  gameObject,
) => (('state, 'transformState, 'pbrMaterialState, 'geometryState), clonedGameObjects)

type getAllGameObjectsFunc<'state> = (. 'state) => array<gameObject>

// @genType
type gameObjectContribute<'state, 'transformState, 'pbrMaterialState, 'geometryState> = {
  createStateFunc: createStateFunc<'state>,
  createGameObjectFunc: createGameObjectFunc<'state>,
  getNeedDisposedGameObjectsFunc: getNeedDisposedGameObjectsFunc<'state>,
  deferDisposeGameObjectFunc: deferDisposeGameObjectFunc<
    'state,
    'transformState,
    'pbrMaterialState,
    'geometryState,
  >,
  disposeGameObjectsFunc: disposeGameObjectsFunc<
    'state,
    'transformState,
    'pbrMaterialState,
    'geometryState,
  >,
  cloneGameObjectFunc: cloneGameObjectFunc<
    'state,
    'transformState,
    'pbrMaterialState,
    'geometryState,
  >,
  getAllGameObjectsFunc: getAllGameObjectsFunc<'state>,
}

type getGameObjectContribute<
  'state,
  'transformState,
  'pbrMaterialState,
  'geometryState,
> = unit => gameObjectContribute<'state, 'transformState, 'pbrMaterialState, 'geometryState>
