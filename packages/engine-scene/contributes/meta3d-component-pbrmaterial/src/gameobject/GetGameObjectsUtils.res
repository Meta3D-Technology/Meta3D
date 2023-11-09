open StateType

let get = ({gameObjectsMap}, material) =>
  gameObjectsMap
  ->Meta3dCommonlib.MutableSparseMap.get(material)
  ->Meta3dCommonlib.OptionSt.getWithDefault([])
