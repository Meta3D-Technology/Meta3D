let addValue = (map, key, value) =>
  switch map->MutableSparseMap.get(key) {
  | None => map->MutableSparseMap.set(key, [value])
  | Some(arr) => map->MutableSparseMap.set(key, arr->ArraySt.push(value))
  }

let removeValue = (map, isDebug, key, value) => {
  let (has, arr) = MutableSparseMap.fastGet(map, key)

  has
    ? {
        arr->DisposeComponentUtils.removeFromArray(isDebug, value)->ignore

        map
      }
    : map
}

let batchRemoveValueArr = (map, key, valueArr) => {
  let (has, arr) = MutableSparseMap.fastGet(map, key)

  has
    ? {
        map->MutableSparseMap.set(key, arr->DisposeComponentUtils.batchRemoveFromArray(valueArr))
      }
    : map
}
