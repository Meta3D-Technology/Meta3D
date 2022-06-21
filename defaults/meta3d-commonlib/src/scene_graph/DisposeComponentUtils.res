let removeFromArray = (arr, isDebug, target, ) => {
  let index = arr->Js.Array.indexOf(target, _)

  index === -1
    ? arr
    : {
        let lastIndex = arr->Js.Array.length->pred
        arr->ArraySt.deleteBySwap(isDebug, index, lastIndex)
        arr
      }
}

// TODO optimize
let batchRemoveFromArray = (arr, targets) => {
  arr->Js.Array.filter(value => !(targets->Js.Array.includes(value, _)), _)
}
