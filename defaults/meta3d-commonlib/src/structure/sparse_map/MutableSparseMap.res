let createEmpty = SparseMap.createEmpty

let copy = SparseMap.copy

let unsafeGet = SparseMap.unsafeGet

let get = SparseMap.get

let getExn = (map, key) => {
  get(map, key)->OptionSt.getExn
}

let fastGet = (map, key: int) => {
  let value = unsafeGet(map, key)

  (NullUtils.isInMap(value), value)
}

let getNullable = SparseMap.getNullable

let has = SparseMap.has

let set = (
  map: Meta3dCommonlibType.SparseMapType.t2<'a>,
  key: int,
  value: 'a,
): Meta3dCommonlibType.SparseMapType.t2<'a> => {
  Array.unsafe_set(map, key, value->Meta3dCommonlibType.SparseMapType.notNullableToNullable)

  map
}

let remove = (map, key: int) => {
  Array.unsafe_set(map, key, Js.Nullable.undefined)

  map
}

let map = SparseMap.map

let reducei = SparseMap.reducei

let getValues = SparseMap.getValues

let getKeys = SparseMap.getKeys

let deleteVal = (map, key: int) => {
  Array.unsafe_set(map, key, Js.Nullable.undefined)

  map
}
