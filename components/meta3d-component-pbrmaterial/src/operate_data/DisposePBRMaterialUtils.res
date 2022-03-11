open StateType

let _removeComponent = (gameObjectMap, component) =>
  gameObjectMap->Meta3dCommonlib.MutableSparseMap.remove(component)

let deferDisposeComponent = (
  {gameObjectPBRMaterialMap, needDisposedPBRMaterialArray} as state,
  ( component, gameObject, )
) => {
  {
    ...state,
    gameObjectPBRMaterialMap: gameObjectPBRMaterialMap->_removeComponent(component),
    needDisposedPBRMaterialArray: needDisposedPBRMaterialArray->Meta3dCommonlib.ArrayMapUtils.addValue(
      component,
      gameObject,
    ),
  }
}
