open Meta3dComponentPbrmaterialProtocol.Index

let add = ({gameObjectsMap, gameObjectPBRMaterialMap} as state, gameObject, material) => {
  let gameObject = gameObject->GameObjectTypeConvertUtils.gameObjectToInt

  gameObjectsMap->Meta3dCommonlib.ArrayMapUtils.addValue(material, gameObject)->ignore

  gameObjectPBRMaterialMap->Meta3dCommonlib.MutableSparseMap.set(gameObject, material)->ignore

  state
}
