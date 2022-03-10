open StateType

let get = ({needDisposedPBRMaterialArray}) => {
  needDisposedPBRMaterialArray->Meta3dCommonlib.ArraySt.removeDuplicateItems
}
