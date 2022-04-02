open StateType

let get = ({needDisposedPerspectiveCameraProjections}) => {
  needDisposedPerspectiveCameraProjections->Meta3dCommonlib.ArraySt.removeDuplicateItems
}
