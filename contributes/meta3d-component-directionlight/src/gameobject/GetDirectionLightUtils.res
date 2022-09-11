open StateType

let get = ({gameObjectDirectionLightMap}, gameObject) => {
  gameObjectDirectionLightMap->Meta3dCommonlib.MutableSparseMap.getNullable(
    gameObject,
  )
}
