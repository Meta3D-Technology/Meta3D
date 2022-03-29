type gameObject = Meta3dGameobjectProtocol.Index.gameObject

type transform = Meta3dComponentTransformProtocol.Index.transform

type pbrMaterial = Meta3dComponentPbrmaterialProtocol.Index.pbrMaterial

type geometry = Meta3dComponentGeometryProtocol.Index.geometry

type transformState = ComponentType.transformState

type pbrMaterialState =ComponentType.transformState 

type geometryState = ComponentType.transformState 

type config = Meta3dGameobjectProtocol.Index.config

type createStateFunc<'state> = (. config) => 'state

type createGameObjectFunc<'state> = (. 'state) => ('state, gameObject)

type getNeedDisposedGameObjectsFunc<'state> = (. 'state) => array<gameObject>

type getTransformFunc = ComponentContributeType.getComponentFunc<
  transformState,
  transform,
>

type getPBRMaterialFunc = ComponentContributeType.getComponentFunc<
  geometryState,
  geometry,
>

type getGeometryFunc = ComponentContributeType.getComponentFunc<
  pbrMaterialState,
  pbrMaterial,
>

type deferDisposeTransformFunc = ComponentContributeType.deferDisposeComponentFunc<
  transformState,
  transform,
>

type deferDisposePBRMaterialFunc = ComponentContributeType.deferDisposeComponentFunc<pbrMaterialState, pbrMaterial>

type deferDisposeGeometryFunc = ComponentContributeType.deferDisposeComponentFunc<
  geometryState,
  geometry,
>

type deferDisposeGameObjectFunc<'state> = (
  . ('state, transformState, pbrMaterialState, geometryState),
  (
    (
      getTransformFunc,
      // (. transformState, (transform, gameObject)) => transformState,
      deferDisposeTransformFunc,
    ),
    (
      getPBRMaterialFunc,
      // (. pbrMaterialState, (pbrMaterial, gameObject)) => pbrMaterialState,
      deferDisposePBRMaterialFunc,
    ),
    (
      getGeometryFunc,
      // (. geometryState, (geometry, gameObject)) => geometryState),
      deferDisposeGeometryFunc,
    ),
  ),
  gameObject,
) => ('state, transformState, pbrMaterialState, geometryState)

type disposeTransformsFunc = ComponentContributeType.disposeComponentsFunc<
  transformState,
  Meta3dComponentTransformProtocol.Index.batchDisposeData,
>

type disposePBRMaterialsFunc = ComponentContributeType.disposeComponentsFunc<
  pbrMaterialState,
  Meta3dComponentPbrmaterialProtocol.Index.batchDisposeData,
>

type disposeGeometrysFunc = ComponentContributeType.disposeComponentsFunc<
  geometryState,
  Meta3dComponentGeometryProtocol.Index.batchDisposeData,
>

type disposeGameObjectsFunc<'state> = (
  . ('state, transformState, pbrMaterialState, geometryState),
  (
    (
      getTransformFunc,
      // (
      //   . transformState,
      //   Meta3dComponentTransformProtocol.Index.batchDisposeData,
      // ) => transformState,
      disposeTransformsFunc,
    ),
    (
      getPBRMaterialFunc,
      // (
      //   . pbrMaterialState,
      //   Meta3dComponentPbrmaterialProtocol.Index.batchDisposeData,
      // ) => pbrMaterialState,
      disposePBRMaterialsFunc,
    ),
    (
      getGeometryFunc,
      // (. geometryState, Meta3dComponentGeometryProtocol.Index.batchDisposeData) => geometryState,
      disposeGeometrysFunc,
    ),
  ),
  array<gameObject>,
) => ('state, transformState, pbrMaterialState, geometryState)

type cloneCount = int

type clonedGameObjects = array<array<gameObject>>

type cloneTransformFunc = ComponentContributeType.cloneComponentFunc<
  transformState,
  Meta3dComponentTransformProtocol.Index.cloneConfig,
  transform,
>

type clonePBRMaterialFunc = ComponentContributeType.cloneComponentFunc<
  pbrMaterialState,
  Meta3dComponentPbrmaterialProtocol.Index.cloneConfig,
  pbrMaterial,
>

type cloneGeometryFunc = ComponentContributeType.cloneComponentFunc<
  geometryState,
  Meta3dComponentGeometryProtocol.Index.cloneConfig,
  geometry,
>

type addTransformFunc = ComponentContributeType.addComponentFunc<
  transformState,
  transform,
>

type getTransformGameObjectsFunc = ComponentContributeType.getGameObjectsFunc<
  transformState,
  transform,
>

type getTransformDataFunc = ComponentContributeType.getComponentDataFunc<
  transformState,
  
  transform,
>

type setTransformDataFunc = ComponentContributeType.setComponentDataFunc<
  transformState,
  
  transform,
>

type addPBRMaterialFunc = ComponentContributeType.addComponentFunc<
  pbrMaterialState,
  pbrMaterial,
>

type addGeometryFunc = ComponentContributeType.addComponentFunc<
  geometryState,
  geometry,
>

type cloneGameObjectFunc<'state> = (
  . ('state, transformState, pbrMaterialState, geometryState),
  (
    (
      getTransformFunc,
      cloneTransformFunc,
      addTransformFunc,
      getTransformGameObjectsFunc,
      getTransformDataFunc,
      setTransformDataFunc,
    ),
    (
      getPBRMaterialFunc,
      clonePBRMaterialFunc,
      addPBRMaterialFunc,
    ),
    (
      getGeometryFunc,
      cloneGeometryFunc,
      addGeometryFunc,
    ),
  ),
  cloneCount,
  Meta3dGameobjectProtocol.Index.cloneConfig,
  gameObject,
) => (('state, transformState, pbrMaterialState, geometryState), clonedGameObjects)

type getAllGameObjectsFunc<'state> = (. 'state) => array<gameObject>

// @genType
type gameObjectContribute<'state> = {
  createStateFunc: createStateFunc<'state>,
  createGameObjectFunc: createGameObjectFunc<'state>,
  getNeedDisposedGameObjectsFunc: getNeedDisposedGameObjectsFunc<'state>,
  deferDisposeGameObjectFunc: deferDisposeGameObjectFunc<
    'state,
  >,
  disposeGameObjectsFunc: disposeGameObjectsFunc<
    'state,
  >,
  cloneGameObjectFunc: cloneGameObjectFunc<
    'state,
  >,
  getAllGameObjectsFunc: getAllGameObjectsFunc<'state>,
}

type getGameObjectContribute<
  'state,
> = unit => gameObjectContribute<'state>
