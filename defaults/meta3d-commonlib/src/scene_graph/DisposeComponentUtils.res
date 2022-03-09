// let removeFromArray = (target: int, arr) => {
//   let index = arr |> Js.Array.indexOf(target)

//   index === -1
//     ? arr
//     : {
//         let lastIndex = arr |> Js.Array.length |> pred
//         arr |> ArrayService.deleteBySwap(index, lastIndex)
//         arr
//       }
// }

// TODO optimize
let batchRemoveFromArray = (arr, targets) => {
  arr->Js.Array.filter(value => !(targets->Js.Array.includes(value, _)), _)
}
