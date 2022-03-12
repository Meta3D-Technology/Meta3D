open StateType

let add = ({gameObjectsMap, gameObjectPBRMaterialMap} as state, gameObject, material) => {
  gameObjectsMap->Meta3dCommonlib.ArrayMapUtils.addValue(material, gameObject)->ignore

  gameObjectPBRMaterialMap->Meta3dCommonlib.MutableSparseMap.set(gameObject, material)->ignore

  state
}
