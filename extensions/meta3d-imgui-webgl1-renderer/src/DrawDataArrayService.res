open DrawDataType

let addPoints = (pointArr, points ) =>
  points -> Meta3dCommonlib.ArraySt.reduceOneParam(
    (. arr, point) => arr -> Meta3dCommonlib.ArraySt.push(point),
    pointArr,
  )

let concatArrays = %raw(`
  function(arrays) {
    return [].concat.apply([], arrays)
  }
  `
)

let getBaseIndex = verticeArr => (verticeArr -> Js.Array.length) / 2
