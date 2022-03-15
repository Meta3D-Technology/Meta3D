open StateType

let get = ({needDisposedGeometryArray}) => {
  needDisposedGeometryArray->Meta3dCommonlib.MutableSparseMap.reducei(
    (. result, gameObjects, component) => {
      result->Meta3dCommonlib.MutableSparseMap.set(
        component,
        gameObjects->Meta3dCommonlib.ArraySt.removeDuplicateItems,
      )
    },
    Meta3dCommonlib.MutableSparseMap.createEmpty(),
  )
}
