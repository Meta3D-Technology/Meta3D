open StateType

let get = ({needDisposedDirectionLights}) => {
  needDisposedDirectionLights->Meta3dCommonlib.ArraySt.removeDuplicateItems
}
