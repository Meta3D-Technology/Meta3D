let createEmpty = (~hintSize=10, ()): Meta3dCommonlibType.HashMapType.t2<'a> => Js.Dict.empty()

let unsafeGet = (map, key: string) =>
  Js.Dict.unsafeGet(map, key)->Meta3dCommonlibType.HashMapType.nullableToNotNullable

let get = (map, key: string) => {
  let value = unsafeGet(map, key)

  NullUtils.isEmpty(value) ? None : Some(value)
}

let _getExn = %raw(`
(nullableData) => {
  if (nullableData !== undefined) {
    return nullableData;
  }

  throw new Error("Not_found")
}
`)

let getExn = (map: Meta3dCommonlibType.HashMapType.t2<'a>, key: string): 'a => {
  unsafeGet(map, key)->_getExn
}

let getNullable = (map: Meta3dCommonlibType.HashMapType.t2<'a>, key: string) =>
  get(map, key)->Js.Nullable.fromOption

let has = (map, key: string) => !NullUtils.isEmpty(unsafeGet(map, key))

let entries = (map: Meta3dCommonlibType.HashMapType.t<Js.Dict.key, 'a>): array<(Js.Dict.key, 'a)> =>
  map->Js.Dict.entries->Meta3dCommonlibType.HashMapType.entriesNullableToEntriesNotNullable

let _mutableSet = (map, key: string, value) => {
  Js.Dict.set(map, key, value)
  map
}

let _createEmpty = (): Js.Dict.t<'a> => Js.Dict.empty()

let _reduceArray = (arr, func, param) => Belt.Array.reduceU(arr, param, func)

let copy = (map: Js.Dict.t<Js.Nullable.t<'a>>): Js.Dict.t<Js.Nullable.t<'a>> =>
  map
  ->entries
  ->_reduceArray((. newMap, (key, value)) => newMap->_mutableSet(key, value), _createEmpty())
  ->Meta3dCommonlibType.HashMapType.dictNotNullableToDictNullable

// let copy = (map: Meta3dCommonlibType. HashMapType.t2('a)): Meta3dCommonlibType. HashMapType.t2('a) =>
//   map
//   ->entries
//   ->ArraySt.reduceOneParam(
//       (. newMap, (key, value)) => newMap->_mutableSet(key, value),
//       createEmpty(),
//     );
// // ->Meta3dCommonlibType. HashMapType.dictNotNullableToDictNullable;

let getValidValues = map =>
  map
  ->Js.Dict.values
  ->Js.Array.filter(value => value->NullUtils.isInMap, _)
  ->Meta3dCommonlibType.SparseMapType.arrayNullableToArrayNotNullable

// let map = (map: Js.Dict.t<'a>, func: (. 'a) => 'b) => map->Js.Dict.map(func, _)
let map = (map: Meta3dCommonlibType.HashMapType.t2<'a>, func: (. 'a) => 'b) =>
  map
  ->Meta3dCommonlibType.HashMapType.dictNullableToDictNotNullable
  ->Js.Dict.map(func, _)
  ->Meta3dCommonlibType.HashMapType.dictNotNullableToDictNullable

let merge = (
  sourceMap: Meta3dCommonlibType.HashMapType.t2<'a>,
  targetMap: Meta3dCommonlibType.HashMapType.t2<'a>,
) => {
  sourceMap
  ->entries
  ->_reduceArray(
    (. targetMap, (key, value)) => targetMap->_mutableSet(key, value),
    targetMap->Meta3dCommonlibType.HashMapType.dictNullableToDictNotNullable,
  )
  ->Meta3dCommonlibType.HashMapType.dictNotNullableToDictNullable
}
