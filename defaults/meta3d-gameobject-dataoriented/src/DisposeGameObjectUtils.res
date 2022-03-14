open StateType

open Meta3dComponentTransformProtocol.Index

let deferDisposeGameObject = (
  (
    {needDisposedGameObjectArray} as gameObjectState,
    transformState: Meta3dComponentTransformProtocol.Index.state,
    pbrMaterialState: Meta3dComponentPbrmaterialProtocol.Index.state,
  ),
  (
    (getTransformFunc, deferDisposeTransformFunc),
    (getPBRMaterialFunc, deferDisposePBRMaterialFunc),
  ),
  gameObject,
) => {
  let transformState =
    getTransformFunc(. transformState, gameObject)
    ->Meta3dCommonlib.NullableSt.bind((. transform) => {
      deferDisposeTransformFunc(. transformState, (transform, gameObject))
    })
    ->Meta3dCommonlib.NullableSt.getWithDefault(transformState)

  let pbrMaterialState =
    getPBRMaterialFunc(. pbrMaterialState, gameObject)
    ->Meta3dCommonlib.NullableSt.bind((. pbrMaterial) => {
      deferDisposePBRMaterialFunc(. pbrMaterialState, (pbrMaterial, gameObject))
    })
    ->Meta3dCommonlib.NullableSt.getWithDefault(pbrMaterialState)

  let gameObjectState = {
    ...gameObjectState,
    needDisposedGameObjectArray: needDisposedGameObjectArray->Meta3dCommonlib.ArraySt.push(
      gameObject,
    ),
  }

  (gameObjectState, transformState, pbrMaterialState)
}

let _getTransforms = (state, getTransformFunc, gameObjects) =>
  gameObjects->Meta3dCommonlib.ArraySt.reduceOneParam((. arr, gameObject) => {
    switch getTransformFunc(. state, gameObject)->Meta3dCommonlib.OptionSt.fromNullable {
    | None => arr
    | Some(component) => arr->Meta3dCommonlib.ArraySt.push(component)
    }
  }, [])

let _getSharableComponentDataMap = (state, getComponentFunc, gameObjects) =>
  gameObjects->Meta3dCommonlib.ArraySt.reduceOneParam((. dataMap, gameObject) =>
    getComponentFunc(. state, gameObject)
    ->Meta3dCommonlib.NullableSt.bind((. component) => {
      dataMap->Meta3dCommonlib.ArrayMapUtils.addValue(component, gameObject)
    })
    ->Meta3dCommonlib.NullableSt.getWithDefault(dataMap)
  , Meta3dCommonlib.MutableSparseMap.createEmpty())

let _isNotNeedDispose = (component, needDisposedIndexArray) =>
  !Js.Array.includes(component, needDisposedIndexArray)

let disposeGameObjects = (
  (
    {needDisposedGameObjectArray} as gameObjectState,
    transformState: Meta3dComponentTransformProtocol.Index.state,
    pbrMaterialState: Meta3dComponentPbrmaterialProtocol.Index.state,
  ),
  ((getTransformFunc, disposeTransformsFunc), (getPBRMaterialFunc, disposePBRMaterialsFunc)),
  gameObjects,
) => {
  let isDebug = ConfigUtils.getIsDebug(gameObjectState)

  let needDisposedGameObjectArray = GetNeedDisposedGameObjectsUtils.get(gameObjectState)

  Meta3dCommonlib.DisposeUtils.checkShouldNeedDisposed(
    isDebug,
    "gameObject",
    gameObjects,
    needDisposedGameObjectArray,
  )

  gameObjectState.needDisposedGameObjectArray =
    needDisposedGameObjectArray->Meta3dCommonlib.DisposeComponentUtils.batchRemoveFromArray(
      gameObjects,
    )

  let transformState = disposeTransformsFunc(.
    transformState,
    _getTransforms(transformState, getTransformFunc, gameObjects),
  )

  let pbrMaterialState = disposePBRMaterialsFunc(.
    pbrMaterialState,
    _getSharableComponentDataMap(pbrMaterialState, getPBRMaterialFunc, gameObjects),
  )

  (gameObjectState, transformState, pbrMaterialState)
}
