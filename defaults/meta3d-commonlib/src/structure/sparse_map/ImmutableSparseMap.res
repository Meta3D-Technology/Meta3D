let createEmpty = SparseMap.createEmpty

let copy = SparseMap.copy

let unsafeGet = SparseMap.unsafeGet

let get = SparseMap.get

let getExn = (map, key) => {
  get(map, key) -> OptionSt.getExn
}

let getNullable = SparseMap.getNullable

let has = SparseMap.has

let set = (map, key: int, value) => {
  let newMap = map->copy

  Array.unsafe_set(newMap, key, value->Meta3dCommonlibType.SparseMapType.notNullableToNullable)

  newMap
}

let remove = (map, key: int) => {
  let newMap = map->copy

  Array.unsafe_set(newMap, key, Js.Nullable.undefined)

  newMap
}

let map = SparseMap.map

let reducei = SparseMap.reducei

let getValues = SparseMap.getValues

let getKeys = SparseMap.getKeys

let deleteVal = (map, key: int) => {
  let newMap = map->copy

  Array.unsafe_set(newMap, key, Js.Nullable.undefined)

  newMap
}
