open StateType

open Meta3dComponentTransformProtocol.Index

let deferDisposeGameObject = (
  (
    {needDisposedGameObjectArray} as gameObjectState,
    transformState: Meta3dComponentTransformProtocol.Index.state,
  ),
  (getTransformFunc, deferDisposeTransformFunc),
  gameObject,
) => {
let transformState = 
getTransformFunc(. transformState, gameObject) -> Meta3dCommonlib.NullableSt.bind((. transform) =>{
deferDisposeTransformFunc(.
    transformState,
    ( transform, gameObject ),
  )
})
 -> Meta3dCommonlib.NullableSt.getWithDefault(transformState)

  let gameObjectState = {
    ...gameObjectState,
    needDisposedGameObjectArray: needDisposedGameObjectArray->Meta3dCommonlib.ArraySt.push(
      gameObject,
    ),
  }

  (gameObjectState, transformState)
}

let _getTransforms = (state,getTransformFunc, gameObjects) =>
  gameObjects->Meta3dCommonlib.ArraySt.reduceOneParam((. arr, gameObject) => {
    switch getTransformFunc(. state, gameObject) -> Meta3dCommonlib.OptionSt.fromNullable  {
    | None => arr
    | Some(component) => arr->Meta3dCommonlib.ArraySt.push(component)
    }
  }, [])

let _isNotNeedDispose = (component, needDisposedIndexArray) =>
  !Js.Array.includes(component, needDisposedIndexArray)

let disposeGameObjects = (
  (
    {needDisposedGameObjectArray} as gameObjectState,
    transformState: Meta3dComponentTransformProtocol.Index.state,
  ),
  (getTransformFunc, disposeTransformsFunc),
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

  (gameObjectState, transformState)
}
