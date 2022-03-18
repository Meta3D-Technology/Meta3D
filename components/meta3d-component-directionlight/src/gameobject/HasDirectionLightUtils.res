open StateType

let has = ({gameObjectDirectionLightMap}, gameObject) => {
  gameObjectDirectionLightMap->Meta3dCommonlib.MutableSparseMap.has(gameObject )
}
