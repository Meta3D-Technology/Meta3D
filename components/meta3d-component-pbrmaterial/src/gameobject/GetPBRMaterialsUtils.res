open StateType

let _getComponents = (gameObjectComponentMap, gameObjects) =>
  gameObjects->Meta3dCommonlib.ArraySt.reduceOneParam((. arr, gameObject) => {
    switch gameObjectComponentMap->Meta3dCommonlib.MutableSparseMap.get(gameObject) {
    | None => arr
    | Some(component) => arr->Meta3dCommonlib.ArraySt.push(component)
    }
  }, [])

let get = ({gameObjectPBRMaterialMap}, gameObjects) => {
  gameObjectPBRMaterialMap->_getComponents(
    gameObjects,
  )
}
