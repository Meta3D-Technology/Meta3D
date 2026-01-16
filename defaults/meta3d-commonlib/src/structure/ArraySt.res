let _getExn = %raw(` (nullableData) => { if (nullableData !== undefined) { return nullableData; } throw new Error("Not_found") } `)

let getExn = (arr, index) => {
  Array.unsafe_get(arr, index)->_getExn
}

let length = Js.Array.length

let find = (arr, func) => Js.Array.find(func, arr)

let includes = (arr, value) => Js.Array.includes(value, arr)

let includesByFunc = (arr, func) => {
  arr->find(func)->OptionSt.isSome
}

let sliceFrom = (arr, index) => Js.Array.sliceFrom(index, arr)

let slice = (arr, start, end_) => Js.Array.slice(~start, ~end_, arr)

let copy = Js.Array.copy

let reduceOneParam = (arr, func, param) => Belt.Array.reduceU(arr, param, func)

let reduceOneParami = (arr, func, param) => {
  let mutableParam = ref(param)
  for i in 0 to Js.Array.length(arr) - 1 {
    mutableParam := func(. mutableParam.contents, Array.unsafe_get(arr, i), i)
  }
  mutableParam.contents
}

let rec traverseResultM = (arr: array<'a>, func: 'a => Result.t2<'b>): Result.t2<array<'b>> => {
  let \">>=" = Result.bind

  let retn = Result.succeed

  let cons = (head, tail) => Js.Array.concat(tail, [head])

  length(arr) == 0
    ? retn([])
    : {
        \">>="(func(arr->getExn(0)), h =>
          \">>="(traverseResultM(sliceFrom(arr, 1), func), t => retn(cons(h, t)))
        )
      }
}

let _id = value => value

let rec sequenceResultM = arr => traverseResultM(arr, _id)

let rec traverseReducePromiseM = (
  arr: array<'a>,
  func: (. 'b, 'a) => Js.Promise.t<'b>,
  param: 'b,
): Js.Promise.t<'b> => {
  // define the monadic functions
  let \">>=" = PromiseSt.bind

  length(arr) == 0
    ? Js.Promise.resolve(param)
    : {
        \">>="(func(. param, arr[0]), h => traverseReducePromiseM(sliceFrom(arr, 1), func, h))
      }
}

let rec _traverseReducePromiseIM = (
  arr: array<'a>,
  func: (. 'b, 'a, int) => Js.Promise.t<'b>,
  param: 'b,
  index: int,
): Js.Promise.t<'b> => {
  // define the monadic functions
  let \">>=" = PromiseSt.bind

  length(arr) == 0
    ? Js.Promise.resolve(param)
    : {
        \">>="(func(. param, arr[0], index), h =>
          _traverseReducePromiseIM(sliceFrom(arr, 1), func, h, index->succ)
        )
      }
}

let traverseReducePromiseIM = (
  arr: array<'a>,
  func: (. 'b, 'a, int) => Js.Promise.t<'b>,
  param: 'b,
): Js.Promise.t<'b> => {
  _traverseReducePromiseIM(arr, func, param, 0)
}

let rec traverseReduceResultM = (
  arr: array<'a>,
  func: (. 'b, 'a) => Result.t2<'b>,
  param: 'b,
): Result.t2<'b> => {
  // define the monadic functions
  let \">>=" = Result.bind

  let retn = Result.succeed

  length(arr) == 0
    ? retn(param)
    : {
        \">>="(func(. param, arr[0]), h => traverseReduceResultM(sliceFrom(arr, 1), func, h))
      }
}

let unsafeGetFirst = arr => Array.unsafe_get(arr, 0)

let getFirst = arr => arr->length >= 1 ? arr[0]->Some : None

let getLast = arr => arr->length >= 1 ? arr[arr->length - 1]->Some : None

let push = (arr, value) => {
  Js.Array.push(value, arr)->ignore

  arr
}

let forEach = (arr, func) => Js.Array.forEach(func, arr)

let map = (arr, func) => Js.Array.map(func, arr)

let mapi = (arr, func) => Js.Array.mapi(func, arr)

let filter = (arr, func) => Js.Array.filter(func, arr)

let reverse = arr => arr->copy->Js.Array.reverseInPlace

let deleteBySwap = (arr, isDebug, index: int, lastIndex: int) => {
  Contract.requireCheck(() => {
    open Contract
    open Operators

    let len = arr->Js.Array.length
    test(
      Log.buildAssertMessage(~expect=j`lastIndex:$lastIndex === arr.length:$len`, ~actual=j`not`),
      () => lastIndex->assertEqual(Int, Js.Array.length(arr) - 1, _),
    )
  }, isDebug)

  Array.unsafe_set(arr, index, Array.unsafe_get(arr, lastIndex))

  Js.Array.pop(arr)->ignore
}

let range = (a: int, b: int) => {
  let result = []

  for i in a to b {
    Js.Array.push(i, result)->ignore
  }

  result
}

// let removeDuplicateItems = (buildKeyFunc, arr) => {
let removeDuplicateItems = arr => {
  let resultArr = []
  let map = MutableHashMap.createEmpty()
  for i in 0 to Js.Array.length(arr) - 1 {
    let item = Array.unsafe_get(arr, i)
    // let key = buildKeyFunc(. item)
    let key = Js.Int.toString(item)

    switch MutableHashMap.get(map, key) {
    | None =>
      Js.Array.push(item, resultArr)->ignore
      MutableHashMap.set(map, key, item)->ignore
    /* setMapFunc() */
    | Some(_) => ()
    }
  }
  resultArr
}

let removeDuplicateItemsWithBuildKeyFunc = (arr, buildKeyFunc) => {
  let resultArr = []
  let map = MutableHashMap.createEmpty()
  for i in 0 to Js.Array.length(arr) - 1 {
    let item = Array.unsafe_get(arr, i)
    let key = buildKeyFunc(. item)
    // let key = Js.Int.toString(item)

    switch MutableHashMap.get(map, key) {
    | None =>
      Js.Array.push(item, resultArr)->ignore
      MutableHashMap.set(map, key, item)->ignore
    /* setMapFunc() */
    | Some(_) => ()
    }
  }
  resultArr
}

let chunk = (arr, size) => {
  let (result, group) = arr->reduceOneParam((. (result, group), value) => {
    group->length < size
      ? {
          (result, group->push(value))
        }
      : {
          (result->push(group), [value])
        }
  }, ([], []))

  group->length > 0 ? result->push(group) : result
}

let sort = (arr, func) => {
  arr->Js.Array.sortInPlaceWith(func, _)
}
