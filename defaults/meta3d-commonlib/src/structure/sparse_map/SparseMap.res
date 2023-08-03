let createEmpty = (~hintSize=10, ()): Meta3dCommonlibType.SparseMapType.t2<'a> => []

let copy = Js.Array.copy

let unsafeGet = (map: Meta3dCommonlibType.SparseMapType.t2<'a>, key: int): 'a =>
  Array.unsafe_get(map, key)->Meta3dCommonlibType.SparseMapType.nullableToNotNullable

let get = (map, key: int) => {
  let value = unsafeGet(map, key)

  NullUtils.isEmpty(value) ? None : Some(value)
}

let getNullable = (map, key) => {
  let value = unsafeGet(map, key)

  NullUtils.isUndefined(value) ? Js.Nullable.null : value->Js.Nullable.return
}

let has = (map, key: int) => !NullUtils.isEmpty(unsafeGet(map, key))

let map = (map, func) => map->Js.Array.map(value =>
    if NullUtils.isNotInMap(value) {
      Js.Nullable.undefined
    } else {
      func(.
        value->Meta3dCommonlibType.SparseMapType.nullableToNotNullable,
      )->Meta3dCommonlibType.SparseMapType.notNullableToNullable
    }
  , _)

let reducei = (map, func, initValue) =>
  map->ArraySt.reduceOneParami((. previousValue, value, index) =>
    if NullUtils.isNotInMap(value) {
      previousValue
    } else {
      func(.
        previousValue->Meta3dCommonlibType.SparseMapType.nullableToNotNullable,
        value->Meta3dCommonlibType.SparseMapType.nullableToNotNullable,
        index,
      )->Meta3dCommonlibType.SparseMapType.notNullableToNullable
    }
  , initValue->Meta3dCommonlibType.SparseMapType.notNullableToNullable)->Meta3dCommonlibType.SparseMapType.nullableToNotNullable

let getValues = map =>
  map
  ->Js.Array.filter(value => NullUtils.isInMap(value), _)
  ->Meta3dCommonlibType.SparseMapType.arrayNullableToArrayNotNullable

let getKeys = map => map->ArraySt.reduceOneParami((. arr, value, key) =>
    if NullUtils.isNotInMap(value) {
      arr
    } else {
      arr->Js.Array.push(key, _)->ignore
      arr
    }
  , [])
