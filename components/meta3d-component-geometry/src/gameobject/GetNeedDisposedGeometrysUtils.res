open StateType

let get = ({needDisposedGeometryArray}) => {
  needDisposedGeometryArray->Meta3dCommonlib.ArraySt.removeDuplicateItems
}
