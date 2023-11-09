open StateType

let get = ({gameObjectsMap}, geometry) =>
  gameObjectsMap
  ->Meta3dCommonlib.MutableSparseMap.get(geometry)
  ->Meta3dCommonlib.OptionSt.getWithDefault([])
